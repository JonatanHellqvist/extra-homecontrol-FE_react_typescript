import LightSensInput from "../Sensordata/LightSensInput";
import TempSensInput from "../Sensordata/TempSensInput";
import BridgeIpInput from "./BridgeIpInput";
import PrintBridgeIp from "./PrintBridgeIp";

function Settings() {
	const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);

	return (
		<div>
			<h1>Settings</h1>
			<PrintBridgeIp userId={userId}/>
			<BridgeIpInput userId={userId}/>
			<div>
				<TempSensInput /> 
			</div>
			<div>
				<LightSensInput /> 
			</div>
		</div>
	);
}

export default Settings;