import { Sidebar } from "flowbite-react"
import {
  HiArrowSmRight,
  HiUser,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { signoutSuccess } from "../Redux/user/userSlice"
import { useDispatch, useSelector } from "react-redux"

export default function DashSidebar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const { currentUser } = useSelector((state) => state.user)

  const [tab, setTab] = useState("")
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get("tab")
    if (tabFromURL) {
      setTab(tabFromURL)
    }

    console.log(tabFromURL)
  }, [location.search])

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      })
      const data = await res.json()
      console.log(data)
      if (!res.ok) {
        console.log(data.message)
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <Sidebar className="w-full md:w-56" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                className="cursor-pointer"
                color="white"
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=users">
              <Sidebar.Item
                active={tab === "users"}
                icon={HiOutlineUserGroup}
                className="cursor-pointer"
                color="white"
                as="div"
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=Signout">
            <Sidebar.Item
              onClick={handleSignOut}
              active={tab === "Signout"}
              icon={HiArrowSmRight}
              className="cursor-pointer"
              as="div"
            >
              Sign Out
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
