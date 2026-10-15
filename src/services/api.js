// const API_URL = 'http://127.0.0.1:5000' //development
const API_URL = 'https://annejoy.site' //production
export default API_URL


// Get access token
export function getAccessToken() {
  return localStorage.getItem('access_token')
}

// Get refresh token
export function getRefreshToken() {
  return localStorage.getItem('refresh_token')
}

// Save tokens
export function saveTokens(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
}

// Remove tokens
export function removeTokens() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('student')
}

// Check if student is logged in
export function isStudentLoggedIn() {
  return !!localStorage.getItem('access_token') && !!localStorage.getItem('refresh_token')
}

// Refresh access tokens
export async function refreshAccessToken() {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    removeTokens()
    window.location.href = '/login'
    return null
  }

  try {
    const response = await fetch(
      `${API_URL}/auth/student/refresh`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      }
    )

    const data = await response.json()
    if(!response.ok) {
      removeTokens()
      window.location.href = '/login'
      return null
    }

    // Save the new access token
    localStorage.setItem(
      'access_token',
      data.access_token
    )
    return data.access_token

  } catch (error) {
    console.error( 'Unable to refresh access token:', error )

    removeTokens()
    window.location.href = '/login'
    return null
  }
}
