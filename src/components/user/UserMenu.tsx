import { useState } from "react";
import FindDevices from "./FindDevices";

interface UserMenuProps {
    userId: string; // Sätt typen för userId här
}

function UserMenu({ userId }: UserMenuProps) {
	const [showDevices, setShowDevices] = useState(false);

	const findDevices = () => {
        setShowDevices(true);
    };

	
	return (
		<div>
			<button>My devices</button>
			<button onClick={findDevices}>Find devices</button>
			<button>Settings</button>
			{showDevices && <FindDevices userId={userId} />} 
		</div>
	);
}

export default UserMenu;