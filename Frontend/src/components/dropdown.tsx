// Dropdown.js
import { useState } from "react";
import { Avatar } from "./avatar"; 
import { useNavigate } from "react-router-dom";

export const Dropdown = ({ name ,setlogged}: { name: string , setlogged:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  const toggleDropdown = () => setIsOpen(!isOpen);

  function performLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setlogged(false);
    navigate("/");
  }
  return (
    <div className="relative inline-block text-left">
      {/* Avatar */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="focus:outline-none"
      >
        <Avatar name={name} size="large" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              onClick={performLogout}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
