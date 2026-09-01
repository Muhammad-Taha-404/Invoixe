export const formatValidationErrors = errors => {
  if (!errors) {
    return 'Validation errors are not available';
  }

  if (!Array.isArray(errors)) {
    return 'Validation errors are not in the expected format';
  }

  return errors.issues
    .map(error => {
      return {
        message: error.message,
      };
    })
    .join(', ');
};
