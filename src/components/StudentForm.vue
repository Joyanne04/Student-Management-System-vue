<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
    student: {
        type: Object,
        default: () => ({
            studentID: "",
            name: "",
            gender: "",
            age: "",
            email: ""
        })
    },

    buttonText: {
        type: String,
        default: "Submit"
    }
});

const emit = defineEmits(["submit"]);

const form = reactive({
    studentID: "",
    name: "",
    gender: "",
    age: "",
    email: ""
});


watch(
    () => props.student,
    (newStudent) => {
        form.studentID = newStudent.studentID || "";
        form.name = newStudent.name || "";
        form.gender = newStudent.gender || "";
        form.age = newStudent.age || "";
        form.email = newStudent.email || "";
    },

    { immediate: true, deep: true}
);


function submitForm() {

    emit("submit", {
        studentID: form.studentID,
        name: form.name,
        gender: form.gender,
        age: Number(form.age),
        email: form.email
    });
}

</script>

<template>
  <div class="container">
    <p id="demo"></p>

    <form @submit.prevent="submitForm" class="student-form">
      <h1 class="form-title">Student Registration Form</h1>

        <div class="form-group">
            <label>Student ID</label>
            <input v-model="form.studentID" type="text" placeholder="Enter student ID" required>
        </div>


        <div class="form-group">
            <label>Name</label>
            <input v-model="form.name" type="text" placeholder="Enter student name" required>
        </div>


        <div class="form-group">
            <label>Gender</label>
            <select v-model="form.gender" required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
        </div>


        <div class="form-group">
            <label>Age</label>
            <input v-model="form.age" type="number" placeholder="Enter student age" required>
        </div>


        <div class="form-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="Enter email" required>
        </div>

        <div class="actions">
          <button type="submit">{{ props.buttonText }}</button>
        </div>


    </form>
  </div>

</template>


<style scoped>
.student-form {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 25px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}

.form-title {
  text-align: center;
  margin: 0 0 20px;
  font-weight: bold;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  color: #374151;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font: inherit;
  font-weight: 400;
}

input:focus, select:focus, textarea:focus {
  outline: 2px solid #93c5fd;
  border-color: #2563eb;
}

.error {
  color: #b91c1c;
  margin: 0 0 12px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #2563eb;
  color: white;
  cursor: pointer;
  font-weight: 600;
}

button.secondary {
  background: #6b7280;
}

button:hover {
  opacity: .9;
}

</style>
