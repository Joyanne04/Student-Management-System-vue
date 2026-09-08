<script setup>
import { ref, onMounted } from "vue";
import API_URL from "@/services/api";

const students = ref([]);

async function getStudents() {

  try{
    const response = await fetch(`${API_URL}/students`);
    students.value = await response.json();

  } catch (error) {
    console.error("Error:", error);
  }
}


async function deleteStudent(studentID) {
  const confirmed = confirm('Are you sure you want to delete student ${studentID}?');
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/students/${studentID}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete student");
    }

    students.value = students.value.filter(
      (student) => student.studentID !== studentID
    );

  } catch (error) {
    console.error("Error deleting student:", error);
  }
}


onMounted(() => { getStudents(); });

</script>

<template>
    <div>
        <h1>Students</h1>
        <RouterLink to="/add-student" class="add-student-btn">Add Student</RouterLink>

        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="student in students"
                    :key="student.studentID">

                    <td>{{ student.studentID }}</td>

                    <td>{{ student.name }}</td>

                    <td>{{ student.gender }}</td>

                    <td>{{ student.age }}</td>

                    <td>{{ student.email }}</td>

                    <td class="actions-cell">
                      <RouterLink :to="`/view-student/${student.studentID}`" class="action-btn view-btn">View</RouterLink>
                      <RouterLink :to="`/edit-student/${student.studentID}`" class="action-btn edit-btn">Edit</RouterLink>

                        <button type="button" class="action-btn delete-btn" @click="deleteStudent(student.studentID)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<style scoped>
.students-page {
  padding: 20px;
}

.add-student-btn {
  display: inline-block;
  padding: 10px 15px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
}


</style>
