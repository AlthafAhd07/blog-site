import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./App.css";

import Home from "./pages/home";
import Search from "./pages/search";
import Blog from "./pages/blog";
import Login from "./pages/login";
import Register from "./pages/register";
import UserDashboard from "./pages/user";
import CreateBlog from "./pages/createBlog";
import EditBlog from "./pages/editBlog";

import Header from "./components/header";
import Footer from "./components/footer";
import Toast from "./components/toast";
import Loading from "./components/loader";

import { login, logout } from "./features/authSlice";
import { selectAlert, showErrMsg } from "./features/alertSlice";

import useDelayUnmount from "./hooks/useDelayUnmount";

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
  const logged = localStorage.getItem("logged");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!logged) return;

    async function GetRefreshToken() {
      try {
        const res = await axios.get("/api/user/refresh_token");
        dispatch(login(res.data));
      } catch (error) {
        localStorage.removeItem("logged");
        dispatch(logout());
        dispatch(showErrMsg(error.response.data.msg));
      }
    }
    GetRefreshToken();
  }, [dispatch]);
}
