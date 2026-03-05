import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import variables from "../styles/variables.scss";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";


const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logoo.png" alt="logo" />
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: variables.pinkred }}
            onClick={() => {navigate(`/properties/search/${search}`)}}
          />
        </IconButton>
      </div>
<div className="navbar_right">
  {/* Role display */}
  {user && user.role === "customer" && (
    <Link to="/properties" className="host customer_role_btn">
      Customer
    </Link>
  )}

  {/* Become a Host button for customers */}
  {user && user.role === "customer" ? (
    <Link to="/create-listing" className="host">
      Become A Host
    </Link>
  ) : !user ? (
    <Link to="/login" className="host">
      Become A Host
    </Link>
  ) : null}

  {/* Account dropdown */}
  <button
    className="navbar_right_account"
    onClick={() => setDropdownMenu(!dropdownMenu)}
  >
    <Menu sx={{ color: variables.darkgrey }} />
    {!user ? (
      <Person sx={{ color: variables.darkgrey }} />
    ) : (
      <img
        src={`https://househunt-8vj2.onrender.com/${user.profileImagePath.replace("public", "")}`}
        alt="profile photo"
        style={{ objectFit: "cover", borderRadius: "50%" }}
      />
    )}
  </button>

  {/* Dropdown menu */}
  {dropdownMenu && !user && (
    <div className="navbar_right_accountmenu">
      <Link to="/login">Log In</Link>
      <Link to="/register">Sign Up</Link>
    </div>
  )}

  {dropdownMenu && user && (
    <div className="navbar_right_accountmenu">
      {user.role === "customer" && (
        <>
         <a href="/my-bookings">My Bookings</a>
          <Link to="/properties">All Properties</Link>
  
          <Link to={`/${user._id}/wishList`}>Wish List</Link>
          
        </>
      )}
      {user.role === "host" && (
        <>
          <a href="/host-bookings">Booking Requests</a>
          <Link to={`/${user._id}/properties`}>My Properties</Link>
          <Link to="/create-listing">Post Properties</Link>
        </>
      )}
      <Link
        to="/login"
        onClick={() => {
          dispatch(setLogout());
        }}
      >
        Log Out
      </Link>
    </div>
  )}
</div>
      
    </div>
  );
};

export default Navbar;
