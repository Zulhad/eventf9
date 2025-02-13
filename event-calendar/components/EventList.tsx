import type React from "react"
import moment from "moment"

interface Event {
  id: string
  title: string
  presentedBy: string
  start: Date
  end: Date
  creator: string
}

interface EventListProps {
  events: Event[]
  onSelectEvent: (event: Event) => void
}

const EventList: React.FC<EventListProps> = ({ events, onSelectEvent }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div
          key={event.id}
          className="border p-4 rounded cursor-pointer hover:bg-gray-100"
          onClick={() => onSelectEvent(event)}
        >
          <h3 className="text-lg font-semibold">{event.title}</h3>
          <p className="text-sm text-gray-600">Presented by: {event.presentedBy}</p>
          <p className="text-sm text-gray-600">
            {moment(event.start).format("MMMM D, YYYY h:mm A")} - {moment(event.end).format("MMMM D, YYYY h:mm A")}
          </p>
          <p className="text-sm text-gray-600">Created by: {event.creator}</p>
        </div>
      ))}
    </div>
  )
}

export default EventList

