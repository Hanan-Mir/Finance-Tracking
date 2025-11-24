import { useAuth } from "../../context/AuthContext"

function Dashboard() {
    const {session}=useAuth();
    console.log(session);
    return (
        <div>
            THis is Dashboard
        </div>
    )
}

export default Dashboard
