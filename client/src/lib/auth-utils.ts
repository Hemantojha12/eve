// Simplified auth utils for frontend-only mode
export function isUnauthorizedError(error: Error): boolean {
  return error.message.includes("401") || error.message.includes("Unauthorized");
}

export function redirectToLogin() {
  // In a frontend-only app, this might redirect to a specific login page
  // or show a login modal. For now, we'll just log it.
  console.log("Redirecting to login...");
}
