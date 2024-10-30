import { StompSessionProvider } from "react-stomp-hooks";
import ChangeListener from "../websockets/ChangeListener";
import { useEffect, useState } from "react";
// import toggleDevice from "../toggledevice/toggleDevice";

// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

interface LatestInputData {
	celsius: number,
	humidity: number,
	photoTransistorValue: number,
	timeStamp: string;
}

function ArduinoSensorData() {
	const [latestInput, setLatestInput] = useState<LatestInputData | null >(null); // State för att lagra den senaste avläsningen
	const [tempSens, setTempSens] = useState<number | null >(null); 
	const [tempSensIndex, setTempSensIndex] = useState<String | null >(null); 
	const [lightSens, setLightSens] = useState<number | null >(null); 
	const [lightSensIndex, setLightSensIndex] = useState<String | null >(null); 

	const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

	  const toggleDevice = async (deviceId:String, isOn: boolean) => {
		console.log(`Toggling Device:  ${isOn ? "ON" : "OFF"}`);
		fetch (`${apiURL}/hue/device/${deviceId}`, {
			method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isOn),
		})
		.then((response) => response.text())
		.then(data => {
			console.log("Response: ", data);	
		})		
	};

	useEffect (() => {
		fetch(`${apiURL}/get-latest-dht11-sensor-data`)
		.then(response => response.json())
		.then(data => {
			setLatestInput(data);			
			console.log(data);
	});	

	}, []);

	
	useEffect(() => {
		fetch(`${apiURL}/user/tempsens/${userId}`)
			.then(response => response.json())
			.then(data => {
				console.log("tempSettings", data);
				setTempSens(data.tempSensitivity);
				setTempSensIndex(data.tempIndex);
			})
			.catch(error => console.error("Fetch error:", error));
	}, []);

	console.log("TempS: ", tempSens, " TempI: ", tempSensIndex);

	
	useEffect(() => {
		fetch(`${apiURL}/user/lightsens/${userId}`)
			.then(response => response.json())	
			.then(data => {
				console.log("lightsettings: ", data);
				setLightSens(data.lightSensitivity);
				setLightSensIndex(data.lightIndex);
			})
			.catch(error => console.error("Fetch error:", error)); // Add error handling
		}, []);
		console.log("LightS: ", lightSens, " LightI: ", lightSensIndex);
	//körs varje gång databasen uppdateras och latestInput ändras
	//TODO ändra vilken temperatur fläkten ska gå igång och vilken index den har
	useEffect(() => {
		if(latestInput && tempSens && tempSensIndex) {
			if(latestInput.celsius < tempSens
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
        <StompSessionProvider url={`${apiURL}/websocket`}>
            <ChangeListener onDataReceived={updateLatestInput} />
        </StompSessionProvider>
    </div>
);
}

export default ArduinoSensorData;
