import React, { useEffect } from "react";
import { useUserDataContext } from "../context/UserDataContext";
import decrypt from "../security/decrypt";
export default function Recents() {
    const todos = JSON.parse(localStorage.getItem("currentUserData"))["todos"];
    return (
        <div className="self-start flex flex-col items-center gap-4 md:w-5/6">
            <h1 className="text-4xl font-semibold text-center my-3">Recently Completed</h1>
            <div className="w-5/6 flex justify-center">
                <div className="flex text-2xl gap-4">
                    <button className=" hover:bg-slate-700 hover:rounded-full p-1 transition-all" title="View Todos"
                    onClick={() => window.location.href = "/todos"}
                    >📝</button>
                </div>
            </div>
            <div className="w-5/6">
                {todos.length ?
                    todos.map((i) => (
                        <div key={i["id"]}>
                            {i["completed"] ? (
                                <div className="border-2 border-yellow-500 rounded-md my-4 px-2 py-1 flex items-center justify-around md:justify-between text-xl">
                                    <p className="overflow-hidden mx-3 whitespace-nowrap text-ellipsis">{`${decrypt(i["title"])}`}</p>
                                    <div>
                                        <div className="flex md:gap-4">
                                            <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                title="Details"
                                                onClick={() => window.location.href = `/todos/view/${i["id"]}/true/${document.body.clientHeight}`}
                                            >💬</button>
                                        </div>
                                    </div>
                                </div>) : ""}
                        </div>
                    ))
                    : ""}
            </div>
        </div>
    )
}