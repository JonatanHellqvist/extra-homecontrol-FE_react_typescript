import { useEffect, useState } from "react";

//Visa en lista över mina devices och kunna redigera dem. Redigera namn/ta bort från lista
interface props {
	userId : string;
}

//TODO - 
interface Device {
    id: string;
    deviceData: {
        //uniqueid: string;
        name: string;
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

	
	return (
		<div>
			<h2>Your Devices</h2>
            <ul>
                {devices.map(device => (
                    <li key={device.id}>
					{device.deviceData.name}
				</li>
                ))}
            </ul>
		</div>
	);
}

export default MyDevices;