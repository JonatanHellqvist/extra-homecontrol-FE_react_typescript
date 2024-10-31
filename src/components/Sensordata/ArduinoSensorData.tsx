import { StompSessionProvider } from "react-stomp-hooks";
import ChangeListener from "../websockets/ChangeListener";
import { useEffect, useState } from "react";



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
		fetch (`https://clownfish-app-2jcw3.ondigitalocean.app/hue/device/${deviceId}`, {
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
		fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/get-latest-dht11-sensor-data`)
		.then(response => response.json())
		.then(data => {
			setLatestInput(data);			
			console.log(data);
	});	

	}, []);

	useEffect (() => {
		fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/tempsens/${userId}`)
		.then(response => response.json())
			.then(data => {
				console.log("tempSettings", data);
				setTempSens(data.tempSensitivity);
				setTempSensIndex(data.tempIndex);
			})
			.catch(error => console.error("Fetch error:", error));
	}, []);

	
	console.log("TempS: ", tempSens, " TempI: ", tempSensIndex);
	useEffect (() => {
		fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/user/lightsens/${userId}`)
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
	<>
    <div id="arduinoSensorDataDiv">
		<div id="arduinoSensorDataTitleDiv">
        <h1 id="arduinoSensorDataTitleH1">Arduino Sensor Data</h1>
		</div>
		<h3>Latest input from Arduino:</h3>
        {latestInput ? ( 
            <h4 id="arduinoSensorDataLatestInput">
                Date: {date} | Time: {time} | Temperature: {latestInput.celsius}°C | Humidity: {latestInput.humidity}% | LightSensor: {latestInput.photoTransistorValue}
            </h4>
			
        ) : (
            <p>Loading latest data...</p> // Visa laddningsmeddelande när latestInput är null
        )}

        {/* StompSessionProvider och ChangeListener för WebSocket */}
        <StompSessionProvider url={"https://clownfish-app-2jcw3.ondigitalocean.app/websocket"}>
            <ChangeListener onDataReceived={updateLatestInput} />
        </StompSessionProvider>
		</div>
	<div id="autoSettings">

		<div>
			<div>
			<h2>AutoFan</h2>
			<h3>Current settings for AutoFan:</h3>
			</div>
				<h4>Selected temperature: {tempSens}°C | Selected device RID: {tempSensIndex}</h4>
		</div>
			<div>
				<div>
					<h2>AutoLight</h2>
					<h3>Current settings for AutoLight:</h3>
				</div>
					<h4>Selected lightsense: {lightSens} | Selected device RID: {lightSensIndex}</h4>
			</div>
{/* 
		<p>AutoFan Settings: {lightSens} | { lightSensIndex}</p>
		<p>AutoLight Settings: {tempSens} | { tempSensIndex}</p> */}
	</div>
	</>
);
}

export default ArduinoSensorData;
