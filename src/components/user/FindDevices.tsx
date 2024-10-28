import { useEffect, useState } from "react";

interface DeviceState {
	on: boolean;
	bri: number | null;
	ct: number;
	alert: string;
	colormode: string | null;
	mode: string;
	reachable: boolean;
}

interface Device {
	state: DeviceState;
	type: string;
	name: string;
	modelid: string;
	manufacturername: string;
	productname: string;
	uniqueid: string;
	swversion: string;
}

interface FindDevicesProps {
	userId: string; // Ta emot userId som en prop
}

function FindDevices({ userId }: FindDevicesProps)  {
	//Fetcha devices och kunna spara dom till "my devices" på databasen om de inte redan ligger där	
	const [devices, setDevices ] = useState<Device[]>([]);

	useEffect(() => {
			fetch(`http://localhost:8080/api/lights/user/${userId}/devices`)
				.then(response => response.json())
				.then(data => {
					const devicesArray: Device[] = Object.values(data);
					setDevices(devicesArray);
					console.log("devicesArray: ", devicesArray);
				})
				.catch(error => console.error("Error fetching devices:", error));
		
	}, [userId]); 

	const printDevices = () => {
		return devices.map((device, index) => (
			
			<li key={index}>
				{device.name}: {device.state.on ? 'On' : 'Off'} 
			</li>
		)); 	
	};

	return (
		<div>
			<h1>Hue Devices</h1>
 			<ul>
				{printDevices()}
			</ul>
		</div>
	);
}

export default FindDevices;