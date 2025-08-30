import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { HeartPulse, Stethoscope, Mail, Lock, User } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  // form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  // const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setMessage(""); // clear old messages

    try {
      if (isLogin) {
        // login API
        // console.log("1",formData);
        const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
          email: formData.email,
          password: formData.password,
        },{
          withCredentials: true
        });
        // setMessage(res.data.message || "Login successful!");
        toast.success(res.data.message || "Login successful!");
      } else {
        // signup API
        const res = await axios.post("http://localhost:3000/api/v1/auth/signup", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        },{
          withCredentials: true
        });

        // setMessage(res.data.message || "Signup successful!");
        toast.success(res.data.message || "Signup successful!");
      }
    } catch (err) {
      // setMessage(err.response?.data?.message || "Something went wrong");
      toast.error(err.response?.data?.message  || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <HeartPulse className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Login to HealthCare+" : "Create Your Account"}
          </h1>
          <Stethoscope className="w-8 h-8 text-green-500" />
        </div>

        {/* Animate forms */}
        <AnimatePresence mode="wait">
          {isLogin ? (
            // ---------------- LOGIN ----------------
            <motion.form
              key="login"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center border rounded-xl px-3 py-2">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center border rounded-xl px-3 py-2">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Login
              </button>
            </motion.form>
          ) : (
            // ---------------- SIGNUP ----------------
            <motion.form
              key="signup"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center border rounded-xl px-3 py-2">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center border rounded-xl px-3 py-2">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-center border rounded-xl px-3 py-2">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full focus:outline-none"
                  required
                />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border rounded-xl px-3 py-2"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-xl transition"
              >
                Sign Up
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Response Message */}
        {/* {message && <p className="mt-4 text-center text-gray-700">{message}</p>} */}

        {/* Toggle */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "Don’t have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
