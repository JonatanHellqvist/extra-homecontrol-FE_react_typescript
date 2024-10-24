import React from 'react';

export interface toggleData {
	deviceId: String;
	state: boolean;

}
export function toggleDevice(deviceId: String, state: boolean) {
	
	console.log("Id: ", deviceId);
	console.log("State: ", state);
		
		fetch(`http://localhost:8080/api/lights/${deviceId}/state`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			
			body: JSON.stringify({
				on: state	
			}),	
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
		})		
	return (
		<div>
			<h3>{deviceId} started</h3>
		</div>
	);
}

export default toggleDevice;