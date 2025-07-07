import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeConnections } from "../utils/connectionSlice";
import { resetRequest } from "../utils/requestsslice";
import { resetFeed } from "../utils/feedSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(resetRequest());
      dispatch(resetFeed());

      navigate("/login");
    } catch (error) {}
  };

  const handleToken = async () => {
    try {
      const res = await axios.get("/api/verify-token", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      dispatch(removeUser());
      navigate("/login");
    }
  };
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link onClick={handleToken} className="btn btn-ghost text-xl">
          🤝 ConnectUp
        </Link>
      </div>
      <div className="flex gap-2">
        {user && (
          <div className="dropdown dropdown-end inline-block">
            <p className="inline-block text-sm md:text-base">
              Welcome, {user.firstName}
            </p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-3 md:mx-5"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to={"/profile"}
                  onClick={handleToken}
                  className="justify-between"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link to={"/"} onClick={handleToken}>
                  Home (Feed)
                </Link>
              </li>
              <li>
                <Link to={"/connections"} onClick={handleToken}>
                  Connections
                </Link>
              </li>
              <li>
                <Link to={"/requests"} onClick={handleToken}>
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
