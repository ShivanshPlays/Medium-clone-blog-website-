import { useState } from "react"
import { InputBox } from "./inputbox"
import {Link, useNavigate} from "react-router-dom"
import { signupInput } from "@shivanshplays/medium-common"
import { Button } from "./button"
import { BACKEND_URL } from "../config"
import axios from "axios"



export const Signupform =()=>{

    const [postInputs,setPostInputs]=useState<signupInput>({
        name:"",
        email:"",
        password:"",
        punchline:""
    })
    const navigate=useNavigate();
    async function sendRequest() {
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/signup`,postInputs);
            const {jwt,name,id} = response.data;
            // const token = jwt.split(" ")[1];
            localStorage.setItem("token",jwt);
            localStorage.setItem("name",name);
            localStorage.setItem("id",id);
            // console.log(jwt);
            navigate("/");
        }catch(e){
            //@ts-ignore //because i dont know the type of this axios error
            console.log(e.message);
        }
    }

    return <div className="flex-col h-screen flex items-center justify-center">
        {/* {JSON.stringify(postInputs)} */}
        <div className="font-bold text-3xl">
            Create an account
        </div>
        <div className="text-slate-400 mb-7">
            Already have an account? <Link className="underline" to="/signin">login</Link>
        </div>
        
        <InputBox name={"Name"} placeholder={"John Doe"} onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                name:e.target.value
            })
        }}></InputBox>

        <InputBox name={"Punchline"} placeholder={"Master of myth, and the funniest person in the seven kingdoms"} onChange={(e)=>{
            setPostInputs({
                ...postInputs,
                punchline:e.target.value
            })
        }}></InputBox>      
 
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

        <Button label={"Signup"} onClick={sendRequest}></Button>
    

    </div>
}