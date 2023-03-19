import { Link, useFetcher } from '@remix-run/react'
import styles from '~/styles/NoteList.css'

function NoteList({ notes }) {
  // ({ notes }) from notes.server.js to map through list of notes
  const fetcher = useFetcher()

  // receive 'id' as function argument
  function deleteExpenseItemHandler(id) {
    const proceed = confirm('Are you sure? Do you want to delete this item?')
    if (!proceed) {
      return
    }
    fetcher.submit(null, {
      method: 'delete',
      action: `/notes/${id}`
    })
  }

  if (fetcher.state !== 'idle') {
    return (
      <article className='note locked'>
        <p>Deleting...</p>
      </article>
    )
  }

  return (
    <ul id='note-list'>
      {notes.map(note => (
        <li key={note.id} className='note'>
          {/* <Link to={note.id}> */}
          <article>
            <header>
              <ul className='note-meta'>
                <li>
                  {/* crete button to delete note using deleteExpenseItemHandler function */}
                  {/* Bind argument to 'deleteExpenseItemHandler' */}
                  {/* using the correct 'id' of the note */}

                  <button
                    onClick={deleteExpenseItemHandler.bind(null, note.id)}
                  >
                    Delete
                  </button>

                  {/* <button onClick={() => deleteExpenseItemHandler(note.id)}>
                    Delete
                  </button> */}

                  <Link to={note.id}>View Details</Link>
                </li>
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
