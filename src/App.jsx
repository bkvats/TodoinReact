import { Outlet } from "react-router-dom"
import { useState } from "react"
import { UserDataContext } from "./context/UserDataContext"
function App() {
  const [userData, setUserData] = useState({});
  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center">
        <Outlet />
      </div>
    </UserDataContext.Provider>
  )
}

export default App
