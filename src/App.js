import "./App.css";

import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Search from "./pages/search";

import Header from "./components/header";
import Blog from "./pages/blog";
import ByCategory from "./pages/byCategory";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDashboard from "./pages/user";
import CreateBlog from "./pages/createBlog";

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
        <Route path="/user/:id" element={<UserDashboard />} />
        <Route path="/blog/create" element={<CreateBlog />} />
      </Routes>
    </div>
  );
}

export default App;
