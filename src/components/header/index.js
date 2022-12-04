import React, { useState } from "react";

import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import { useSelector } from "react-redux";

import "./header.css";

import { selectAuth } from "../../features/authSlice";

import { ReactComponent as SearchIcon } from "../../assets/images/search-icon.svg";

import Toggler from "./toggler";

const Header = () => {
  const [toggled, setToggled] = useState(false);
  const search = useSearchParams();
  const {
    access_token,
    user: { avatar, _id },
  } = useSelector(selectAuth);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleToggle() {
    setToggled(false);
  }

  function handleInputChange(event) {
    const value = event.target.value;
    search[1]({ value });

    if (pathname.split("/")[1] !== "search") {
      navigate({
        pathname: "/search",
        search: createSearchParams({ value: value }).toString(),
      });
    }

    if (value.length < 1) {
      navigate("/");
    }
  }

  return (
    <header className="header">
      <Toggler toggled={toggled} setToggled={setToggled} />
      <section
        className="Logo"
        onClick={() => navigate("/")}
        data-logged={!!access_token}
      >
        <div>B</div>
        <span>Blogger</span>
      </section>
      <nav
        className="header__navLinks"
        data-toggled={toggled}
        data-logged={!!access_token}
      >
        <ul>
          <li>
            <Link to="/search?value=UI Design" onClick={handleToggle}>
              UI Design
            </Link>
          </li>
          <li>
            <Link to="/search?value=frontEnd" onClick={handleToggle}>
              Front-end
            </Link>
          </li>
          <li>
            <Link to="/search?value=backend" onClick={handleToggle}>
              Back-end
            </Link>
          </li>
          {!access_token && (
            <li className="header__loginLink">
              <Link to="/login" onClick={handleToggle}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <SearchIcon
        className="searchIcon"
        onClick={handleToggle}
        data-logged={!!access_token}
      />
      <input
        className="header__search"
        type="search"
        placeholder="Search"
        onInput={handleInputChange}
        data-logged={!!access_token}
      />
      {access_token && (
        <img
          src={avatar}
          alt=""
          className="Logged__avatar"
          onClick={() => navigate(`/user/${_id}`)}
        />
      )}
    </header>
  );
};

export default Header;
