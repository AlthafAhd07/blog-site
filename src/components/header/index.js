import React, { useState } from "react";
import {
  Link,
  useSearchParams,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";

import "./header.css";

import Toggler from "./toggler";

import { ReactComponent as SearchIcon } from "../../assets/images/search-icon.svg";

const Header = () => {
  const [toggled, setToggled] = useState(false);
  const search = useSearchParams();

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
      <section className="Logo" onClick={() => navigate("/")}>
        <div>B</div>
        <span>Blogger</span>
      </section>
      <nav className="header__navLinks" data-toggled={toggled}>
        <ul>
          <li>
            <Link to="/categories" onClick={handleToggle}>
              All Categories
            </Link>
          </li>
          <li>
            <Link to="/categories/ui" onClick={handleToggle}>
              UI Design
            </Link>
          </li>
          <li>
            <Link to="/categories/frontEnd" onClick={handleToggle}>
              Front-end
            </Link>
          </li>
          <li>
            <Link to="/categories/backend" onClick={handleToggle}>
              Back-end
            </Link>
          </li>
        </ul>
      </nav>
      <SearchIcon className="searchIcon" onClick={handleToggle} />
      <input
        className="header__search"
        type="search"
        placeholder="Search"
        onInput={handleInputChange}
      />
    </header>
  );
};

export default Header;
