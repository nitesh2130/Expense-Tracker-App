// import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { ExpenseCard } from "./components/ExpenseCard";
import { UpdateExpense } from "./components/Model";
import { ExpensePage } from "./components/ExpensePage";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/card" element={<ExpenseCard />} />
        <Route path="/model" element={<UpdateExpense />} />
        <Route path="/expensepage" element={<ExpensePage />} />
      </Routes>
    </div>
  );
}

export default App;
