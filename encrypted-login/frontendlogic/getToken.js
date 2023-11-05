export async function getToken(info, result){
   console.log()
   if(result){
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
        body: JSON.stringify({ email: info.email })
      }
      const resToken = await fetch('/api/gettoken', options)
      if (resToken.status === 200) {
        const token = await resToken.json()
        console.log(token)
        return token
      }
    }
}