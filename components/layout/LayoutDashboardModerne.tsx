"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { SidebarModerne } from "./SidebarModerne"
import { TopbarModerne } from "./TopbarModerne"

interface LayoutDashboardModerneProps {
  children: React.ReactNode
}

export function LayoutDashboardModerne({
  children,
}: LayoutDashboardModerneProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SidebarModerne />

      {/* Contenu principal */}
      <div className="flex flex-1 flex-col">
        {/* Topbar */}
        <TopbarModerne />

        {/* Zone de contenu */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
