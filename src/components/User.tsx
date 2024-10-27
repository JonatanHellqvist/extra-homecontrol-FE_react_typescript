import BridgeIpInput from "./user/bridgeIpInput";
import Login from "./user/Login";
import PrintBridgeIp from "./user/PrintBridgeIp";
import UserMenu from "./user/UserMenu";
// import Register from "./user/register";

function User() {
	
	  const userString = localStorage.getItem("loggedInUser");
	  const user = userString ? JSON.parse(userString) : null;
	  const userId = user?.id;
	  console.log(user.id);
	  


	return (
		<div>
			<h3>User</h3>
			<UserMenu/>
			<PrintBridgeIp userId={userId}/>
			 <BridgeIpInput userId={userId}/>

			<Login/>
			
		</div>
	);
}

export default User;