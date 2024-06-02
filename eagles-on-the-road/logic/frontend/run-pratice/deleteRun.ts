interface ObjType {
    _id: string
}

export async function deleteRunPratice(run: ObjType){
    const option ={
        method: 'DELETE',
        headers: {'Content-Type': 'aplication/json'}
    }
    const res = await fetch(`/api/v1/runs-pratice/${run._id}`, option)

    return res.status === 200 
}