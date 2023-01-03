import { React } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddEdit from "./component/AddEdit";
import Home from "./component/Home.js";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addedit" element={<AddEdit />} />
          <Route path="/addedit/:id" element={<AddEdit />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
