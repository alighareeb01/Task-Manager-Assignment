import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const backend_url = import.meta.env.VITE_API_URL;
export default function Register() {
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const schema = z
    .object({
      name: z.string().min(3, "Name must be at least 3 characters"),
      email: z.string().email("Invalid email"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  async function handleRegister(data) {
    setLoading(true);
    setServerError("");
    setSuccess("");

    try {
      const res = await fetch(`${backend_url}api/auth/register`, {
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
      setSuccess("Account created successfully!");
      reset();
      setServerError("");

      setTimeout(() => {
        nav("/login");
      }, 3000);
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
          <h1 className="text-3xl font-bold text-white">Create Account</h1>

          <p className="mt-2 text-slate-400">
            Join Task Manager and start organizing your work.
          </p>
          {success && <p className="mb-4 text-sm text-green-400">{success}</p>}
          {serverError && (
            <p className="mb-4 text-sm text-red-400">{serverError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Full Name
            </label>
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}

            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              {...register("name")}
            />
          </div>
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
          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Confirm Password
            </label>

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}

            <input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              {...register("confirmPassword")}
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Register"}
          </button>
          {/* Login Link */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-400 hover:text-blue-300"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}
