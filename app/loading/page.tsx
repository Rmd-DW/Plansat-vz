"use client"
import { useRouter } from "next/navigation"
import LoadingScreen from "@/components/loading-screen"

export default function LoadingPage() {
  const router = useRouter()

  const handleLoadComplete = () => {
    router.push("/dashboard-home")
  }

  return <LoadingScreen onLoadComplete={handleLoadComplete} minDisplayTime={3000} />
}
