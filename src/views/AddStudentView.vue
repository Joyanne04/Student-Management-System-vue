<script setup>
import StudentForm from '@/components/StudentForm.vue';
import API_URL from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter ();

async function addStudent(student) {
  try {
    const response = await fetch(`${API_URL}/students`, {    // sends data to Flask
      method: "POST",
      headers: {
        "Content-Type": "application/json"    // data being sent is JSON
      },
      body: JSON.stringify(student)
    });

    if (response.ok) {
      alert("Student added successfully!");

      router.push("/students")

    } else {
      alert("Failed to add student");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}

</script>

<template>

    <div class="add-student-page">
        <h1>Add Student</h1>

        <StudentForm buttonText="Add Student" @submit="addStudent"/>
        <br>

        <RouterLink to="/students">Back to Students</RouterLink>
    </div>

</template>
