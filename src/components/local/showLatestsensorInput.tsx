///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////|FÖR LOKAL ANVÄNDING AV BRIDGE MED LOKALT IP|////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// export interface ArduinoSensorData {
// 	timeStamp: string;
// 	celsius: number;
// 	humidity: number;
// 	photoTransistorValue: number;
// }

// export function showLatestsensorInput(latestInput: ArduinoSensorData| null) {
// 	if (!latestInput) {
// 	return <i><h4>Ingen data tillgänglig</h4></i>
// 	}

// 	let timeStampString = latestInput.timeStamp.toString();
// 	let date = timeStampString.substring(0, 10);
// 	let time = timeStampString.substring(11, 16);

// 	return (
// 		<div>
// 			<li>
//                 Date: {date} | Time: {time} | Temperature: {latestInput.celsius}°C | Humidity: {latestInput.humidity}% | LightSensor: {latestInput.photoTransistorValue}
//             </li>
// 		</div>
// 	);
// }

// export default showLatestsensorInput;