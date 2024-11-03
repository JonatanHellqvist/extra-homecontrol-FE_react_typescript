import { useState } from "react";

import Settings from "./user/Settings";
import MyDevices from "./user/MyDevices";

import ArduinoSensorData from "./Sensordata/ArduinoSensorData";
import Login from "./user/Login";
import FindDevicesFromAuthUser from "./user/FindDevicesFromAuthUser";

//ROUTER
function User() {
	const [subPage, setSubPage] = useState<string>("");
	
	const userString = localStorage.getItem("loggedInUser");
	const user = userString ? JSON.parse(userString) : null;
	const userId = user ? user.id : null;

	console.log(user);
	return (
		<>	
			{/* Bara visa knapparna om användaren är inloggad */}
			{user && (
				<div>
					<button onClick={() => setSubPage("mydevices")}>My Devices</button>
					<button onClick={() => setSubPage("finddevices")}>Find Devices</button>
					<button onClick={() => setSubPage("settings")}>Settings</button>
					<button onClick={() => setSubPage("arduinosensordata")}>Sensor Data</button>
				</div>
			)}

			{/* Rendera subkomponenten baserat på valt subPage */}
			{
				{
					"mydevices": <MyDevices userId={userId} />,
					"finddevices": <FindDevicesFromAuthUser userId={userId} />,
					"settings": <Settings />,
					"arduinosensordata": <ArduinoSensorData />
				}[subPage]
			}

			{/* Visa inloggningskomponenten om användaren inte är inloggad */}
			{<Login />}
		</>

	);
}
export default User;
	