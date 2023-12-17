import { Navbar } from "@/components/NavBar";

export default function User(){
    return(
        <div className="h-screen flex flex-col justify-between">
            <div>
                IMG
            </div>
            <p>Nome:</p>
            <p>email:</p>
            <Navbar/>
        </div>
    )
}