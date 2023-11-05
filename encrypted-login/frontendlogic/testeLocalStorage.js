export function checkLocalStorage(){
   const auth = JSON.parse(localStorage.getItem('token')) ?? false
   return auth
}