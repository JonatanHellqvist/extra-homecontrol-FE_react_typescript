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

	// const apiURL = import.meta.env.REACT_APP_LOCAL_URL
	const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

	//Fetcha devices och kunna spara dom till "my devices" på databasen om de inte redan ligger där	
	const [devices, setDevices ] = useState<Device[]>([]);
	// const [existingDevices, setExistingDevices] = useState<Device[]>([]); 


	useEffect(() => {
			fetch(`${apiURL}/api/lights/user/${userId}/devices`)
				.then(response => response.json())
				.then(data => {
					const devicesArray: Device[] = Object.values(data);
					setDevices(devicesArray);
					console.log("devicesArray: ", devicesArray);
				})
				.catch(error => console.error("Error fetching devices:", error));
		
	}, [userId]); 

	const addDevice = (device: Device, index: number, userId: String) => {
		fetch(`${apiURL}/${userId}/list`) 
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(existingDevices => {
				console.log("Existing devices: ", existingDevices);
	
				if (!Array.isArray(existingDevices)) {
					alert("Unexpected response format for existing devices.");
					return;
				}
	
				//Kolla om device rdan finns baserat på "hueindex"
				const isDeviceExists = existingDevices.some(existingDevice => {
					return existingDevice.hueIndex === index; 
				});
	
				if (isDeviceExists) {
					alert("Device already exists");
					return; 
				}
	
				const newDevice = {
					deviceData: JSON.stringify(device),
					hueIndex: index,
					userId: userId,
				};
	
				return fetch(`${apiURL}/${userId}/list/adddevice`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newDevice),
				});
			})
			.then(response => {
				if (!response || !response.ok) {
					throw new Error('Error, response not ok');
				}
				return response.json(); 
			})
			.then(data => {
				console.log("Device added successfully:", data);
				//TODO
				//MEDDELANDE OM ATT DEVICE HAR LAGTS TILL
			})
			.catch(error => console.error("Error adding device:", error));
	};
//+1 på index för att få rätt index från bridge
	const printDevices = () => {
		return devices.map((device, index) => (
			
			<li key={index}>
				{device.name}: {device.state.on ? 'On' : 'Off'} 
				 <button onClick={() => addDevice(device,index+1,userId)}>Add Device</button> 
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