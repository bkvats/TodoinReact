import React, { useEffect, useRef, useState } from "react";
import { useUserDataContext } from "../context/UserDataContext"
import { Outlet } from "react-router-dom";
import decrypt from "../security/decrypt";
export default function Todos() {
    const { userData, setUserData } = useUserDataContext();
    const [todos, setTodos] = useState([]);
    const divOne = useRef();
    function removeTodo(id) {
        let newTodos = []
        for (const i of todos) {
            if (i["id"] == id) {
                i["completed"] = true;
            }
            newTodos.push(i)
        }
        setTodos(newTodos);
        userData["todos"] = newTodos;
        localStorage.setItem("currentUserData", JSON.stringify(userData));
        let completeData = JSON.parse(localStorage.getItem("usersData"));
        completeData[userData["email"]]["todos"] = userData["todos"]
        localStorage.setItem("usersData", JSON.stringify(completeData));
    }
    function getLenght() {
        let count = 0;
        for (const i of todos) {
            if (!i["completed"]) count++;
        }
        return count;
    }
    useEffect(() => {
        if (localStorage.getItem("currentUserData") === "{}") {
            window.location.href = "/login";
        } 
        else {
            setUserData(JSON.parse(localStorage.getItem("currentUserData")));
            setTodos(JSON.parse(localStorage.getItem("currentUserData"))["todos"])
        }
    }, []);
    return (
        <>
            {userData["name"] ?
                <div className="self-start flex flex-col items-center gap-4 md:w-5/6" ref={divOne}>
                    <h1 className="text-4xl font-semibold text-center my-3">Hey, {userData["name"].split(" ")[0]} you have {getLenght()} pending task</h1>
                    <div className="w-5/6 flex justify-center">
                        <div className="flex text-2xl gap-4">
                            <button className="rotate-45 hover:bg-slate-700 hover:rounded-full p-1 transition-all" title="Add New"
                                onClick={() => window.location.href = `/todos/view/0/false/${document.body.clientHeight}`}
                            >❌</button>
                            <button className=" hover:bg-slate-700 hover:rounded-full p-1 transition-all" title="View Recently Completed"
                            onClick={() => window.location.href = "recents"}
                            >🕓</button>

                        </div>
                    </div>
                    <div className="w-5/6">
                        {todos.length ? 
                            todos.map((i) => (
                                <div  key={i["id"]}>
                                    {i["completed"] ? ("") : (
                                    <div className="border-2 border-yellow-500 rounded-md my-4 px-2 py-1 flex items-center justify-around md:justify-between text-xl">
                                        <p className="overflow-hidden mx-3 whitespace-nowrap text-ellipsis">{`${decrypt(i["title"])}`}</p>
                                        <div>
                                            <div className="flex md:gap-4">
                                                <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                    title="Details"
                                                    onClick={() => window.location.href = `/todos/view/${i["id"]}/true/${document.body.clientHeight}`}
                                                >💬</button>
                                                <button className="cursor-pointer hover:bg-slate-700 hover:rounded-full p-1 transition-all"
                                                    title="Edit"
                                                    onClick={() => window.location.href = `/todos/view/${i["id"]}/false/${document.body.clientHeight}`}
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
                        : ""}
                    </div>
                </div>
                : ""}
            <Outlet />
        </>
    );
}