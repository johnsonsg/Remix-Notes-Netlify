// Validates the input for a new note
function isValidTitle(value) {
  return value && value.trim().length > 5 && value.trim().length <= 30
}

// Validates the input for a new note
export function validateNoteInput(input) {
  let validationErrors = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid title - must be at least 5 characters long, and no more than 30.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}
