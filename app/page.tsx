"use client"

import { useEffect, useState } from "react"
import { TopToolbar } from "@/components/dashboard/TopToolbar"
import { LeftSidebar } from "@/components/dashboard/LeftSidebar"
import { RightProperties } from "@/components/dashboard/RightProperties"
import { CanvasEditor } from "@/components/editor/CanvasEditor"
import { useGridStore } from "@/store/useGridStore"

export default function DashboardPage() {
  const theme = useGridStore((state) => state.theme)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
      document.documentElement.classList.remove("light")
    } else {
      document.documentElement.classList.add("light")
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  if (!isHydrated) {
    return <div className="flex h-screen w-full bg-white dark:bg-zinc-950 items-center justify-center"></div>
  }

  return (
    <div className="flex h-screen w-full flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white overflow-hidden font-sans">
      <TopToolbar />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 overflow-hidden bg-zinc-50 dark:bg-zinc-900/50 relative">
          <CanvasEditor />
        </main>
        <RightProperties />
      </div>
    </div>
  )
}
