import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Search from "./pages/search";

import Header from "./components/header";
import Blog from "./pages/blog";
import ByCategory from "./pages/byCategory";
import Login from "./pages/login";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/category/:name" element={<ByCategory />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
