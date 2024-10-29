import { StompSessionProvider } from "react-stomp-hooks";
import ChangeListener from "../websockets/ChangeListener";
import { useEffect, useState } from "react";
import toggleDevice from "../toggledevice/toggleDevice";


interface LatestInputData {
	celsius: number,
	humidity: number,
	photoTransistorValue: number,
	timeStamp: string;
}

function ArduinoSensorData() {
	const [latestInput, setLatestInput] = useState<LatestInputData | null >(null); // State för att lagra den senaste avläsningen
	const [tempSens, setTempSens] = useState<number | null >(null); 
	const [tempSensIndex, setTempSensIndex] = useState<number | null >(null); 
	const [lightSens, setLightSens] = useState<number | null >(null); 
	const [lightSensIndex, setLightSensIndex] = useState<number | null >(null); 

	const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

	useEffect (() => {
		fetch(`https://shark-app-ewg2d.ondigitalocean.app/get-latest-dht11-sensor-data`)
		.then(response => response.json())
		.then(data => {
			setLatestInput(data);			
			console.log(data);
	});	

	}, []);

	useEffect (() => {
		fetch(`https://shark-app-ewg2d.ondigitalocean.app/user/tempsens/${userId}`)
		.then(response => response.json())
		.then(data => {
					
            setTempSens(data.tempSensitivity);
			setTempSensIndex(data.tempIndex);
			
			
			console.log("tempsensdata: ", data);
	});
	}, []);
	console.log("TempS: ", tempSens, " TempI: ", tempSensIndex);
	useEffect (() => {
		fetch(`https://shark-app-ewg2d.ondigitalocean.app/user/lightsens/${userId}`)
		.then(response => response.json())
		.then(data => {
					
			setLightSens(data.lightSensitivity);
			setLightSensIndex(data.lightIndex);

			console.log("lightsensdata: ", data);
	});
	}, []);
	console.log("LightS: ", lightSens, " LightI: ", lightSensIndex);
	//körs varje gång databasen uppdateras och latestInput ändras
	//TODO ändra vilken temperatur fläkten ska gå igång och vilken index den har
	useEffect(() => {
		if(latestInput && tempSens && tempSensIndex) {
			if(latestInput.celsius > tempSens
			) {
				toggleDevice(tempSensIndex,true);
				console.log("TS", tempSens);
				
			} else {
				toggleDevice(tempSensIndex,false);
			}
		}
	},[latestInput]);

	//input för vilken ljusstyrka innan lampa tänds
	//TODO useEffect för ljussensorn/phototransistor
	useEffect(() => {
		if(latestInput && lightSens && lightSensIndex) {
            if(latestInput.photoTransistorValue > lightSens) {
                toggleDevice(lightSensIndex,true);
            } else  {
                toggleDevice(lightSensIndex,false);
            }
        }
	}, [latestInput]);

	const updateLatestInput = (newData: LatestInputData) => {
		setLatestInput(newData);
	  };

	if (!latestInput) {
		return <i><h4>Ingen data tillgänglig</h4></i>
		}
	
	let timeStampString = latestInput.timeStamp.toString();
	let date = timeStampString.substring(0, 10);
	let time = timeStampString.substring(11, 16);

return (
    <div>
        <h3>Arduino Sensor Data:</h3>
        {latestInput ? ( //Om latestInput är tillgänglig
            <li>
                Date: {date} | Time: {time} | Temperature: {latestInput.celsius}°C | Humidity: {latestInput.humidity}% | LightSensor: {latestInput.photoTransistorValue}
            </li>
        ) : (
            <p>Loading latest data...</p> // Visa laddningsmeddelande när latestInput är null
        )}

        {/* StompSessionProvider och ChangeListener för WebSocket */}
        <StompSessionProvider url={"https://shark-app-ewg2d.ondigitalocean.app/websocket"}>
            <ChangeListener onDataReceived={updateLatestInput} />
        </StompSessionProvider>
    </div>
);
}

export default ArduinoSensorData;
