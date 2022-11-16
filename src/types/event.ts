/**
 * Interface that defines event data structure
 * Can hold any type of event
 */
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
  type: string
  linkToEventCalendar?: string
  description?: string
  recommendationLevel?: 1 | 2 | 3 | 4 | 5
}