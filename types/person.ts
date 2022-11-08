export interface Person {
  // Person has id that is signed automatically by firestore in the document name
  name: string,
  number: string | number

  // If age group is undefined person is assumed to be any age group, so they get ads only that are directed to all members
  ageGroup?: "sudenpentu" | "seikkailija" | "tarpojat" | "samoaja" | "vaeltaja" | "aikuinen" | "perhepartio",
  group?: string,

  // Mapping relationships between people so right people get the right ads
  guardian?: {
    isGuardian: boolean
    dependants?: string[] // This contains id of their dependants
    guardians?: string[] // This contains id of their guardians
  }
}