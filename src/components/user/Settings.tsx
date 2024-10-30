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
		<div id="settingsDiv">
			<div id="settingsH1Div">
			<h1 id="settingsH1">Settings</h1>
			</div>
			<div id="settingsInformationTextDiv">
			
			<h3>Automation for devices are based on the latest sensor reading made by Arduino - see Sensor Data for more info.</h3>
			<p>Here you can choose the limit for the temperature/light sensor reading at which your fan/light/device should start.
				For philips hue Cloud2Cloud Api.v2 you use the RID for the device found in Device information Api request in the "services" array as ID for ON/OFF requests, you can use a smartplug for the fan/device.</p>
				

			</div>
			{/* <PrintBridgeIp userId={userId}/> */}
			{/* <BridgeIpInput userId={userId}/> */}

			<div id="settingsAutoFanDiv">
				{/* lokalt ip */}
				{/* <TempSensInput />*/}
				{/* <TempSensInputAuth /> */}
				<AutoToggleFanComponent/>
			</div>
			<div id="settingsAutoLightDiv">
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