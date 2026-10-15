<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import API_URL, { saveTokens } from '@/services/api'

const router = useRouter()

const email = ref('')
const password = ref ('')
const errorMessage = ref ('')
const loading = ref(false)

async function login() {
  errorMessage.value = ''
  loading.value = true

  try {
    const response = await fetch(
      `${API_URL}/auth/student/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      }
    )

    const data = await response.json()

    if (!response.ok) {
      errorMessage.value = data.message || 'Login failed'
      return
    };
    saveTokens( data.access_token, data.refresh_token)

    localStorage.setItem( 'student', JSON.stringify(data.student))

    router.push('/dashboard')

  } catch (error) {
    console.error(error)
    errorMessage.value = 'Error'

  } finally {
    loading.value = false
  }
}
</script>

<template>

  <div class="login-container">
    <h2>Student Login</h2>

    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input v-model="email" type="email" placeholder="Enter your email" required >
      </div>

      <div>
        <label>Password:</label>
        <input v-model="password" type="password" placeholder="Enter your password" required>
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="errorMessage"> {{ errorMessage }} </p>
    </form>
  </div>
</template>


<style scoped>
.login-container {
  width: 400px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
}

.login-container div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>
