import { prisma } from './database.server'

// Create / Add
export async function addNote(noteData) {
  try {
    return await prisma.note.create({
      data: {
        title: noteData.title,
        content: noteData.content
      }
    })
  } catch (error) {
    console.log(error)
    throw new Error('Failed to add note.')
  }
}

// Fetch All
export async function getStoredNotes() {
  try {
    const notes = await prisma.note.findMany({
      orderBy: {
        dateAdded: 'desc'
      }
    })
    return notes
  } catch (error) {
    // console.log(error)
    throw new Error('Failed to fetch notes.')
  }
}

// get single note by ID
// export async function getStoredNote(id) {
//   try {
//     const note = await prisma.note.findFirst({
//       where: {
//         id
//       }
//     })
//     return note
//   } catch (error) {
//     // console.log(error)
//     throw new Error('Failed to fetch note.')
//   }
// }
