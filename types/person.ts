export interface Person {
  name: string,
  number: string | number
  ageGroup?: "sudenpentu" | "seikkailija" | "tarpojat" | "samoaja" | "vaeltaja" | "aikuinen" | "perhepartio",
  group?: string
}