import "./App.css";
import Todo from "./components/Todo";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcomepage from "./components/Welcomepage";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcomepage />} />
        </Routes>
        <Routes>
          <Route path="/todos" element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
