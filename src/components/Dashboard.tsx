import { useAuth } from "../contexts/AuthContext"

export default function Dashboard() {
  const { currentUser, logout } = useAuth()

  return (
 <>
 <h2>User: {currentUser && currentUser.email || null} </h2>
 <button onClick={logout}>
    Sign out
 </button>
 </>
  )}