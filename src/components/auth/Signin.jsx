import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/todolist");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Account not found. Please sign up.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      console.error("Error signing in:", error.code, error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Sign In</h1>
        <form className="mt-4" onSubmit={handleSignIn}>
          <input
            className="w-full p-2 border rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full mt-2 p-2 border rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded">
            Sign In
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          <p className="mt-5 text-center">
            No account?{" "}
            <span className="text-indigo-600 underline">
              <Link to="/signup">Create one!</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
