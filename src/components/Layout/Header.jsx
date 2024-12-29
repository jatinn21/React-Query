import { NavLink } from "react-router";
const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">ReactQuery</NavLink>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/old">Fetch-Old</NavLink>
          </li>
          <li>
            <NavLink to="/new"> Fetch-RQ </NavLink>
          </li>
          <li>
            <NavLink to="/infinite"> Infinite-Scroll </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
