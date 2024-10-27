import { useState } from "react";

interface ShowBridgeIpProps {
    userId: string; 
}


function PrintBridgeIp({userId } :ShowBridgeIpProps) {
	const [bridgeIp, setBridgeIp] = useState<string>('');
	fetch(`http://localhost:8080/user/bridgeip/${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
 
	})
	.then(res => res.json())
	.then(data => {
		console.log(JSON.stringify(data));
		setBridgeIp(data); 
	}) 


	


	return (
		<div>
			<h4>Your Bridge IP: {bridgeIp}</h4>
		</div>
	);
}

export default PrintBridgeIp;