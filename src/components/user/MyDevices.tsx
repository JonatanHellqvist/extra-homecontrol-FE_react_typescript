import { useEffect, useState } from "react";
// import toggleDevice from "../toggledevice/toggleDevice";

//Visa en lista över mina devices och kunna redigera dem. Redigera namn/ta bort från lista
interface props {
	userId : string;
}

//TODO - 
interface Device {
	hueIndex: number;
    id: string;
    deviceData: {
        //uniqueid: string;
        name: string;
		state: {
			on: boolean;
		}
    };
}
 
function MyDevices({ userId } : props) {
	const [devices, setDevices] = useState<Device[]>([]);
	
	
	const fetchDevices = async () => {
		console.log("userId: " + userId);
		
	fetch (`http://localhost:8080/${userId}/list`, {
		method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
		
	})
	.then (res => res.json())
	.then (data => {
        console.log("data: ", data);

		const parsedDevices = data.map((device: any) => ({
			...device,
			deviceData: JSON.parse(device.deviceData) 
		}));

		setDevices(parsedDevices);  
    })
	
}
	
	useEffect(() => {
        fetchDevices();
    }, [userId]);

// Toggle device on/off
// const toggleDevice = async (hueIndex: number, isOn: boolean) => {
// 	// Update local state optimistically
// 	setDevices(prevDevices =>
// 		prevDevices.map(device =>
// 			device.hueIndex === hueIndex
// 				? { ...device, deviceData: { ...device.deviceData, state: { ...device.deviceData.state, on: isOn }}}
// 				: device
// 		)
// 	);

// 	try {
// 		const response = await fetch(`http://localhost:8080/${userId}/list/${hueIndex}/state`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ on: isOn }),
// 		});

// 		if (!response.ok) {
// 			const errorText = await response.text();
// 			throw new Error(`Failed to update device status: ${errorText}`);
// 		}

// 		const data = await response.json();
// 		console.log("Device status updated successfully:", data);
// 	} catch (error) {
// 		console.error('Error toggling device:', error);
// 		// Optionally revert local state if necessary
// 		setDevices(prevDevices =>
// 			prevDevices.map(device =>
// 				device.hueIndex === hueIndex
// 					? { ...device, deviceData: { ...device.deviceData, state: { ...device.deviceData.state, on: !isOn }}}
// 					: device
// 			)
// 		);
// 	}
// };

//tillsvidare
//test
const toggleLight = (lightId: number, isOn:boolean) => {
	console.log(isOn);
	console.log(lightId);
	// Uppdatera statet på lampan
	// Uppdatera statet på lampan
	setDevices(prevDevices =>
		prevDevices.map(device =>
			device.hueIndex === lightId ? { ...device, deviceData: { ...device.deviceData, state: { ...device.deviceData.state, on: isOn }} } : device
		)
	);
	fetch(`http://localhost:8080/api/lights/${lightId}/state`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		
		body: JSON.stringify({
			on: isOn,	
		}),	
	})
		.then(response => {
			if(!response.ok) {
				throw new Error ('Response not OK, ERROR')
			}
			return response.json()
			})
			.catch(error => console.error ('Error toggling light:', error));
};
	
	return (
		<div>
			<h2>Your Devices</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
						HBI: {device.hueIndex} | Name - {device.deviceData.name}: {device.deviceData.state.on ? 'On' : 'Off'}
						<button type="button" onClick={() => toggleLight(device.hueIndex, !device.deviceData.state.on)}>
							Turn {device.deviceData.state.on ? 'Off' : 'On'}
						</button>
					</li>
                ))}
            </ul>
		</div>
	);
}

export default MyDevices;