import HueDeviceList from "./HueDeviceList";
import Dht11 from "./Sensordata/Dht11";

function Devices() {
	return (
		<div>
			<h3>Latest reading</h3>
			<Dht11/>
			<h3>Devices</h3>
			<HueDeviceList/>
		</div>
	);
}

export default Devices;