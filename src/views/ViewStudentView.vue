<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

import API_URL from '@/services/api'

const route = useRoute()
const studentID = route.params.id
const student = ref(null)
const units = ref([])
const loading = ref(true)

async function getStudentDetails() {
  try {
    const response = await axios.get(`${API_URL}/students/${studentID}/details`)
    const data = response.data
    student.value = data.student
    units.value = data.units
  } catch (error) {
    console.error(error)
    alert('Failed to get student details')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getStudentDetails()
})
</script>

<template>
  <div class="view-student-page">
    <h1>Student Details</h1>

    <div v-if="loading">Loading student details...</div>
    <div v-else-if="student">
      <div class="student-details">
        <h2>Student Information</h2>

        <div class="detail-row">
          <strong>Student ID:</strong>
          <span>{{ student.studentID }}</span>
        </div>

        <div class="detail-row">
          <strong>Name:</strong>
          <span>{{ student.name }}</span>
        </div>

        <div class="detail-row">
          <strong>Gender:</strong>
          <span>{{ student.gender }}</span>
        </div>

        <div class="detail-row">
          <strong>Age:</strong>
          <span>{{ student.age }}</span>
        </div>

        <div class="detail-row">
          <strong>Email:</strong>
          <span>{{ student.email }}</span>
        </div>
      </div>

      <div class="enrolled-units">
        <h2>Enrolled Units</h2>
        <table>
          <thead>
            <tr>
              <th>Unit ID</th>
              <th>Unit Code</th>
              <th>Unit Name</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="unit in units" :key="unit.unitID">
              <td>{{ unit.unitID }}</td>
              <td>{{ unit.unitCode }}</td>
              <td>{{ unit.unitName }}</td>
            </tr>

            <tr v-if="units.length === 0">
              <td colspan="3" class="no-units">This student is not enrolled in any units.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <RouterLink to="/students" class="back-button">Back to Students</RouterLink>
    </div>

    <div v-else>
      <p>Student not found.</p>
      <RouterLink to="/students" class="back-button">Back to Students</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.view-student-page {
  padding: 20px;
}

.student-details {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  max-width: 600px;
}

.detail-row {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #ddd;
}

.detail-row strong {
  width: 150px;
}

.enrolled-units {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #2563eb;
  color: white;
}

.no-units {
  text-align: center;
  font-style: italic;
  color: #555;
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}

.back-button:hover {
  background-color: #1e40af;
}
</style>
