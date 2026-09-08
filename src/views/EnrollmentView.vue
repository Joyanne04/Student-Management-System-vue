<script setup>
import { ref, onMounted } from 'vue'
import API_URL from '@/services/api'

const students = ref([]) // store the list of students
const units = ref([]) // store the list of units
const selectedStudent = ref('')
const selectedUnit = ref('')
const enrollments = ref([])

async function getStudents() {
  try {
    const response = await fetch(`${API_URL}/students`)
    if (!response.ok) {
      throw new Error('Failed to get students')
    }
    students.value = await response.json()
  } catch (error) {
    console.error(error)
    alert('Failed to get students')
  }
}

async function getUnits() {
  try {
    const response = await fetch(`${API_URL}/units`)
    if (!response.ok) {
      throw new Error('Failed to get units')
    }
    units.value = await response.json()
  } catch (error) {
    console.error(error)
    alert('Failed to get units')
  }
}

async function enrollStudent() {
  if (!selectedStudent.value || !selectedUnit.value) {
    alert('Please select both a student and a unit.')
    return
  }

  try {
    const response = await fetch(`${API_URL}/enrollments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentID: selectedStudent.value,
        unitID: selectedUnit.value,
      }),
    })

    if (response.ok) {
      alert('Student enrolled successfully')
      getEnrollments() // Refresh the list of enrollments
    } else {
      let message = `Request failed with status ${response.status}`
      try {
        const errorData = await response.json()
        message = errorData.message || message
      } catch {
        // The backend may return an empty response for server errors.
      }
      alert(`Failed to enroll student: ${message}`)
    }
  } catch (error) {
    console.error('Error enrolling student:', error)
    alert('Failed to enroll student')
  }
}

async function getEnrollments() {
  try {
    const response = await fetch(`${API_URL}/enrollments`)
    if (!response.ok) {
      throw new Error('Failed to get enrollments')
    }
    enrollments.value = await response.json()
  } catch (error) {
    console.error(error)
    alert('Failed to get enrollments')
  }
}

onMounted(() => {
  getStudents()
  getUnits()
  getEnrollments()
})
</script>

<template>
  <div class="enrollment-page">
    <h1>Student Unit Enrollment</h1>

    <p>Enroll Students in Units</p>

    <div class="enrollment-form">
      <label>Student:</label>
      <select v-model="selectedStudent">
        <option value="">Select Student</option>

        <option v-for="student in students" :key="student.studentID" :value="student.studentID">
          {{ student.name }} ({{ student.studentID }})
        </option>
      </select>
      <br>

      <label>Unit:</label>
      <select v-model="selectedUnit">
        <option value="">Select Unit</option>
        <option v-for="unit in units" :key="unit.unitID" :value="unit.unitID">
          {{ unit.unitName }} ({{ unit.unitID }})
        </option>
      </select>
      <br>

      <button @click="enrollStudent" class="enroll-btn">Enroll Student</button>
    </div>

    <h2>Current Enrollments</h2>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Student ID</th>
          <th>Unit Code</th>
          <th>Unit Name</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="enrollment in enrollments" :key="enrollment.ID">
          <td>{{ enrollment.ID }}</td>
          <td>{{ enrollment.studentID }}</td>
          <td>{{ enrollment.unitCode }}</td>
          <td>{{ enrollment.unitName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.enrollment-page {
  padding: 20px;
}

.enrollment-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin-bottom: 20px;
  margin-top: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.enroll-btn {
  margin-top: 10px;
  display: inline-block;
  padding: 6px 8px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #2563eb;
  text-align: left;
}
</style>

