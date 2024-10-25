import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom" 


import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="grid items-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"}/>
                <SubHeading label={"Enter your Information to create an Account"}/>
                <InputBox onChange={e => {
                    setFirstName(e.target.value);
                }} placeholder={"John"} label={"First Name"} />
                <InputBox onChange={e => {
                    setLastName(e.target.value);
                }} placeholder={"Doe"} label={"Last Name"} />
                <InputBox onChange={e => {
                    setUserName(e.target.value);
                }} placeholder={"johndoe@example.com"} label={"Email"} />
                <InputBox onChange={e => {
                    setPassword(e.target.value);
                }} placeholder={"*****"} label={"Password"} />
                <Button onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        firstName,
                        lastName,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                    navigate("/dashboard")
                }} label={"Done"} />
                <BottomWarning label={"Already have an Account?"} buttonText={"Log In"} to={"/signin"} />
            </div>
        </div>
    </div>
}
