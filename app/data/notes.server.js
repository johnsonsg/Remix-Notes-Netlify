import { prisma } from './database.server'

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
