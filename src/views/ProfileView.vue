<script setup>
import { ref, onMounted } from 'vue'
import API_URL, { getAccessToken } from '@/services/api'


const student = ref(null)
const errorMessage = ref('')

// Get Student Profile
async function getProfile() {
  try {
    const token = getAccessToken()
    const response = await fetch( `${API_URL}/student/profile`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
  )

  const data = await response.json()
  if(!response.ok) {
    errorMessage.value = data.message || 'Unable to get profile'
    return
  }

  student.value = data

  } catch (error) {
    console.error(error)
    errorMessage.value = 'Unable to connect to the server'
  }
}


// Update Student Profile
async function updateProfile() {
  const token = getAccessToken()
  const response = await fetch(
    `${API_URL}/student/profile`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },

      body: JSON.stringify({
        name: student.value.name,
        gender: student.value.gender,
        age: student.value.age,
        email: student.value.email
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.error(data.message)
    return
  }

  student.value = data.student
  alert('Profile updated successfully!')
}

onMounted(() => { getProfile() })
</script>

<template>
  <div class="profile-page">
    <h2 class="profile-title">My Profile</h2>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-if="student" class="profile-card">
      <div class="form-group">
        <label for="name">Name</label>
        <input id="name" v-model="student.name" type="text">
      </div>

      <div class="form-group">
        <label for="gender">Gender</label>
        <select id="gender" v-model="student.gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input id="age" v-model="student.age" type="number">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="student.email" type="email">
      </div>

      <button class="update-button" @click="updateProfile">Update Profile</button>

    </div>

  </div>

</template>

<style scoped>
.profile-page {
  max-width: 480px;
  margin: 0 auto;
}

.profile-title {
  margin: 0 0 1.5rem;
  color: #1f2937;
  text-align: center;
}

.profile-card {
  display: grid;
  gap: 1rem;
  padding: 2rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
}

.form-group {
  display: grid;
  gap: 0.4rem;
}

.form-group label {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  color: #1f2937;
  font: inherit;
}

.form-group input:focus,
.form-group select:focus {
  outline: 2px solid rgba(37, 99, 235, 0.25);
  border-color: #2563eb;
}

.update-button {
  width: fit-content;
  margin-top: 0.5rem;
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 4px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font: inherit;
  font-weight: 600;
}

.update-button:hover {
  background: #1d4ed8;
}

.error-message {
  padding: 0.8rem 1rem;
  border-radius: 4px;
  background: #fee2e2;
  color: #b91c1c;
}

@media (max-width: 600px) {
  .profile-card {
    padding: 1.25rem;
  }
}
</style>
