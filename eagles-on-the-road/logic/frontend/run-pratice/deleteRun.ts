interface ObjType {
    _id: string
}

export async function deleteRunPratice(run: ObjType){
    const option ={
        method: 'DELETE',
        headers: {'Content-Type': 'aplication/json'}
    }
    console.log(run._id);
    const res = await fetch(`api/v1/runs-pratice/${run._id}`, option)
    if(res.status === 200){
        return true
    }
    return false
}