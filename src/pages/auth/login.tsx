import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { BACKEND_DOMAIN } from "../../configs/config";

import { Eye, EyeClosed } from "lucide-react";

function CustomInput({
  type,
  name,
  placeholder,
  state,
  stateSetter,
}: {
  type: string;
  name: string;
  placeholder?: string;
  state: string;
  stateSetter: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const birthdateRegex =
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={};':"\\|,.<>/?]).{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    stateSetter(value);

    if (name === "birthDate") {
      if (!birthdateRegex.test(value)) {
        setError("Use MM/DD/YYYY format.");
      } else {
        setError("");
      }
    }

    if (name === "password") {
      if (!passwordRegex.test(value)) {
        setError(
          "Password must be at least 8 characters long, and include a mix of uppercase letters, numbers, and symbols.",
        );
      } else {
        setError("");
      }
    }

    if (name === "email") {
      if (!emailRegex.test(value)) {
        setError("Enter a valid email address.");
      } else {
        setError("");
      }
    }
  };

  return (
    <>
      <div className="w-full relative flex flex-row justify-center items-center">
        <input
          type={type !== "password" ? type : showPassword ? "text" : type}
          name={name}
          id={name}
          placeholder={placeholder}
          value={state}
          onChange={handleChange}
          className={`bg-white border rounded-lg outline-none px-2 py-0.5 focus:border-primary transition-colors duration-150 w-full  ease-in-out ${
            error ? "border-red-500" : "border-zinc-400"
          }`}
        />

        {type === "password" && (
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            onMouseDown={(e) => e.preventDefault()}
            className="right-2 absolute cursor-pointer"
          >
            {showPassword ? <Eye /> : <EyeClosed />}
          </div>
        )}
      </div>
      <p className="text-red-500 text-xs">{error}</p>
      {type === "password" && !error && (
        <p className="text-z-800 text-xs">
          Password must be at least 8 characters long, and include a mix of
          uppercase letters, numbers, and symbols.
        </p>
      )}
    </>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
      role: "admin",
    };

    try {
      const response = await axios.post(
        `${BACKEND_DOMAIN}/api/v1/auth/login`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      console.log("Login success:", response.data);

      navigate("/dashboard");
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e)) {
        const err = e as AxiosError<{ message?: string }>;
        setError(err.response?.data?.message ?? "Login failed.");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col w-full h-screen bg-system-white">
      <section className="w-full flex-1 p-8">
        <div className="bg-primaryLight/30 h-full w-full rounded-lg font-roboto text-zinc-900 py-3 px-5 flex flex-col gap-5 justify-center items-center">
          <header className="flex flex-col items-center">
            <img src="/assets/icons/icon.png" className="w-20" />
            <h1 className="font-bold text-xl">
              Welcome to <span className="text-[#458DFC]">SevenCare!</span>
            </h1>
            <h3 className="text-sm">
              Log in to your account using the form below.
            </h3>
          </header>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center   lg:w-1/4 w-full gap-2"
          >
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <CustomInput
                type="email"
                name="email"
                placeholder="example@gmail.com"
                state={email}
                stateSetter={setEmail}
              />
            </div>

            <div className="flex flex-col w-full">
              <div className="w-full flex flex-row justify-between items-center">
                <label htmlFor="password">Password</label>
                <Link className="text-primary text-sm" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
              <CustomInput
                type="password"
                name="password"
                placeholder=""
                state={password}
                stateSetter={setPassword}
              />
            </div>

            <div className="flex flex-row items-center gap-1 w-full">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`bg-primary rounded-xl w-full py-1.5  text-zinc-200 font-bold justify-center items-center flex ${
                loading ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
