
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Appbar } from "../components/appbar";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div className=" bg-slate-600 h-screen">
            <Appbar />
       
            <div className="flex justify-center items-center pt-20"> 
                <div className="w-3/4">
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lgblock p-2.5" placeholder="Title" />
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value)
                    }} />
                    <button onClick={async () => {
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog/modify`, {
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: `BEARER ${localStorage.getItem("token")}`
                            }
                        });
                        console.log(response.data.blog.id);
                        navigate(`/blog/${response.data.blog.id}`)
                    }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
    </div>
}


function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
            </div>
        </div>
       </div>
    </div>
    
}