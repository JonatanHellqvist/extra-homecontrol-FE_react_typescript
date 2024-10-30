
import { useEffect, useState } from "react";

interface Device {
    id: string;
	id_v1: string;
    metadata: { 
		name: string;
	}		
    product_data: {
        model_id: string;
	}
		services:	{ 	rid: string; 
						rtype: string 
					}[];		
    };

interface FindDevicesProps {
	userId: string; // Ta emot userId som en prop
}

function FindDevicesFromAuthUser({ userId }: FindDevicesProps)  {
	const [devices, setDevices] = useState<Device[]>([]);

    // const apiURL = import.meta.env.REACT_APP_LOCAL_URL
	const apiURL = import.meta.env.VITE_LOCAL_URL; //lokalt

    useEffect(() => {
        const fetchDevices = async () => {
                fetch(`${apiURL}/hue/devices`)
				.then(response => {
					if (!response.ok) {
						throw new Error('Network response was not ok');
					}
					return response.json();
				})
				.then(data => {
                    const devicesArray: Device[] = Object.values(data.data);
                    setDevices(devicesArray);
                    console.log("devicesArray: ", devicesArray);
                })
        };
		fetchDevices();
    }, [userId]);

	//TODO LÄGGA TILL DEVICE

	// const addDevice = (device: Device, index: number, userId: String) => {
	// 	fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/${userId}/list`) 
	// 		.then(response => {
	// 			if (!response.ok) {
	// 				throw new Error('Network response was not ok');
	// 			}
	// 			return response.json();
	// 		})
	// 		.then(existingDevices => {
	// 			console.log("Existing devices: ", existingDevices);
	
	// 			if (!Array.isArray(existingDevices)) {
	// 				alert("Unexpected response format for existing devices.");
	// 				return;
	// 			}
	
	// 			//Kolla om device rdan finns baserat på "hueindex"
	// 			const isDeviceExists = existingDevices.some(existingDevice => {
	// 				return existingDevice.hueIndex === index; 
	// 			});
	
	// 			if (isDeviceExists) {
	// 				alert("Device already exists");
	// 				return; 
	// 			}
	
	// 			const newDevice = {
	// 				deviceData: JSON.stringify(device),
	// 				hueIndex: index,
	// 				userId: userId,
	// 			};
	
	// 			return fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/${userId}/list/adddevice`, {
	// 				method: "POST",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(newDevice),
	// 			});
	// 		})
	// 		.then(response => {
	// 			if (!response || !response.ok) {
	// 				throw new Error('Error, response not ok');
	// 			}
	// 			return response.json(); 
	// 		})
	// 		.then(data => {
	// 			console.log("Device added successfully:", data);
	// 			//TODO
	// 			//MEDDELANDE OM ATT DEVICE HAR LAGTS TILL
	// 		})
	// 		.catch(error => console.error("Error adding device:", error));
	// };

	const getDeviceInfo = async (deviceId:String) => {
		console.log(deviceId);
		
		fetch (`${apiURL}/hue/device/${deviceId}`)
		.then((response) => {
			console.log(response)
		})
		.then(data => {
			console.log((data));		
		})		
	};

	const toggleDevice = async (deviceId:String, isOn: boolean) => {
		console.log(`Toggling Device:  ${isOn ? "ON" : "OFF"}`);
		fetch (`${apiURL}/hue/device/${deviceId}`, {
			method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(isOn),
		})
		.then((response) => response.text())
		.then(data => {
			console.log("Response: ", data);	
		})		
	};
	
    return (
        <div>
            <h2>Hue Devices</h2>
            {devices.length > 0 ? (
                <ul>
                    {devices.map((device) => (
                        <li key={device.id}>
                            <strong>Name:</strong> {device.metadata.name} | 
                            {/* <strong> Model:</strong> {device.product_data.model_id} */}
							<button onClick={() => getDeviceInfo (device.services["1"].rid)}>DeviceInfo</button> 
							<button onClick={() => toggleDevice(device.services["1"].rid, true)}>TurnOn</button> 
							<button onClick={() => toggleDevice(device.services["1"].rid, false)}>TurnOFF</button> 

							
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No devices found</p>
            )}
        </div>
    );
};
export default FindDevicesFromAuthUser;