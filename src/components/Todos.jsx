import React, { useEffect, useRef, useState } from "react";
import { useUserDataContext } from "../context/UserDataContext"
import { Outlet } from "react-router-dom";
export default function Todos() {
    const { userData, setUserData } = useUserDataContext();
    const divOne = useRef();
    // useEffect(() => {
    //     function handleExit() {
    //         localStorage.removeItem("currentUserData");
    //     }
    //     window.addEventListener("beforeunload", handleExit);
    //     return () => {
    //         window.removeEventListener("beforeunload", handleExit);
    //     }
    // }, [])
    function removeTodo(id) {
        for (const i of userData["todos"]) {
            if (i["id"] == id) {
                i["completed"] = true;
                console.log(i);
                break;
            }
        }
    }
    useEffect(() => {
        if (!localStorage.getItem("currentUserData")) window.location.href = "/login";
        else setUserData(JSON.parse(localStorage.getItem("currentUserData")));
    }, []);
    return (
        <>
            {userData["name"] ?
                <div className="self-start flex flex-col items-center gap-4 md:w-5/6" ref={divOne}>
                    <h1 className="text-4xl font-semibold text-center">Hey, {userData["name"].split(" ")[0]} you have {userData["todos"].length} pending task</h1>
                    <div className="w-5/6 flex justify-center">
                        <div className="flex text-2xl gap-4">
                            <button className="rotate-45 hover:bg-slate-700 hover:rounded-full p-1 transition-all" title="Add New"
                                onClick={() => window.location.href = "/todos/view/0/false"}
                            >❌</button>
                            <button className=" hover:bg-slate-700 hover:rounded-full p-1 transition-all" title="View Recently Completed">🕓</button>

                        </div>
                    </div>
                    <div className="w-5/6">
                        {
                            userData["todos"].map((i) => (
                                <div  key={i["id"]}>
                                    {i["completed"] ? "" : (
                                    <div className="border-2 border-yellow-500 rounded-md my-4 px-2 py-1 flex items-center justify-around md:justify-between text-xl">
                                        <p className="overflow-hidden mx-3 whitespace-nowrap text-ellipsis">{i["title"]}</p>
                                        <div>
                                            <div className="flex md:gap-4">
                                                <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                    title="Details"
                                                    onClick={() => window.location.href = `/todos/view/${i["id"]}/true/${divOne.current.clientHeight}`}
                                                >💬</button>
                                                <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                    title="Edit"
                                                    onClick={() => window.location.href = `/todos/view/${i["id"]}/false/${divOne.current.clientHeight}`}
                                                >✏</button>
                                                <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                    title="Mark as done"
                                                    onClick={() => removeTodo(i["id"])}
                                                >✔</button>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            ))
                        }
                    </div>
                </div>
                : ""}
            <Outlet />
        </>
    );
}