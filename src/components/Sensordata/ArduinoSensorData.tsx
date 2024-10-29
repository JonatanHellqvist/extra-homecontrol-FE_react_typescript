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

	useEffect (() => {
		fetch(`http://localhost:8080/get-latest-dht11-sensor-data`)
		.then(response => response.json())
		.then(data => {
			setLatestInput(data);			
			console.log(data);
	});	

	}, []);
	//körs varje gång databasen uppdateras och latestInput ändras
	//TODO ändra vilken temperatur fläkten ska gå igång och vilken index den har
	useEffect(() => {
		if(latestInput) {
			if(latestInput.celsius > 24
			) {
				toggleDevice(13,true);
			} else {
				toggleDevice(13,false);
			}
		}
	},[latestInput]);

	//input för vilken ljusstyrka innan lampa tänds
	//TODO useEffect för ljussensorn/phototransistor
	useEffect(() => {
		if(latestInput) {
            if(latestInput.photoTransistorValue < 50) {
                toggleDevice(5,true);
            } else {
                toggleDevice(5,false);
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
        <StompSessionProvider url={"http://localhost:8080/websocket"}>
            <ChangeListener onDataReceived={updateLatestInput} />
        </StompSessionProvider>
    </div>
);
}

export default ArduinoSensorData;
