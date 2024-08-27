import { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
// import { useAuthState } from 'react-firebase-hooks/auth'; // Optional for getting auth state
import { useAuthState } from "react-firebase-hooks/auth";
import TodoList from "./TodoList";
import LogoutButton from "./LogoutButton";

const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const [user] = useAuthState(auth);
  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (!user) return;
    try {
      const todosRef = collection(db, "users", user.uid, "todos");
      await addDoc(todosRef, {
        text: todo,
        timestamp: new Date(),
      });
      console.log("Todo added!");
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setTodo("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleAddTodo}
        className=" w-full container flex items-center justify-center mx-auto gap-2 py-4"
      >
        <div className="relative lg:w-full xl:w-1/2 w-2/4">
          <input
            required
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter todo"
            className="w-full text-white bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddTodo;
