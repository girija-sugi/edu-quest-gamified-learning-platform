use client"

import { useState } from "react"
import LoginScreen from "@/components/login-screen"
import StudentDashboard from "@/components/student-dashboard"
import ParentDashboard from "@/components/parent-dashboard"
import VideoLessonPage from "@/components/video-lesson-page"

type UserRole = "student" | "parent" | null
type PageView = "login" | "dashboard" | "lesson" | "parent-dashboard"

interface UserData {
  name: string
  email: string
  grade?: number
  role: UserRole
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageView>("login")
  const [user, setUser] = useState<UserData | null>(null)
  const [selectedTopic, setSelectedTopic] = useState<any>(null)

  const handleLogin = (userData: UserData) => {
    setUser(userData)
    if (userData.role === "parent") {
      setCurrentPage("parent-dashboard")
    } else {
      setCurrentPage("dashboard")
    }
  }

  const handleLogout = () => {
    setUser(null)
    setSelectedTopic(null)
    setCurrentPage("login")
  }

  const handleSelectTopic = (topic: any) => {
    setSelectedTopic(topic)
    setCurrentPage("lesson")
  }

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard")
    setSelectedTopic(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {currentPage === "login" && <LoginScreen onLogin={handleLogin} />}
      {currentPage === "dashboard" && user?.role === "student" && (
        <StudentDashboard user={user} onLogout={handleLogout} onSelectTopic={handleSelectTopic} />
      )}
      {currentPage === "lesson" && selectedTopic && user?.role === "student" && (
        <VideoLessonPage topic={selectedTopic} user={user} onBack={handleBackToDashboard} />
      )}
      {currentPage === "parent-dashboard" && user?.role === "parent" && (
        <ParentDashboard user={user} onLogout={handleLogout} />
      )}
    </main>
  )
}
