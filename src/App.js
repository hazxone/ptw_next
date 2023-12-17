import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import './styles/global.css'
// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import CreatePtw from "./pages/CreatePtw"
import Dashboard from "./pages/Dashboard"
import View from "./pages/View"
import Sidebar from "./components/Sidebar"


function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePtw />} />
        <Route path="/:id" element={<View />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
