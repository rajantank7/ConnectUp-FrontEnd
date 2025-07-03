import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loginError, setLoginError] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const [isFromSignup, setIsFromSignup] = useState(false);

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://192.168.18.131:3000/login",
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setIsFromSignup(false);
      navigate("/"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);

      setLoginError(error.response.data);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        "http://192.168.18.131:3000/signup",
        {
          firstName: firstName,
          lastName: lastName,
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );
      setIsFromSignup(true);
      navigate("/profile");
      dispatch(addUser(res.data.data));
    } catch (error) {
      console.error("Login failed:", error);

      setLoginError(error.response.data);
    }
  };

  useEffect(() => {
    if (user) {
      navigate(isFromSignup ? "/profile" : "/");
    }
  }, [user]);

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm ">
        <div className="card-body">
          <h2 className="card-title justify-center text-[1.5rem] text-gray-400 ">
            {showLogin ? "Login" : "Sign Up"}
          </h2>
          {!showLogin && (
            <>
              {" "}
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  First Name
                </legend>
                <input
                  type="text"
                  className="input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[0.9rem] text-gray-400">
                  Last Name
                </legend>
                <input
                  type="text"
                  className="input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[0.9rem] text-gray-400">
              Email ID
            </legend>
            <input
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[0.9rem] text-gray-400">
              Password
            </legend>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          {loginError && (
            <p className="text-red-500 text-sm mt-1">{loginError}</p>
          )}

          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary text-black text-[1rem]"
              onClick={showLogin ? handleLogin : handleSignUp}
            >
              {showLogin ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer"
            onClick={() => {
              setShowLogin(!showLogin);
              setEmail("");
              setPassword("");
            }}
          >
            {showLogin ? "New User?Sign Up Here" : "Existing User?Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
