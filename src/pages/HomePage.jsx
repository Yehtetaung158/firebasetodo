import React, { useEffect } from "react";
import Logo from "../components/Logo";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";
import LogoutButton from "../components/LogoutButton";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const HomePage = () => {

  const profileText=auth?.currentUser?.displayName?.split(" ")[0].charAt(0).toUpperCase()

  const nav= useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        nav("/");
      }
    });
    return unsubscribe;
  }, [nav]);
  return (
    <div className=" min-h-screen bg-gray-600 flex flex-col">
      <header className="text-gray-600 body-font bg-gray-800">
        <div className="container mx-auto flex flex-wrap p-5 flex-row items-center justify-between">
          <a className="flex title-font font-medium items-center text-gray-900">
            <Logo />
            <span className="ml-3 text-xl text-white">To-do</span>
          </a>
          <div className=" flex  gap-2 justify-center items-center">
            <LogoutButton />
            <div>
              {/* <img src="" alt="" /> */}
              <button onClick={()=>nav("/user")} className="bg-gray-300 h-8 w-8 flex justify-center items-center rounded-full text-2xl font-bold">
                <h1>
                  {profileText && profileText}
                </h1>
              </button>
            </div>
          </div>
        </div>
      </header>

      <section className="text-gray-600 body-font flex-grow flex flex-col gap-2">
        <AddTodo />
        <TodoList />
      </section>

      <footer className="text-gray-600 body-font mt-auto bg-gray-800">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <Logo />
            <span className="ml-3 text-xl text-white">To Do</span>
          </a>
          <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2024 Yehtetaung            <a
              href="https://twitter.com/knyttneve"
              className="text-gray-600 ml-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              @knyttneve
            </a>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a className="text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500">
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                />
                <circle cx={4} cy={4} r={2} stroke="none" />
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
