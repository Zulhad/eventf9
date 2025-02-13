"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import EventList from "./EventList"
import EventPopup from "./EventPopup"
import AddEventForm from "./AddEventForm"
import { fetchEvents, createEvent } from "../lib/airtable"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"


moment.locale("en-GB")
const localizer = momentLocalizer(moment)

interface Event {
  id: string
  title: string
  presentedBy: string
  start: Date
  end: Date
  location: string
  area: string
  creator: string
  status: "Planning" | "Confirm" | "Success"
}

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([])
  const [view, setView] = useState<"calendar" | "list">("calendar")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const loadEvents = async () => {
    const fetchedEvents = await fetchEvents();
  
    const formattedEvents = fetchedEvents.map(event => ({
      ...event,
      status: ["Planning", "Confirm", "Success"].includes(event.status) 
        ? (event.status as "Planning" | "Confirm" | "Success") 
        : "Planning", // Default to "Planning" if status is invalid
    }));
  
    setEvents(formattedEvents);
  };
  
  useEffect(() => {
    loadEvents()
  }, []) //Fixed: Added empty dependency array to useEffect

  const eventStyleGetter = (event: Event) => {
    const colors: Record<string, string> = {
      Planning: "#FCD34D",
      Confirm: "#60A5FA",
      Success: "#34D399",
    };
  
    return {
      style: {
        backgroundColor: colors[event.status] || "#3174ad",
        borderRadius: "5px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };
  

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <Button variant={view === "calendar" ? "default" : "outline"} onClick={() => setView("calendar")}>
            Calendar View
          </Button>
          <Button variant={view === "list" ? "default" : "outline"} onClick={() => setView("list")}>
            List View
          </Button>
        </div>
        <Button onClick={() => setIsAddEventOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      {view === "calendar" ? (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectEvent={setSelectedEvent}
          eventPropGetter={eventStyleGetter}
        />
      ) : (
        <EventList events={events} onSelectEvent={(event) => setSelectedEvent(event as Event)} />
      )}
      {selectedEvent && <EventPopup event={selectedEvent} onClose={() => setSelectedEvent(null)} />}

      <AddEventForm isOpen={isAddEventOpen} onClose={() => setIsAddEventOpen(false)} onEventAdded={loadEvents} />
    </div>
  )
}

export default EventCalendar

