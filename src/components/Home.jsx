import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        if (!localStorage.getItem("usersData")) localStorage.setItem("usersData", "{}");
        localStorage.setItem("currentUserData", "{}");
    }, [])
    return (
        <div className="flex flex-col items-center text-center mx-2 gap-6">
            <h1 className="text-4xl font-bold md:text-6xl my-6">Your <span className="underline">Private</span> and <span className="underline">Secure</span> <span className="underline">Todo</span> List</h1>
            <p className="w-10/12 text-xl font-semibold opacity-50 md:text-2xl">Your Personal Task Manager, Keeping Your Todo List Secure and Confidential, Away from Prying Eyes 🔐👀</p>
            <div>
            <Link to="/login" className="inline bg-orange-700 px-4 py-2 text-xl rounded-md">Log in</Link>
            <p className="text-xl font-semibold my-3">don't have a account? <Link to="/signup" className="underline">Sign up</Link> now</p>
            </div>
        </div>
    )
}