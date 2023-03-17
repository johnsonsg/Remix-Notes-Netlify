import { Link, useFetcher } from '@remix-run/react'
import styles from '~/styles/NoteList.css'

function NoteList({ notes, id }) {
  // ({ notes }) from notes.server.js

  const fetcher = useFetcher()

  function deleteExpenseItemHandler() {
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
      {notes.map((note, index) => (
        <li key={note.id} className='note'>
          {/* <Link to={note.id}> */}
          <article>
            <header>
              <ul className='note-meta'>
                {/* <li>#{index + 1}</li> */}
                <li>
                  <button onClick={deleteExpenseItemHandler}>Delete</button>
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
