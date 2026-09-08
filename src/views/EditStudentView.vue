<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import StudentForm from "@/components/StudentForm.vue";
import API_URL from "@/services/api";

const route = useRoute();
const router = useRouter();

const studentID = route.params.id;
const student = ref(null);
const loading = ref(true);

async function getStudent() {
    try {
        const response = await fetch(`${API_URL}/students/${studentID}`);
        if (!response.ok) {
            throw new Error("Failed to get student");
        }
        student.value = await response.json();
    } catch (error) {
        console.error(error);
        alert("Failed to get student");

    } finally {
        loading.value = false;
    }
}


async function updateStudent(updatedStudent) {
    try {
        const response = await fetch(`${API_URL}/students/${studentID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedStudent)
        });

        if (response.ok) {
            alert("Student updated successfully");
            router.push("/students");

        } else {
            const errorData = await response.json();
            alert(`Failed to update student: ${errorData.message}`);
        }

    } catch (error) {
        console.error("Error updating student:", error);
        alert("Failed to update student");
    }
}

onMounted(() => { getStudent(); });

</script>

<template>

    <div class="edit-student-page">
        <h1>Edit Student</h1>

        <div v-if="loading">Loading student information...</div>
        <div v-else-if="student">
            <StudentForm :student="student" buttonText="Update" @submit="updateStudent" />
            <br>
            <RouterLink to="/students">Back to Students</RouterLink>
        </div>
        <div v-else>
            <p>Student not found.</p>
        </div>
    </div>

</template>
