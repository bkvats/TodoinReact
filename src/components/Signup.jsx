import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import encrypt from "../security/encrypt"
export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordIcon, setPasswordIcon] = useState("🔓");
    const [accountExist, setAccountExist] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const inputRef = useRef(null);
    const passwordRef = useRef(null);
    function saveData(event) {
        event.preventDefault();
        let completeData = JSON.parse(localStorage.getItem("usersData"));
        if (completeData[email]) {
            setAccountExist(true);
            setSuccessMessage(false);
        }
        else {
            let encryptedPassword = encrypt(password);
            completeData[email] = {
                name: name,
                password: encryptedPassword,
                todos: []
            };
            localStorage.setItem("usersData", JSON.stringify(completeData));
            setSuccessMessage(true);
            setAccountExist(false);
            setName("");
            setEmail("");
            setPassword("");
        }
    }
    return (
        <div className="flex flex-col gap-12 items-center justify-center">
            <h1 className="text-7xl text-center">👨‍💻</h1>
            {accountExist ? <p className="text-xl font-semibold text-red-700 border-2 border-red-700 rounded-md p-2">Account already exist. <Link to="/login" className="underline text-white">Log in</Link> now</p> : ""}
            {successMessage ? <p className="text-xl font-semibold text-green-700 border-2 border-green-700 rounded-md p-2">Signup Successful. <Link to="/login" className="underline text-white">Log in</Link> now</p> : ""}
            <form className="flex flex-col gap-6" onSubmit={saveData}>
                <input type="text"
                    className="text-2xl bg-gray-300 bg-opacity-15 p-2 outline-none rounded-md"
                    value={name}
                    onChange={(event) => {
                        setName(event.target.value);
                    }}
                    placeholder="Name..."
                    required
                />
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
                <button type="submit" className="bg-orange-700 p-2 text-lg rounded-md font-semibold hover:opacity-70">Submit</button>
            </form>
        </div>
    );
}