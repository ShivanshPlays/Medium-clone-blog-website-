import { useEffect, useState } from "react";
import { Avatar } from "./avatar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
interface BlogCardInput {
    id:string,
    authorname:string,
    publishdate:string,
    title:string,
    content:string,
    punchline:string,
    authorId:string
}
export const Fullblogcard = ({title,publishdate,content,authorname,punchline,id,authorId}:BlogCardInput) => {

    const [logged, setlogged] = useState(false);

    const navigate=useNavigate();
    async function deleteBlog(id:string){
        const token = localStorage.getItem("token");
        
        try{
            await axios.delete(`${BACKEND_URL}/api/v1/blog/modify`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    data: {
                        id:id
                    }
                })
        }catch(err){
            console.log("error while deleting")
        }

        navigate("/");
        
    }
  useEffect(()=>{
    if(localStorage.getItem("id")===authorId){
        setlogged(true);
      }
  },[])
  return (
    
    <div className="px-10 py-5 grid grid-cols-12 h-full">
        <div className="col-span-8 flex flex-col justify-between h-full">
            <div>
                <div className="text-6xl font-extrabold text-slate-800 text-pretty break-words">{title}</div>
                <div className="text-gray-200 my-3">Posted on {publishdate}</div>
                <div className="text-xl text-gray-100 text-pretty break-words overflow-hidden">{content}</div>
            </div>

            {logged?
            (
            <div className="flex justify-end w-full">
                <button
                    type="button"
                    className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center "
                >
                    <Link to={`/blog/${id}/edit`}>edit</Link>
                    
                </button>
                <button
                onClick={()=>{
                    deleteBlog(id)
                }}
                    type="button"
                    className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center "
                >
                    delete
                </button>
            </div>
            ):<></>}
        </div>
        <div className="ml-5 col-span-4">
            <div>
            <div className="mb-3 font-medium">
                Author
            </div>
        
            <div className="flex  mb-3">
                <div className="mr-2 flex items-center justify-center">
                    <Avatar name={authorname}></Avatar>
                </div>
                <div className="text-lg font-bold text-slate-800">
                    {authorname}
                </div>
            </div>
            <div>
                {punchline}
            </div>
            
            </div>
        </div>
    </div>
    
  );
};
