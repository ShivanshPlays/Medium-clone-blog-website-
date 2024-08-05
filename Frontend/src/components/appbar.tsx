import { Link } from "react-router-dom"
import { Avatar } from "./avatar"

export const Appbar=()=>{
    return <div className="flex px-8 py-2 justify-between border-b">
        
        <div className="flex justify-center items-center font-bold text-xl">
            <Link to={"/blogs"}>
                Medium
            </Link>
        </div>
        
        
        <div className="flex">
            <Link to={`/publish`}>
                <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 ">New</button>
            </Link>
            <Avatar name="Shivansh" size="large"></Avatar>
        </div>
    </div>
}