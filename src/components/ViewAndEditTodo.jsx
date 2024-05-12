import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserDataContext } from "../context/UserDataContext";
export default function ViewAndEditTodo() {
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const [isRequireToFill, setIsRequireToFill] = useState(true);
    const titleRef = useRef();
    const { id } = useParams();
    let { edit } = useParams();
    edit = edit === "true";
    let {divOneHeight} = useParams();
    divOneHeight = Number(divOneHeight);
    const { userData } = useUserDataContext();
    function handleClick(event) {
        event.preventDefault();
        if (!edit) {
            if (id == "0") {
                userData["todos"].push({
                    id: Date.now(),
                    title: title,
                    description: description,
                    completed: false
                })
            }
            else {
                for (const i of userData["todos"]) {
                    if (i["id"] == id) {
                        i["title"] = title;
                        console.log(i["description"])
                        i["description"] = description;
                        console.log(i["description"])
                        break;
                    }
                }
            }
            localStorage.setItem("currentUserData", JSON.stringify(userData));
        }
        window.location.href = "/todos";
    }
    useEffect(() => {
        if (userData["todos"]) {
            for (const i of userData["todos"]) {
                if (i["id"] == id) {
                    setTitle(i["title"])
                    setDiscription(i["description"])
                    break;
                }
            }
        }
    }, [userData]);
    useEffect(() => {
        titleRef.current.focus();
    }, []);
    return (
        <div className={`h-[${divOneHeight}px] w-[100%] absolute bg-black bg-opacity-80 grid place-content-center text-black`}>
            <div className="w-[70vw] bg-black flex flex-col py-10 px-4 border-2 border-violet-900 gap-10 rounded-lg shadow-violet-500 shadow-md">
                <form className="flex flex-col gap-10" onSubmit={handleClick}>
                    <input
                        ref={titleRef}
                        value={title}
                        className="w-[90%] outline-none text-xl p-2 font-semibold rounded-lg overflow-auto"
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Title"
                        readOnly={edit}
                        required={isRequireToFill}
                        type="text" />
                    <textarea
                        value={description}
                        className="w-[95%] h-64 outline-none text-lg p-2 rounded-lg resize-none"
                        onChange={(event) => setDiscription(event.target.value)}
                        placeholder="Add a description"
                        readOnly={edit}
                    ></textarea>
                    <div>
                        <button type="submit" className="bg-green-700 text-white mx-3 py-2 px-4 rounded-lg font-semibold"
                        >Ok
                        </button>
                        <button className="bg-red-700 text-white mx-3 py-2 px-4 rounded-lg font-semibold"
                            onClick={() => window.location.href = "/todos"}
                        >Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}