interface InfoType {
    description: string | undefined,
    valTarget: string | undefined
}

export async function setNewTarget(info: InfoType, userToken: string | undefined) {
    if(info.description === '') return 'Add some description'
    if(info.valTarget === '') return 'Add some value'
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.4.2'},
        body: JSON.stringify({userToken:`${userToken}`, description:`${info.description}`, targetValue:`${info.valTarget}`})
      }

      const res = await fetch('/api/v1/user/targets/new', options)
      if(res.status === 200){
        return true
      } else {
        return false
      }
    
}