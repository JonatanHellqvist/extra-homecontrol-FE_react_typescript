// import HueComponent from "../HueComponent";

import AutoToggleFanComponent from "../Sensordata/AutoToggleFanComponent";
import AutoToggleLightComponent from "../Sensordata/AutoToggleLightComponent";
// import LightSensInputAuth from "../Sensordata/LightSensInputAuth";
// import TempSensInput from "../Sensordata/TempSensInput";
// import TempSensInputAuth from "../Sensordata/TempSensInputAuth";


function Settings() {
	// const userString = localStorage.getItem("loggedInUser");
	//   const user = userString ? JSON.parse(userString) : null;
	//   const userId = user?.id;
	//   console.log(user.id);

	return (
		<div>
			<h1>Settings</h1>
			{/* <PrintBridgeIp userId={userId}/> */}
			{/* <BridgeIpInput userId={userId}/> */}

			<div>
				{/* lokalt ip */}
				{/* <TempSensInput />*/}
				{/* <TempSensInputAuth /> */}
				<AutoToggleFanComponent/>
			</div>
			<div>
				{/* lokalt ip */}
				{/* <LightSensInput />  */}
				{/* <LightSensInputAuth />  */}
				<AutoToggleLightComponent/>
			</div>
			<div>
			{/* <HueComponent/> */}
			{/* <FindDevicesFromAuthUser userId= {userId}/> */}
			</div>
		</div>
	);
}

export default Settings;