<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import API_URL from '@/services/api'

const route = useRoute()
const unitID = route.params.id
const unit = ref(null)
const students = ref([])
const loading = ref(true)

async function getUnitDetails() {
  try {
    const response = await fetch(`${API_URL}/units/${unitID}/details`)
    if (!response.ok) {
      throw new Error('Failed to get unit details')
    }

    const data = await response.json()
    unit.value = data.unit
    students.value = data.students

  } catch (error) {
    console.error(error)
    alert('Failed to get unit details')
    
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getUnitDetails()
})
</script>

<template>
  <div class="view-unit-page">
    <h1>Unit Details</h1>

    <div v-if="loading">Loading unit details...</div>
    <div v-else-if="unit">
      <div class="unit-details">
        <h2>Unit Information</h2>

        <div class="detail-row">
          <strong>Unit ID:</strong>
          <span>{{ unit.unitID }}</span>
        </div>

        <div class="detail-row">
          <strong>Unit Code:</strong>
          <span>{{ unit.unitCode }}</span>
        </div>

        <div class="detail-row">
          <strong>Unit Name:</strong>
          <span>{{ unit.unitName }}</span>
        </div>
      </div>

      <div class="students-section">
        <h2>Students enrolled to this unit</h2>

        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="student in students" :key="student.studentID">
              <td>{{ student.studentID }}</td>
              <td>{{ student.name }}</td>
              <td>{{ student.gender }}</td>
              <td>{{ student.age }}</td>
              <td>{{ student.email }}</td>
            </tr>

            <tr v-if="students.length === 0">
              <td colspan="5" class="no-student">No students enrolled in this unit.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />
      <RouterLink to="/units" class="back-button">Back to Units</RouterLink>
    </div>

    <div v-else>
      <p>Unit not found.</p>
      <RouterLink to="/units" class="back-button">Back to Units</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.view-unit-page {
  padding: 20px;
}

.unit-details {
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

.students-section {
  background-color: #f9f9f9;
  padding: 20px;
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

.no-student {
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
