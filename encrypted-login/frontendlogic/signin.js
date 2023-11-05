export async function signin(info) {
  if (!info.name || !info.email || !info.password) return false

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
    body: JSON.stringify({ name: info.name, email: info.email, password: info.password })
  };

  const res = await fetch('/api/signin', options)
  if (res.status === 200) {
    const result = await res.json()
    if (result) {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.3.0' },
        body: JSON.stringify({ email: info.email })
      }
      const resToken = await fetch('/api/gettoken', options)
      if (resToken.status === 200) {
        const token = await resToken.json()
        return token
      }
    }
  }
  return false
}