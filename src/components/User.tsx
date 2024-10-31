import { useState } from "react";

import Settings from "./user/Settings";
import MyDevices from "./user/MyDevices";

import ArduinoSensorData from "./Sensordata/ArduinoSensorData";
import Login from "./user/Login";
import FindDevicesFromAuthUser from "./user/FindDevicesFromAuthUser";
import { Link, Route, Routes } from "react-router-dom";
import Authenticate from "./user/Authenticate";
// import Register from "./user/register";



function User() {
	const [subPage, setSubPage] = useState<string>("");
	
	
	  const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user ? user.id : null;

	  console.log(user);

	
	  return (
		<>
			{/* test spara */}
		<div>
			{/* TODO om inloggad user annas dölj */}
		  {/* <button onClick={() => setSubPage("mydevices")}>My Devices</button>
		  <button onClick={() => setSubPage("finddevices")}>Find Devices</button>
		  <button onClick={() => setSubPage("settings")}>Settings</button>
		  <button onClick={() => setSubPage("arduinosensordata")}>Sensor Data</button> */}



{/* Navigation links for subpages */}
<				Link to="mydevices"><button>My Devices</button></Link>
				<Link to="finddevices"><button>Find Devices</button></Link>
				<Link to="settings"><button>Settings</button></Link>
				<Link to="arduinosensordata"><button>Sensor Data</button></Link>
				<Link to="authenticate"><button>Authenticate</button></Link>

		</div>
		
		  
	{/* {
		{
			"mydevices":
			<MyDevices userId={userId}/>,
			"finddevices": 
			// <FindDevices userId={userId}/>,
			<FindDevicesFromAuthUser userId={userId}/>,
			"settings": 
			<Settings />,
			"arduinosensordata":
			<ArduinoSensorData/>

		}	[subPage]
	}  */}


			{/* Define nested routes */}
			<Routes>
				<Route path="mydevices" element={<MyDevices userId={userId} />} />
				<Route path="finddevices" element={<FindDevicesFromAuthUser userId={userId} />} />
				<Route path="settings" element={<Settings />} />
				<Route path="arduinosensordata" element={<ArduinoSensorData />} />
				<Route path="authenticate" element={<Authenticate/>} />
			</Routes>
	<div>
		<h3>Welcome to Home Controller</h3>
	<Login/>
	</div>
	</>

	);
}
	export default User;
	