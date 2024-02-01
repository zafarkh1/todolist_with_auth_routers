import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/todolist");
    } catch (error) {
      setError("Error creating account. Please try again.");
      console.error(error.message);
    }
  };


  const handleGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/todolist");
    } catch (error) {
      setError("Error signing up with Google. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-center text-2xl font-bold mb-4">Register</h1>
        <p>
          Already have an account?{" "}
          <span className="text-indigo-600 underline">
            <Link to={"/"}>Sign in</Link>
          </span>
        </p>
        <form className="mt-4" onSubmit={handleSignUp}>
          <input
            className="w-full p-2 border rounded"
            type="text"
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
            Sign Up
          </button>
          <p className="mt-4 text-center">
            -------------- or sign up with --------------
          </p>
          <button className="w-full mt-2 text-center" onClick={handleGoogle}>
            <img
              className="w-8 h-8 mx-auto border-0"
              src="https://banner2.cleanpng.com/20180326/gte/kisspng-google-logo-g-suite-google-guava-google-plus-5ab8b5b15fd9f4.0166567715220545773927.jpg"
              alt=""
            />
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
