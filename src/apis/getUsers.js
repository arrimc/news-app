export async function getUsers() {
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const userData = await resp.json();
      return userData;
    } catch (error) {
      console.log("error:", error);
      throw error; 
    }
  }
  