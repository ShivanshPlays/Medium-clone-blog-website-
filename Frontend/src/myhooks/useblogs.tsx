import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export interface Blog {
    "title":string,
    "content":string,
    "id":string,
    "author":{
        "name":string
    }
}

export const useBlogs = () => {
    const [loading,setloading]=useState(true);
    const [blogs,setblogs]=useState<Blog[]>([]);

    async function fetchblogs(){
        try{
            const response=await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    Authorization:`BEARER ${localStorage.getItem("token")}`
                }
            });
            if(response){
                setloading(false);
                setblogs(response.data.blogs);
            }
        }catch(err){
            //@ts-ignore
            console.log(`error while fetching blogs, the backend said: ${err.message}`);
        }
        
    }
    useEffect(()=>{
        fetchblogs();
    },[])

    return{
        loading,blogs
    }
};


export const useBlog = ({id}:{id:string}) => {
    const [loading,setloading]=useState(true);
    const [blog,setblog]=useState<Blog>();

    async function fetchblogs(){
        try{
            const response=await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                headers:{
                    Authorization:`BEARER ${localStorage.getItem("token")}`
                }
            });
            if(response){
                setloading(false);
                setblog(response.data.blog);
            }
        }catch(err){
            //@ts-ignore
            console.log(`error while fetching blogs, the backend said: ${err.message}`);
        }
        
    }
    useEffect(()=>{
        fetchblogs();
    },[])

    return{
        loading,blog
    }
};
