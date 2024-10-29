import { useEffect, useState } from "react";

import PrintBridgeIp from "./user/PrintBridgeIp";

import Settings from "./user/Settings";
import MyDevices from "./user/MyDevices";
import FindDevices from "./user/FindDevices";
import ArduinoSensorData from "./Sensordata/ArduinoSensorData";
import Login from "./user/Login";
// import Register from "./user/register";



function User() {
	const [subPage, setSubPage] = useState<string>("");
	
	
	  const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user ? user.id : null;

	  console.log(user);

	
	  return (
		<>
			<Login/>
		<div>
			{/* TODO om inloggad user annas dölj */}
		  <button onClick={() => setSubPage("mydevices")}>My Devices</button>
		  <button onClick={() => setSubPage("finddevices")}>Find Devices</button>
		  <button onClick={() => setSubPage("settings")}>Settings</button>
		  <button onClick={() => setSubPage("arduinosensordata")}>Sensor Data</button>
		</div>
		  
	{/* <div>SubPage : {subPage}</div> */}
	{
		{
			"mydevices":
			<MyDevices userId={userId}/>,
			"finddevices": 
			<FindDevices userId={userId}/>,
			"settings": 
			<Settings />,
			"arduinosensordata":
			<ArduinoSensorData/>

		}	[subPage]
	} 
	</>

	);
}

		  {/* {subPage === "mydevices" && (
			<>
			<PrintBridgeIp userId={userId}/>
			<MyDevices userId={userId}/>
			</>
		  )}
		  {subPage === "finddevices" && <FindDevices userId={userId}/>}
		  {subPage === "settings" && <Settings />}
		  <Login />
		</div>
	  );
	} */}
	
	export default User;
	// {
	// 	{
	// 	  "start":<Start />,
	// 	  "devices":<Devices />,
	// 	  "user":<User />,
	// 	  "chat": <Chat />
	// 	} [page]
	//   }

// return (
// 	<div>
// 		<h3>User</h3>
// 		<UserMenu userId={userId}/>
// 		<PrintBridgeIp userId={userId}/>
// 		 <BridgeIpInput userId={userId}/>

// 		<Login/>
		
// 	</div>
// );
// }

// export default User;




//   return (
//     <>
    
    
//     <h1>Home Controller</h1>
//     <button onClick={() => setPage("start")}>Start</button>
//     <button onClick={() => setPage("devices")}>Devices</button>
//     <button onClick={() => setPage("user")}>User</button>
//     <button onClick={() => setPage("chat")}>Chat</button>
//     {/* <StompSessionProvider url={"http://localhost:8080/websocket"} >
//     <ChangeListener/>
//     </StompSessionProvider> */}
//     {/* loginform / registerform /logoutform*/}
//     {admin ? <button>Admin</button> : null}

//     {/* <div>Page : {page}</div> */}
//      {/* <HueDeviceList /> */}
//     {
//       {
//         "start":<Start />,
//         "devices":<Devices />,
//         "user":<User />,
//         "chat": <Chat />
//       } [page]
//     }


//     </>
//   )
// }

// export default App
