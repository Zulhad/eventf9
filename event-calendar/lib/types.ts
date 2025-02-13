export interface Event {
    id: string
    title: string // Event Name
    presentedBy: string
    start: Date
    end: Date
    location: string
    area: string
    status: "Planning" | "Confirm" | "Success"
  }
  
  export type LocationAreas = {
    [key: string]: string[]
  }
  
  export const LOCATIONS = ["Lantai LG", "Lantai G", "Lantai 2", "Fairway Walk", "Parkir Utara"] as const
  
  export const LOCATION_AREAS: LocationAreas = {
    "Lantai LG": ["Stage"],
    "Lantai G": ["EG 01", "EG 05 / Atrium", "EG 06", "EG 07", "EG 09", "IG 08", "IG 15"],
    "Lantai 2": ["Atrium", "Koridor Barat", "Koridor Timur"],
    "Fairway Walk": ["Stage", "Exhibition"],
    "Parkir Utara": ["Parkir Utara"],
  }
  
  export const STATUS_OPTIONS = ["Planning", "Confirm", "Success"] as const
    