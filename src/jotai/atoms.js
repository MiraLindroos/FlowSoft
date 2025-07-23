import { atom } from "jotai"

/* From Jotai documentation about atom:
- The atom function is to create an atom config
- An atom config is an immutable object
- The atom config object doesn't hold a value
- The atom value exists in a store
- To create a primitive atom (config), all you need is to provide an initial value
*/ 

// Holds the current authenticated user (null if not logged in)
export const currentUserAtom = atom(null)

// Holds the currently selected date
export const currentDateAtom = atom(new Date())

// Holds the full list of projects
export const projectsAtom = atom([])

// Holds the full list of time entries
export const timeEntriesAtom = atom([])