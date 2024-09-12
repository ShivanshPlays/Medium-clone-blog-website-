import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import { Appbar } from "../components/appbar";
import { useBlog } from "../myhooks/useblogs";

export const Edit = () => {
    const {id}=useParams();

    const { loading, blog } = useBlog({ id: id || "" });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        if (blog) {
          setTitle(blog.title || "");
          setDescription(blog.content || "");
        }
      }, [blog]);
      

    if(loading){
        return <div>
            loading....
        </div>
    }else{

    return <div className=" bg-slate-600 h-screen">
            <Appbar />
       
            <div className="flex justify-center items-center pt-20"> 
                <div className="w-3/4">
                    <input onChange={(e) => {
                        setTitle(e.target.value)
                    }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lgblock p-2.5" placeholder="Title" value={title}/>
                    <TextEditor onChange={(e) => {
                        setDescription(e.target.value)
                    }} value={description} />
                    <button onClick={async () => {
                        await axios.put(`${BACKEND_URL}/api/v1/blog/modify`, {
                            id,
                            title,
                            content: description
                        }, {
                            headers: {
                                Authorization: `BEARER ${localStorage.getItem("token")}`
                            }
                        });
                        // console.log(response.data);

                        navigate(`/blog/${id}`)

                    }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
            </div>
    </div>
    }
}


function TextEditor({ onChange,value}: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,value:string}) {
    return <div className="mt-2">
        <div className="w-full mb-4 ">
            <div className="flex items-center justify-between border">
            <div className="my-2 bg-white rounded-b-lg w-full">
                <label className="sr-only">Publish post</label>
                <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." 
                value={value} required />
            </div>
        </div>
       </div>
    </div>
    
}