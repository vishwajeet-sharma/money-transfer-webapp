import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="grid items-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"}/>
                <SubHeading label={"Enter your Credentials to access your Account"}/>
                <InputBox placeholder={"johndoe@example.com"} label={"Email"} />
                <InputBox placeholder={"*****"} label={"Password"} />
                <Button label={"Done"} />
                <BottomWarning label={"Don't have an Account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
}
