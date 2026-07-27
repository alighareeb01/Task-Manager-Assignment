import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { AuthContext } from "../context/AuthContext";

const backend_url = import.meta.env.VITE_API_URL;
export default function Login() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const { login } = useContext(AuthContext);

  const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleLogin(data) {
    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch(`${backend_url}api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      login(result.data.user, result.token);
      setSuccess("Logged In Successfully");
      reset();
      setServerError("");

      nav("/dashboard");
      
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-800/40 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-slate-400">
            Sign in to continue managing your tasks.
          </p>
          {success && <p className="mb-4 text-sm text-green-400">{success}</p>}
          {serverError && (
            <p className="mb-4 text-sm text-red-400">{serverError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email Address
            </label>

            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}

            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              {...register("email")}
            />
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              {...register("password")}
            />
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Create one
            </Link>
          </p>
          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}
