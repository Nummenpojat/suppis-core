export interface Event {
  name: string
  date: {
    starts: Date,
    ends?: Date
  }
  registration?: {
    isOpen: boolean,
    stopsAt: Date
  }
  linkToEventCalendar?: string
  description?: string
}