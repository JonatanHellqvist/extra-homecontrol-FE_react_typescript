import { StompSessionProvider } from "react-stomp-hooks";
import ChangeListener from "../websockets/ChangeListener";

function ArduinoSensorData() {
	return (
		<div>
			<h3>Arduino Sensor Data:</h3>
			{/* -TODO- */}
			{/* Inställningar för att sätta på fläk/lampor baserat på resultat från sensorna
			INPUTS för att välja TEMPERATUR/FUKTIGHET/LJUSSTRYKA/TID */}
			<StompSessionProvider url={"http://localhost:8080/websocket"} >
				<ChangeListener/>
			</StompSessionProvider>
		</div>
	);
}

export default ArduinoSensorData;