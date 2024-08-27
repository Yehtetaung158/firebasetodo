import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  getDocs,
  collection,
  orderBy,
  query,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import editIcon from "../assets/edit-svgrepo-com.svg";
import deleteIcon from "../assets/delete-row-svgrepo-com.svg";
import okeditIcon from "../assets/ok-svgrepo-com.svg";
import emptyIcon from "../assets/empty-box-svgrepo-com.svg";
import useAlert from "./hook/useAlert";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [userId, setUserId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const alertfun = useAlert();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (userId) {
  //     const fetchTodos = async () => {
  //       try {
  //         const q = query(
  //           collection(db, `users/${userId}/todos`),
  //           orderBy("timestamp", "desc")
  //         );
  //         const querySnapshot = await getDocs(q);
  //         const todosList = querySnapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setTodos(todosList);
  //       } catch (error) {
  //         console.error("Error fetching todos:", error);
  //       }
  //     };
  //     fetchTodos();
  //   }
  // }, [userId]);

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, `users/${userId}/todos`),
        orderBy("timestamp", "desc")
      );

      // Using onSnapshot to listen for real-time updates
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const todosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTodos(todosList);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    }
  }, [userId]);

  const handleToggleDone = async (id, done) => {
    try {
      const todoRef = doc(db, `users/${userId}/todos`, id);
      await updateDoc(todoRef, { done: !done });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, done: !done } : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const todoRef = doc(db, `users/${userId}/todos`, id);
      await deleteDoc(todoRef);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleEditChange = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const handleEdit = async (id, updateData) => {
    try {
      const todoRef = doc(db, `users/${userId}/todos`, id);
      await updateDoc(todoRef, { text: updateData });

      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: updateData } : todo
        )
      );
    } catch (e) {
      console.error("Update error", e);
    } finally {
      setEditingId(null);
    }
  };

  if (!userId) {
    return <p>Please log in to view your todos.</p>;
  }

  return (
    <>
      <div className="container px-5 py-2 mx-auto">
        <div className="flex flex-col text-center w-full my-2">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            To-Do list of {auth?.currentUser?.displayName}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequatur.
          </p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto text-white">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Id
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Title
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm text-center bg-gray-100">
                  Done/Undone
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm text-end bg-gray-100">
                  Action
                </th>
                <th className="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br" />
              </tr>
            </thead>
            <tbody>
              {todos.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 p-10 text-center text-white"
                  >
                    <div className=" flex flex-col justify-center items-center gap-4">
                    <img className=" size-32" src={emptyIcon} alt="" />
                    <p>  No todos available</p>
                    </div>
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id}>
                    <td className="px-4 py-3">#</td>
                    <td
                      className="px-4 py-3"
                      style={{
                        textDecorationLine: todo.done ? "line-through" : "none",
                      }}
                    >
                      {editingId === todo.id ? (
                        <input
                          onBlur={(e) => handleEdit(todo.id, e.target.value)}
                          type="text"
                          value={todo.text}
                          onChange={(e) =>
                            handleEditChange(todo.id, e.target.value)
                          }
                          name="editText"
                          id="editText"
                          className="bg-gray-700 px-2 rounded"
                        />
                      ) : (
                        <> {todo.text}</>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        className="bg-red-300"
                        name="plan"
                        type="checkbox"
                        checked={todo.done}
                        onChange={() => handleToggleDone(todo.id, todo.done)}
                      />
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900 flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setEditingId(editingId === todo.id ? null : todo.id)
                        }
                      >
                        {editingId === todo.id ? (
                          <img className="size-6" src={okeditIcon} alt="" />
                        ) : (
                          <img className="size-6" src={editIcon} alt="" />
                        )}
                      </button>
                      <button
                        onClick={() => alertfun(() => handleDelete(todo.id))}
                      >
                        <img className="size-6" src={deleteIcon} alt="" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TodoList;
// onClick={() => handleDelete(todo.id)}
