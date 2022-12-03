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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAlert } from "./features/alertSlice";

import useDelayUnmount from "./hooks/useDelayUnmount";

import Toast from "./components/toast";
import Loading from "./components/loader";
import axios from "axios";

import { login } from "./features/authSlice";
import EditBlog from "./pages/editBlog";
import Footer from "./components/footer";

function App() {
  const { loading, toast } = useSelector(selectAlert);

  const showToast = useDelayUnmount(toast.visible, 900);

  useGetRefreshToken();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<UserDashboard />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/category/:name" element={<ByCategory />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
      {loading && <Loading />}
      {showToast && <Toast />}
    </div>
  );
}

export default App;

export function useGetRefreshToken() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function GetRefreshToken() {
      try {
        const res = await axios.get(
          "https://blogger-task-by-hotelshippo-backend.vercel.app/api/user/refresh_token",
          {
            withCredentials: true,
          }
        );
        dispatch(login(res.data));
      } catch (error) {
        console.log(error.response);
      }
    }
    GetRefreshToken();
  }, [dispatch]);
}
