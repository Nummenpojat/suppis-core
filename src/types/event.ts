export interface ScoutingEvent {
  name: string
  date: {
    starts: any,
    ends?: any
  }
  registration?: {
    isOpen: boolean,
    stopsAt?: Date
  }
  linkToEventCalendar?: string
  description?: string
}