import { StompSessionProvider } from "react-stomp-hooks";
import HueDeviceList from "./HueDeviceList";
// import Dht11 from "./Sensordata/Dht11";
import ChangeListener from "./websockets/ChangeListener";

function Devices() {
	return (
		<div>
			<h2>Latest reading:</h2>
			{/* <Dht11/> */}
			{/* <StompSessionProvider url={"http://localhost:8080/websocket"} >
				<ChangeListener/>
			</StompSessionProvider> */}
			<h3>Devices</h3>
			<HueDeviceList/>
		</div>
	);
}

export default Devices;