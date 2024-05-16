import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useUserDataContext } from "../context/UserDataContext";
import encrypt from "../security/encrypt";
import decrypt from "../security/decrypt";
export default function ViewAndEditTodo() {
    const [title, setTitle] = useState("");
    const [description, setDiscription] = useState("");
    const titleRef = useRef();
    const { id } = useParams();
    let { edit } = useParams();
    edit = edit === "true";
    let {divOneHeight} = useParams();
    divOneHeight = Number(divOneHeight);
    const bgStyle = {
        height: `${divOneHeight}px`
    }
    const { userData } = useUserDataContext();
    function handleClick(event) {
        event.preventDefault();
        if (!edit) {
            if (id == "0") {
                userData["todos"].push({
                    id: Date.now(),
                    title: encrypt(title),
                    description: encrypt(description),
                    completed: false
                })
            }
            else {
                for (const i of userData["todos"]) {
                    if (i["id"] == id) {
                        i["title"] = encrypt(title);
                        i["description"] = encrypt(description);
                        break;
                    }
                }
            }
            localStorage.setItem("currentUserData", JSON.stringify(userData));
            let completeData = JSON.parse(localStorage.getItem("usersData"));
            completeData[userData["email"]]["todos"] = userData["todos"]
            localStorage.setItem("usersData", JSON.stringify(completeData));
        }
        window.location.href = "/todos";
    }
    useEffect(() => {
        if (userData["todos"]) {
            for (const i of userData["todos"]) {
                if (i["id"] == id) {
                    setTitle(decrypt(i["title"]));
                    setDiscription(decrypt(i["description"]));
                    break;
                }
            }
        }
    }, [userData]);
    useEffect(() => {
        titleRef.current.focus();
    }, []);
    return (
        <div className={`w-[100%] absolute bg-black bg-opacity-80 grid place-content-center text-black`} style={bgStyle}>
            <div className="w-[70vw] bg-black flex flex-col py-10 px-4 border-2 border-violet-900 gap-10 rounded-lg shadow-violet-500 shadow-md">
                <form className="flex flex-col gap-10" onSubmit={handleClick}>
                    <input
                        ref={titleRef}
                        value={title}
                        className="w-[90%] outline-none text-xl p-2 font-semibold rounded-lg overflow-auto"
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder="Title"
                        readOnly={edit}
                        required
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