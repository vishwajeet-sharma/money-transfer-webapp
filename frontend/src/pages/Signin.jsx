import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

import { useNavigate } from "react-router-dom" 


export const Signin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="grid items-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your Credentials to access your Account"}/>
                <InputBox onChange={e => {
                    setUserName(e.target.value);
                }} placeholder={"johndoe@example.com"} label={"Username"} />
                <InputBox placeholder={"johndoe@example.com"} label={"Email"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder={"*****"} label={"Password"} />
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }} label={"Done"} />
                <BottomWarning label={"Don't have an Account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}
