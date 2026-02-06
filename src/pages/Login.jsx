"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/auth/login/admin", {
                username: form.username,
                password: form.password,
            });

            localStorage.setItem("adminToken", res.data.token);

            navigate("/dashboard");
        } catch (err) {
            setError("Invalid username or password");
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                {/* LOGO + NAME */}
                <div className="flex items-center gap-3 justify-center mb-4">
                    <div className="relative w-[38.24px] h-[40.09px]">
                        <div className="relative w-[39px] h-[41px] -top-px -left-px rounded-[19.74px/20.66px] border-[1.23px] border-solid border-[#471d00]">
                            <div className="absolute w-[29px] h-[33px] top-[7px] left-0.5">
                                <div className="absolute w-[29px] h-[31px] top-0.5 left-0 rounded-[14.49px/15.42px] border-[1.23px] border-solid border-[#471d00]"></div>
                                <div className="absolute w-[22px] h-[23px] top-2 left-1.5 rounded-[11.1px/11.41px] border-[1.23px] border-solid border-[#471d00]"></div>
                                <div className="absolute w-1 h-1 top-0 left-3 bg-[#471d00] rounded-[2.16px]"></div>
                                <div className="absolute w-1 h-1 top-4 left-[5px] bg-[#471d00] rounded-[2.16px]"></div>
                            </div>
                            <div className="absolute w-1 h-1 top-0 left-[27px] bg-[#471d00] rounded-[2.16px]"></div>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl font-semibold">நல்ல நேரம்</h1>
                        <p className="text-sm opacity-80 text-center">ஆஸ்டேரா</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold text-center mb-6">Admin Login</h2>

                {error && (
                    <p className="text-red-600 text-center text-sm mb-3">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            required
                            value={form.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
                            placeholder="Enter your username"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-yellow-400 outline-none"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-4 text-sm">
                    Don't have an account?{" "}
                    <span
                        className="text-yellow-600 font-medium cursor-pointer"
                        onClick={() => navigate("/admin-register")}
                    >
                        Register
                    </span>
                </p>

            </div>
        </div>
    );
}
