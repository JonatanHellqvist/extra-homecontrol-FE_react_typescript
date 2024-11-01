// import { useState } from "react";
// // import FindDevices from "./FindDevices";
// import MyDevices from "./MyDevices";

// interface UserMenuProps {
//     userId: string;
// }

// function UserMenu({ userId }: UserMenuProps) {
// 	// const [showDevices, setShowDevices] = useState(false);
// 	const [showMyDevices, setShowMyDevices] = useState(false);
	
// 	// const findDevices = () => {
//     //     setShowDevices(true);
//     // };

// 	const printMyDevices = () => {
//         setShowMyDevices(true);
//     };
	
// 	return (
// 		<div>
// 			<button onClick={printMyDevices}>My devices</button>
// 			{/* <button onClick={findDevices}>Find devices</button> */}
// 			<button>Settings</button>
// 			{/* {showDevices && <FindDevices userId={userId} />}  */}
// 			{showMyDevices && <MyDevices userId={userId} />}
// 		</div>
// 	);
// }

// export default UserMenu;