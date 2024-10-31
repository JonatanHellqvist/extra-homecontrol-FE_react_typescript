// Definiera typen för användarobjektet (exempelvis om användaren har id och namn)
interface User {
	id: string;
	name: string;
	// Lägg till andra egenskaper som användarobjektet kan ha
  }

export function getLoggedInUser(): User | null {
  const userString = localStorage.getItem("loggedInUser");
  return userString ? JSON.parse(userString) as User : null;
}