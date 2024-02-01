// ToDoList.js
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Navigate, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ToDoList = () => {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, value: value } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          value: value,
        },
      ]);
      setValue("");
    }
  };

  const handleEdit = (id, value) => {
    setEditId(id);
    setValue(value);
  };

  const handleDelete = (id) => {
    setTodos((currentTodo) => {
      return currentTodo.filter((todo) => todo.id !== id);
    });
  };

  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mx-auto mt-10 p-4 max-w-md">
      <form onSubmit={handleSubmit} className="mb-4 flex items-center">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task"
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add
        </button>
      </form>
      <ul className="list-disc pl-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border-b py-2 transition-transform transform hover:scale-105"
          >
            <span>{todo.value}</span>

            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500"
            >
              <button
                onClick={() => handleEdit(todo.id, todo.value)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col items-center">
        <p>Email: {user && user.email}</p>
        <button
          onClick={handleSignOut}
          className="mt-2 bg-red-500 text-white py-2 px-4 rounded"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
