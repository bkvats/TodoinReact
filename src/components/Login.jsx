import React, { useRef, useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIcon, setPasswordIcon] = useState("🔓");
    const inputRef = useRef(null);
    const passwordRef = useRef(null);
    return (
        <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="text-7xl text-center">💻</h1>
            <form className="flex flex-col gap-6">
                <input type="text"
                ref={inputRef}
                className="text-2xl bg-gray-300 bg-opacity-15 p-2 outline-none rounded-md"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                }}
                placeholder="Email..."
                required
                />
                <div className="flex justify-center items-center text-xl bg-gray-300 bg-opacity-15 rounded-md">
                <input type="password"
                ref={passwordRef}
                className="w-80 text-2xl bg-gray-300 bg-opacity-0 p-2 outline-none"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                }}
                placeholder="Password..."
                required
                />
                <p className="px-1 cursor-pointer" onClick={() => {
                    if (passwordRef.current.type === "password") {
                        passwordRef.current.type = "input";
                        setPasswordIcon("🔒")
                    }
                    else {
                        passwordRef.current.type = "password";
                        setPasswordIcon("🔓");
                    }
                }}>{passwordIcon}</p>
                </div>
                <button type="submit" className="bg-orange-700 p-2 text-lg rounded-md font-semibold hover:opacity-70">Verify & Log in</button>
            </form>
        </div>
    );
}