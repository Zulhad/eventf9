import type React from "react"
import moment from "moment"
import type { Event } from "../lib/types"

interface EventPopupProps {
  event: {
    id: string;
    title: string;
    presentedBy: string;
    start: Date;
    end: Date;
    creator: string;
    status: "Planning" | "Confirm" | "Success";
    location?: string;
    area?: string;
  };
  onClose: () => void;
}

const EventPopup: React.FC<EventPopupProps> = ({ event, onClose }) => {
  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "Planning":
        return "bg-yellow-100 text-yellow-800"
      case "Confirm":
        return "bg-blue-100 text-blue-800"
      case "Success":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
        <div className="space-y-2">
          <p>
            <strong>Presented by:</strong> {event.presentedBy}
          </p>
          <p>
            <strong>Start:</strong> {moment(event.start).format("MMMM D, YYYY h:mm A")}
          </p>
          <p>
            <strong>End:</strong> {moment(event.end).format("MMMM D, YYYY h:mm A")}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Area:</strong> {event.area}
          </p>
          <p>
            <strong>Status: </strong>
            <span className={`inline-block px-2 py-1 rounded-full text-sm ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </p>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventPopup
