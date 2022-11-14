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
  recommendationLevel?: 1 | 2 | 3 | 4 | 5
}