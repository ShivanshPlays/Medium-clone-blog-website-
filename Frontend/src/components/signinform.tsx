import { useState } from "react"
import { InputBox } from "./inputbox"
import {Link, useNavigate} from "react-router-dom"
import { signinInput } from "@shivanshplays/medium-common"
import { Button } from "./button"
import axios from "axios"
import { BACKEND_URL } from "../config"



export const Signinform =()=>{

    const [postInputs,setPostInputs]=useState<signinInput>({
        email:"",
        password:""
    })

    const navigate= useNavigate();

    async function sendRequest() {
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signin`,postInputs);
            const jwt = response.data.jwt;
            // const token = jwt.split(" ")[1];
            localStorage.setItem("token",jwt);
            // console.log(jwt);
            navigate("/blogs");
        }catch(e){
            //@ts-ignore //because i dont know the type of this axios error
            console.log(e.message);
        }
    }
    return <div className="flex-col h-screen flex items-center justify-center">
        {/* {JSON.stringify(postInputs)} */}
        <div className="font-bold text-3xl">
            Signin
        </div>
        <div className="text-slate-400 mb-7">
            Don't have an account? <Link className="underline" to="/signup">signup</Link>
        </div>
        
        <InputBox name={"Email"} placeholder={"JohnDoe123@gmail.com"} onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                email:e.target.value
            })
        }}></InputBox>
    
        <InputBox name={"Password"} type={"password"} placeholder={"123456"} onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                password:e.target.value
            })
        }}></InputBox>

        <Button label={"Signin"} onClick={sendRequest}></Button>
    

    </div>
}