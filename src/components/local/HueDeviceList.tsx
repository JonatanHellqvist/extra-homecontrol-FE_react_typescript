///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////|FÖR LOKAL ANVÄNDING AV BRIDGE MED LOKALT IP|////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import { useState, useEffect } from 'react';

// interface LightState {
// 	on: boolean;
// 	bri: number;
// 	ct: number;
// 	alert: string;
// 	colormode: string;
// 	mode: string;
// 	reachable: boolean;
// }

// interface Light {
// 	state: LightState;
// 	type: string;
// 	name: string;
// 	modelid: string;
// 	manufacturername: string;
// 	productname: string;
// 	uniqueid: string;
// 	swversion: string;
// }

// function HueDeviceList() {
// 	const [lights, setLights ] = useState<Light[]>([]);

// 	useEffect(() => {
// 		fetch('https://clownfish-app-2jcw3.ondigitalocean.app/api/lights')
//             .then(response => response.json())
//             .then(data => {
// 				const lightsArray: Light[] = Object.values(data);
// 				setLights(lightsArray)
// 				console.log("lightsarray: ", lightsArray);
// 			})
//     }, []);

// 	const toggleLight = (lightId: string, isOn:boolean) => {
// 		console.log(isOn);
// 		console.log(lightId);
// 		// Uppdatera statet på lampan
// 		setLights(prevLights =>
// 			prevLights.map((light, index) =>
// 				(index +1).toString() === lightId ? { ...light, state: { ...light.state, on: isOn }} : light
// 			)
// 		);
// 		fetch(`https://clownfish-app-2jcw3.ondigitalocean.app/api/lights/${lightId}/state`, {
// 			method: 'PUT',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
			
// 			body: JSON.stringify({
//                 on: isOn,	
//             }),	
// 		})
// 		    .then(response => {
// 				if(!response.ok) {
// 					throw new Error ('Response not OK, ERROR')
// 				}
// 				return response.json()
// 				})
// 				.catch(error => console.error ('Error toggling light:', error));
// 	};
// 	const printLights = () => {
		
// 		return lights.map((light, index) => (
			
// 			<li key={index}>
// 				{light.name}: {light.state.on ? 'On' : 'Off'} 
// 				<button type="button" onClick={() => toggleLight(((index +1).toString()), !light.state.on)}>Turn {light.state.on ? 'Off' : 'On'}</button>
// 			</li>
// 		)); 	
// 	};

// 	return (
// 		<div>
// 			<h1>Hue Devices</h1>
// 			<ul>
// 				{printLights()}
// 			</ul>
// 		</div>
// 	);
// }

// export default HueDeviceList;