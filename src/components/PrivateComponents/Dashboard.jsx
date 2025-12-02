import { useAuth } from "../../context/AuthContext"

function Dashboard() {
    const {session}=useAuth();
    console.log(session);
    return (
        <div className="h-full dark:bg-slate-950">
            THis is Dashboard
        </div>
    )
}

export default Dashboard
