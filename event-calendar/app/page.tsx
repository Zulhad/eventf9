import Image from "next/image";
import EventCalendar from "../components/EventCalendar"

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Event Calendar</h1>
      <EventCalendar />
    </main>
  )
}
