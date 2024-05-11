import React, { useEffect, useRef, useState } from "react";
import { useUserDataContext } from "../context/UserDataContext"
export default function Todos() {
    const { userData, setUserData } = useUserDataContext();
    // useEffect(() => {
    //     function handleExit() {
    //         localStorage.removeItem("currentUserData");
    //     }
    //     window.addEventListener("beforeunload", handleExit);
    //     return () => {
    //         window.removeEventListener("beforeunload", handleExit);
    //     }
    // }, [])
    useEffect(() => {
        if (!localStorage.getItem("currentUserData")) window.location.href = "/login";
        else setUserData(JSON.parse(localStorage.getItem("currentUserData")));
    }, []);
    return (
        <>
            {userData["name"] ?
                <div className="self-start flex flex-col items-center gap-4 md:w-5/6">
                    <h1 className="text-4xl font-semibold text-center">Hey, {userData["name"].split(" ")[0]} you have {userData["todos"].length} pending task</h1>
                    <div className="w-5/6 flex justify-center">
                        <div className="flex text-2xl gap-4">
                            <button className="rotate-45 hover:bg-slate-300 hover:rounded-full p-1 transition-all">❌</button>
                            <button className=" hover:bg-slate-300 hover:rounded-full p-1 transition-all">🕓</button>
                            <button className=" hover:bg-slate-300 hover:rounded-full p-1 transition-all">🗄</button>
                        </div>
                    </div>
                    <div className="w-5/6">
                        {/* {
                    userData["todos"].map((i) => (
                        <div></div>
                    ))
                } */}
                        <div className="border-2 border-blue-500 rounded-md px-2 flex items-center justify-around md:justify-between text-xl">
                            <p className="overflow-hidden mx-3">{userData["todos"][0]["title"]}</p>
                            <div>
                                <div className="flex md:gap-4">
                                    <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all">💬</button>
                                    <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all">✏</button>
                                    <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all">❌</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : ""}
        </>
    );
}