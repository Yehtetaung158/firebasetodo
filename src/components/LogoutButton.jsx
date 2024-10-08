// src/components/LogoutButton.jsx
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Adjust the path if necessary
import { useNavigate } from "react-router-dom";
import logOutIcon from '../assets/logout-svgrepo-com.svg';

const LogoutButton = () => {
  const nav = useNavigate();
  const logOuthandle = () => {
    nav("/login",{state:{isNoData:true}});
  };
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
      logOuthandle();
      // Optionally, redirect to a different page after logging out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-flex gap-2 items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base md:mt-0"
    >
      <p className=" text-sm">Log Out</p>
      <img className=" size-6" src={logOutIcon} alt="" />
    </button>
  );
};

export default LogoutButton;
