import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="h-screen w-screen bg-gray-900 text-white grid place-content-center">
      <Outlet />
    </div>
  )
}

export default App
