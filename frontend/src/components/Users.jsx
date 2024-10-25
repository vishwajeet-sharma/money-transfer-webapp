import { useEffect, useState } from "react"
import { Button } from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom" 

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user);
            })
    }, [filter])

    return <div className="grid items-center">
        <div className="font-bold pt-4 pl-6 text-lg">
            Users 
        </div>
        <div className="px-6 py-2">
            <input onChange={e => {
                setFilter(e.target.value);
            }} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </div>
}

const User = ({user}) => {
    const navigate = useNavigate();

    return <div className="flex items-center justify-between px-6">
        <div className="flex items-center pt-2">
            <div className="rounded-full h-10 w-10 bg-slate-200 flex justify-center items-center text-2xl font-semibold">
                {user.firstName[0]}
            </div>
            <div className="pl-2">
                {user.firstName} {user.lastName}
            </div>
        </div>
        <Button onClick={() => {
            navigate("/send?id=" + user._id + "&name=" + user.firstName)
        }} label={"Send Money"}/>
    </div>

}