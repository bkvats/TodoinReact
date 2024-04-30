import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex items-center justify-center border-2 border-red-700">
            <h1 className="text-7xl text-center">💻</h1>
            <form className="flex flex-col">
                <input type="text"
                className="text-2xl bg-gray-300 bg-opacity-15 p-2 outline-none"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
                placeholder="Email..."
                />
                <div className="flex justify-center items-center text-xl bg-gray-300 bg-opacity-15">
                <input type="password"
                className="w-80 text-2xl bg-gray-300 bg-opacity-0 p-2 outline-none rounded-md rounded-r-none"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                placeholder="Password..."
                />
                <p>👁</p>
                </div>
            </form>
        </div>
    );
}