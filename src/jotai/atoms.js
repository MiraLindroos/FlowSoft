import { atom } from "jotai"

export const currentUserAtom = atom(null)

export const currentDateAtom = atom(new Date())

export const projectsAtom = atom([])

export const timeEntriesAtom = atom([])