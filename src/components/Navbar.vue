<script setup>
import { getAccessToken, getRefreshToken, removeTokens, default as API_URL } from '@/services/api'
import { useRouter } from 'vue-router'

defineOptions({ name: 'StudentNavbar' })

const router = useRouter()

async function logout() {
  const accessToken = getAccessToken()
  const refreshToken = getRefreshToken()

  try {
    await fetch(`${API_URL}/auth/student/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },

      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    })
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    removeTokens()
    router.push('/login')
  }
}
</script>

<template>
  <nav class="navbar">
    <h2>Student Management System</h2>

    <button @click="logout">Logout</button>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background-color: #2563eb;
  color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar h2 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar button {
  margin-left: auto;
}
</style>
