import { Route, Routes } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Signin from "./components/auth/Signin";
import ToDoList from "./components/to do/ToDoList";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <h1 className="text-center font-bold text-3xl mt-5">
        To do list with Firebase
      </h1>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
