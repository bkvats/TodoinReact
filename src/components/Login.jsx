import React, { useEffect, useRef, useState } from "react";
import decrypt from "../security/decrypt";
import {Link} from "react-router-dom"
import { parse } from "postcss";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIcon, setPasswordIcon] = useState("🔓");
    const [error, setError] = useState(false);
    const inputRef = useRef(null);
    const passwordRef = useRef(null);
    function verify(event) {
        event.preventDefault();
        let completeData = JSON.parse(localStorage.getItem("usersData"));
        if (!completeData[email]) {
            setError(true);
        }
        else {
            if (decrypt(completeData[email]["password"]) === password) {
                completeData[email]["email"] = email;
                localStorage.setItem("currentUserData", JSON.stringify(completeData[email]));
                window.location.href = "/todos";
                localStorage.setItem("lastUser", email);
                setError(false);
            }
            else {
                setError(true);
            }
        }
    }
    useEffect(() => {
        if (localStorage.getItem("lastUser")) {
            setEmail(localStorage.getItem("lastUser"));
            passwordRef.current.focus();
        }
        else {
            inputRef.current.focus();
        }
    }, []);
    return (
        <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="text-7xl text-center">💻</h1>
            {error ? <p className="text-xl font-semibold text-red-700 border-2 border-red-700 rounded-md p-2">Incorrect login credentials i.e. user email or password! </p>: ""}
            <form className="flex flex-col gap-6" onSubmit={verify}>
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
            <p className="text-xl font-semibold my-3">don't have a account? <Link to="/signup" className="underline">Sign up</Link> now</p>
        </div>
    );
}