import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("")
  const navigate = useNavigate();
  const {userData,setUserData} = useContext(UserDataContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await axios.post( " https://linkedin-backend-wg07.onrender.com/api/auth/login", {
        email,
        password,
      },{withCredentials: true});
      
    //  alert("user signed in successfully")
     setUserData(res.data)
     navigate("/")
     setError("")
     setEmail("")
     setPassword("")
    } catch (err) {
   const errorMsg = err.response?.data?.message || "Something went wrong";
   setError(errorMsg);
  //  console.log(err.response?.data);
   
}
finally{
        setLoading(false)
    }
  };

  return (
    <div className="w-full h-screen bg-[white]">
      <div className="h-[100px] w-[150px] m-2">
        <img src={logo} />
      </div>

      <div className="max-w-md mx-auto mt-1 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
        
         


          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
               value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
               value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
          {loading? "loading" : "Sign-In"}
          </button>
          <div>
            <p
              className="text-center cursor-pointer"
              onClick={() => navigate("/signUp")}
            >
              Don't have an account?{" "}
              <span className="text-blue-400">Sign-Up</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
