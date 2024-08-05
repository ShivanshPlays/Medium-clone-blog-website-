import { ChangeEvent } from "react";

interface InputBoxType {
    name:string;
    placeholder:string;
    type?:string
    onChange: (e: ChangeEvent<HTMLInputElement>)=>void;
}

export const InputBox=({name,placeholder,onChange,type}:InputBoxType)=>{
    return <div className="w-full px-10 my-1">
        <label className="block mb-2 text-sm font-bold text-gray-900">{name}</label>
        <input onChange={onChange} type={type||"text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
}