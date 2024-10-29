
export interface toggleData {
	deviceId: number;
	state: boolean;

}
export function toggleDevice(deviceId: number, state: boolean) {
	
	console.log("Id: ", deviceId);
	console.log("State: ", state);
		
		fetch(`https://shark-app-ewg2d.ondigitalocean.app/api/lights/${deviceId}/state`, {
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


