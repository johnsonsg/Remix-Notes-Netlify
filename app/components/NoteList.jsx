import { Form, Link } from '@remix-run/react'
import styles from '~/styles/NoteList.css'
import { MdOutlineVisibility } from 'react-icons/md'
import { FiTrash } from 'react-icons/fi'

function NoteList({ notes, id }) {
  // ({ notes }) from notes.server.js
  function deleteNoteItemHandler() {}

  return (
    <ul id='note-list'>
      {notes.map((note, index) => (
        <li key={note.id} className='note'>
          {/* <Link to={'/' + note.id}> */}
          <article>
            <header>
              <ul className='note-meta'>
                <li>
                  <time dateTime={note.dateAdded}>
                    {new Date(note.dateAdded).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                      // hour: '2-digit',
                      // minute: '2-digit'
                    })}
                  </time>
                </li>
                {/* <li>#{index + 1}</li> */}
                <li>
                  {/* <Link onClick={deleteNoteItemHandler}>
                    <FiTrash />
                  </Link> */}
                  <Form method='delete' action={id}>
                    <button>Delete</button>
                  </Form>
                </li>
                <li>
                  <Link to={'/' + note.id}>
                    <MdOutlineVisibility />
                  </Link>
                </li>
              </ul>
              <h2>{note.title}</h2>
            </header>
            <p>{note.content}</p>
          </article>
          {/* </Link> */}
        </li>
      ))}
    </ul>
  )
}

export default NoteList

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
