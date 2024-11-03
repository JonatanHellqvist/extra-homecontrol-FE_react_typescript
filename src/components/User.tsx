import { useState } from "react";

import Settings from "./user/Settings";
import MyDevices from "./user/MyDevices";

import ArduinoSensorData from "./Sensordata/ArduinoSensorData";
import Login from "./user/Login";
import FindDevicesFromAuthUser from "./user/FindDevicesFromAuthUser";


function User() {
	const [subPage, setSubPage] = useState<string>("");
	
	const userString = localStorage.getItem("loggedInUser");
	const user = userString ? JSON.parse(userString) : null;
	const userId = user ? user.id : null;

	console.log(user);
	return (
		<>	
			{user && (
				<div>
					<button onClick={() => setSubPage("mydevices")}>My Devices</button>
					<button onClick={() => setSubPage("finddevices")}>Find Devices</button>
					<button onClick={() => setSubPage("settings")}>Settings</button>
					<button onClick={() => setSubPage("arduinosensordata")}>Sensor Data</button>
				</div>
			)}
			{
				{
					"mydevices": <MyDevices userId={userId} />,
					"finddevices": <FindDevicesFromAuthUser userId={userId} />,
					"settings": <Settings />,
					"arduinosensordata": <ArduinoSensorData />
				}[subPage]
			}
			{<Login />}
		</>

	);
}
export default User;
	