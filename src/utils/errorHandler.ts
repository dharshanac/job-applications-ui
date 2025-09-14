export function getErrorMessage(error: any): string {
  if (error.response?.data?.errors) {
    return Object.values(error.response.data.errors)
      .flat()
      .join(", ");
  }
  return error.message || "Unknown error occurred";
}