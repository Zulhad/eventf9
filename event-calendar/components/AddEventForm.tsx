"use client"

import { useState, useEffect } from "react"
import { LOCATIONS, LOCATION_AREAS, STATUS_OPTIONS } from "../lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createEvent } from "../lib/airtable"

interface AddEventFormProps {
  isOpen: boolean
  onClose: () => void
  onEventAdded: () => void
}

export default function AddEventForm({ isOpen, onClose, onEventAdded }: AddEventFormProps) {
  const [location, setLocation] = useState<string>("")
  const [formData, setFormData] = useState({
    title: "",
    presentedBy: "",
    start: "",
    end: "",
    location: "",
    area: "",
    status: "Planning",
  })

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: "",
        presentedBy: "",
        start: "",
        end: "",
        location: "",
        area: "",
        status: "Planning",
      })
      setLocation("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEvent(formData)
      onEventAdded()
      onClose()
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event. Please try again.")
    }
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    setFormData((prev) => ({
      ...prev,
      location: value,
      area: "", // Reset area when location changes
    }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Name</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="presentedBy">Presented By</Label>
            <Input
              id="presentedBy"
              required
              value={formData.presentedBy}
              onChange={(e) => setFormData((prev) => ({ ...prev, presentedBy: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start">Start Date</Label>
              <Input
                id="start"
                type="datetime-local"
                required
                value={formData.start}
                onChange={(e) => setFormData((prev) => ({ ...prev, start: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end">End Date</Label>
              <Input
                id="end"
                type="datetime-local"
                required
                value={formData.end}
                onChange={(e) => setFormData((prev) => ({ ...prev, end: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select
              value={formData.area}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, area: value }))}
              disabled={!location}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                {location &&
                  LOCATION_AREAS[location]?.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

