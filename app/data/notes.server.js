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

// Update Note
// export async function updateNote(id, noteData) {
//   try {
//     await prisma.note.update({
//       where: {
//         id
//       },
//       data: {
//         title: noteData.title,
//         content: noteData.content
//       }
//     })
//   } catch (error) {
//     console.log(error)
//     throw new Error('Failed to update note.')
//   }
// }

// Delete Note
export async function deleteNote(id) {
  try {
    await prisma.note.delete({
      where: {
        id
      }
    })
  } catch (error) {
    // console.log(error)
    throw new Error('Failed to delete note.')
  }
}
