import { Heading } from "../components/Heading";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react"


export const Sendmoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="grid items-center">
            <div className="rounded-lg bg-white w-96 text-center p-2 h-max px-4">
                <Heading label={"Send Money"}/>
                <div className="flex items-center pt-12">
                    <div className="rounded-full h-10 w-10 bg-green-400 flex justify-center items-center text-2xl font-semibold">
                        {name[0].toUpperCase()}
                    </div>
                    <div className="pl-2 text-2xl font-semibold">
                        {name}
                    </div>
                </div>
                <div>
                    <div className="text-left pl-2 pt-2 font-medium">
                        Amount (₹)
                    </div>
                    <div className="px-2 py-2">
                        <input
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            type="number"
                            placeholder="Enter Amount"
                            className="w-full h-10 border bg-background rounded-md text-sm pl-2"
                            id="amount"
                        />
                    </div>
                </div>
                <div className="px-2 py-2">
                    <button onClick={() => {
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: id,
                            amount
                        },{
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                    }} type="button" className="w-full focus:outline-none text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Transfer
                    </button>
                </div>
            </div>
        </div>
    </div>
}