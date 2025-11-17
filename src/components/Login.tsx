import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Mode = "login" | "register";

type FormState = {
  email: string;
  password: string;
  confirm_password: string;
};

type Props = {
  initialMode?: Mode;
};

const BASE_URI = "http://localhost:4000/api/v1/auth";

export default function AuthPage({ initialMode = "login" }: Props) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [userdata, setUserdata] = useState<FormState>({
    email: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserdata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (mode === "login") {
        const { data } = await axios.post(`${BASE_URI}/login`, {
          email: userdata.email.trim(),
          password: userdata.password,
        },
        { withCredentials: true }
        );
        console.log(data);

        navigate("/")
      } else {
        // register
        const { data } = await axios.post(`${BASE_URI}/register`, {
          email: userdata.email.trim(),
          password: userdata.password,
          confirm_password: userdata.confirm_password,
        });
        alert("Registration successful!");
        console.log(data);
        setMode("login"); // switch to login after registration
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-4">
          {mode === "login" ? "Login" : "Create account"}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userdata.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={userdata.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
              required
            />
          </div>

          {mode === "register" && (
            <div className="mb-3">
              <label htmlFor="confirm_password" className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={userdata.confirm_password}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
          >
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-blue-600 underline"
              >
                Create account
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-blue-600 underline"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
