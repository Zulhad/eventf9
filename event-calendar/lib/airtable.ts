import Airtable from "airtable"
import type { Event } from "./types"


const base = new Airtable({ apiKey: process.env.AIRTABLE_ACCESS_TOKEN }).base(process.env.AIRTABLE_BASE_ID!)

export async function fetchEvents() {
  try {
    const records = await base("Events").select().all()
    return records.map((record) => ({
      id: record.id,
      title: record.fields["Event Name"] as string,
      presentedBy: record.fields["Presented By"] as string,
      start: new Date(record.fields["Start Date"] as string),
      end: new Date(record.fields["End Date"] as string),
      location: record.fields["Location"] as string,
      area: record.fields["Area"] as string,
      status: record.fields["Status"] as string,
      creator: (record.fields["Creator"] as string) || "Unknown",
    }))
  } catch (error) {
    console.error("Error fetching events:", error)
    return []
  }
}

export async function createEvent(eventData: { 
    title: string; 
    presentedBy: string; 
    start: Date; 
    end: Date; 
    location: string; 
    area: string; 
    status: string; 
    creator?: string;
  }) {
    try {
      const record = await base("Events").create([
        {
          fields: {
            "Event Name": eventData.title,
            "Presented By": eventData.presentedBy,
            "Start Date": eventData.start.toISOString(),
            "End Date": eventData.end.toISOString(),
            "Location": eventData.location,
            "Area": eventData.area,
            "Status": eventData.status,
            "Creator": eventData.creator || "Unknown",
          },
        },
      ])
      return record
    } catch (error) {
      console.error("Error creating event:", error)
      throw error
    }
  }
  