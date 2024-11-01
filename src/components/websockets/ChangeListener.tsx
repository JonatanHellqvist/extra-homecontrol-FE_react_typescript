import { useState } from 'react';
import { useSubscription } from 'react-stomp-hooks';


interface LatestInputData {
	timeStamp: string,
	celsius: number,
	humidity: number,
	photoTransistorValue: number,

}

interface ChangeListenerProps {
    onDataReceived: (data: LatestInputData) => void; 
}

const ChangeListener: React.FC<ChangeListenerProps> = ({ onDataReceived }) => {
	const [latestInput,setLatestInput] = useState<LatestInputData | null>(null);

	//subscribe
	useSubscription('/topic/changes', (message) => {
		const changeData: LatestInputData = JSON.parse(message.body);
		setLatestInput(changeData);
		onDataReceived(changeData);
		console.log("latest input: ",latestInput);
		
		console.log("changeData: ",changeData);	
	});
	return null;
};

export default ChangeListener;