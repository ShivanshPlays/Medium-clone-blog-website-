import { Avatar } from "./avatar"

interface BlogCardInput {
    authorname:string,
    publishdate:string,
    title:string,
    content:string
}
export const BlogCard=({authorname,publishdate,title,content}:BlogCardInput)=>{
    return <div className="border-b m-1">
        <div className="flex">
            <div>
                <Avatar name={authorname}></Avatar>
            </div>
            <div className="ml-2">
                {authorname}
            </div>
            <div className="flex items-center justify-center mx-1">
                <Greydot></Greydot>
            </div>
            <div className="text-gray-400">
                {publishdate}
            </div>
            
        </div>
        <div className="font-bold text-xl w-3/4">
            {title}
        </div>
        <div className="w-4/5 text-sm">
            {content.length>100?content.slice(0,100)+"...":content}
        </div>
        <div className="text-gray-400 text-xs my-3">
            {Math.floor(content.length/100)+" "+"min read"}
        </div>
        
    </div>
}

function Greydot(){
    return <div className="w-0.5 h-0.5  bg-gray-400 rounded-full">
        
    </div>
}
// inline-flex