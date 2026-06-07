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
    return <div className="flex h-screen w-full bg-background items-center justify-center" />
  }

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground overflow-hidden font-sans">
      <TopToolbar />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <LeftSidebar />
        <main className="flex-1 min-w-0 overflow-hidden bg-muted/30 relative">
          <CanvasEditor />
        </main>
        <RightProperties />
      </div>
    </div>
  )
}
