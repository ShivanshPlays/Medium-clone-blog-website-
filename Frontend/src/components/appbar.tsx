import { Link } from "react-router-dom";
import Dropdown from "./dropdown";
import { useEffect, useState } from "react";

export const Appbar = () => {
  const [logged, setlogged] = useState(true);

  useEffect(()=>{
    if(localStorage.getItem("token")===null){
        setlogged(false);
      }
  },[])
  
  const name = localStorage.getItem("name");
  return (
    <div className="flex px-8 py-2 justify-between border-b bg-slate-900">
      <div className="flex justify-center items-center font-bold text-xl">
        <Link to={"/"}>
          <img
            src="TheStoryJunction.png"
            className="h-20 w-80"
            alt="logo"
          ></img>
        </Link>
      </div>

      <div className="flex items-center justify-center">
        {logged ? (
          <>
            <Link to={`/publish`}>
              <button
                type="button"
                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center "
              >
                New
              </button>
            </Link>
            <Dropdown name={name || ""} setlogged={setlogged}></Dropdown>
          </>
        ) : (
          <>
            <Link to={`/signup`}>
              <button
                type="button"
                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center "
              >
                SignUp
              </button>
            </Link>
            <Link to={`/signin`}>
              <button
                type="button"
                className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-full text-sm px-5 py-2.5 text-center "
              >
                SignIn
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
