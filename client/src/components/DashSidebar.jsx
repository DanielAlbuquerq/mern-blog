import { Sidebar } from "flowbite-react"
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"

export default function DashSidebar() {
  const location = useLocation()
  const [tab, setTab] = useState("")
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromURL = urlParams.get("tab")
    if (tabFromURL) {
      setTab(tabFromURL)
    }

    console.log(tabFromURL)
  }, [location.search])

  return (
    <Sidebar className="w-full md:w-56" aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to="/dashboard?tab=profile">
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              label={"User"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Sidebar.Item
            active={tab === "Signout"}
            icon={HiArrowSmRight}
            className="cursor-pointer"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
