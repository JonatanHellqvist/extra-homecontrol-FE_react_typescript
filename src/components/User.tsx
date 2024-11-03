import { useEffect, useState } from "react";

import Settings from "./user/Settings";
import MyDevices from "./user/MyDevices";

import ArduinoSensorData from "./Sensordata/ArduinoSensorData";
import Login from "./user/Login";
import FindDevicesFromAuthUser from "./user/FindDevicesFromAuthUser";

type User = {
    id: string;
    // Lägg till fler egenskaper om det behövs
};

function User() {
	const [subPage, setSubPage] = useState<string>("");
	const [user, setUser] = useState<User | null>(null);
	
	useEffect(() => {
		// Kontrollera localStorage för att se om användaren är inloggad
		const userString = localStorage.getItem("loggedInUser");
		const loggedInUser = userString ? JSON.parse(userString) : null;
		setUser(loggedInUser); // Uppdatera user-status
	}, []);
	// const userString = localStorage.getItem("loggedInUser");
	// const user = userString ? JSON.parse(userString) : null;
	// const userId = user ? user.id : null;

	const userId = user ? user.id : null;
	console.log(user);
	return (
		<>	
			{/* Visa bara knapparna om användaren är inloggad */}
			{user && (
				<div>
					<button onClick={() => setSubPage("mydevices")}>My Devices</button>
					<button onClick={() => setSubPage("finddevices")}>Find Devices</button>
					<button onClick={() => setSubPage("settings")}>Settings</button>
					<button onClick={() => setSubPage("arduinosensordata")}>Sensor Data</button>
				</div>
			)}

			{/* Rendera subPage-komponenter endast om användaren är inloggad */}
			{user && {
				"mydevices": userId? <MyDevices userId={userId} /> : null,
				"finddevices": userId? <FindDevicesFromAuthUser userId={userId} /> : null,
				"settings": <Settings />,
				"arduinosensordata": <ArduinoSensorData />
			}[subPage]}

			{/* Visa alltid Login-komponenten, den hanterar både login och logout */}
			<Login />
		</>

	);
}
export default User;
	