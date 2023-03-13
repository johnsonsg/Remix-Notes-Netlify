// Validates the input for a new note
function isValidTitle(value) {
  return value && value.trim().length > 0 && value.trim().length <= 30
}

// Validates the input for a new note
export function validateNoteInput(input) {
  let validationErrors = {}

  if (!isValidTitle(input.title)) {
    validationErrors.title =
      'Invalid Note title. Must be at most 30 characters long.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors
  }
}
