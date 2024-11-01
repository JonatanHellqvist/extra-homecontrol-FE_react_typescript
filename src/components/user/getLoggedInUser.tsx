interface User {
	id: string;
	name: string;
}

export function getLoggedInUser(): User | null {
  const userString = localStorage.getItem("loggedInUser");
  return userString ? JSON.parse(userString) as User : null;
}