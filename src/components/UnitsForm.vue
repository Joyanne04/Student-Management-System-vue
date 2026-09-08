<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
    unit: {
        type: Object,
        default: () => ({
            unitID: "",
            unitCode: "",
            unitName: ""
        })
    },

    buttonText: {
        type: String,
        default: "Submit"
    }
});

const emit = defineEmits(["submit"]);

const form = reactive({
    unitID: "",
    unitCode: "",
    unitName: ""
});


watch(
    () => props.unit,
    (newUnit) => {
        form.unitID = newUnit.unitID || "";
        form.unitCode = newUnit.unitCode || "";
        form.unitName = newUnit.unitName || "";
    },

    { immediate: true, deep: true}
);

function submitForm() {

    emit("submit", {
        unitID: form.unitID,
        unitCode: form.unitCode,
        unitName: form.unitName
    });
}

</script>

<template>
  <div class="container">
    <p id="demo"></p>

    <form @submit.prevent="submitForm" class="unit-form">
      <h1 class="form-title">Unit Registration Form</h1>

        <div class="form-group">
            <label>Unit ID</label>
            <input v-model="form.unitID" type="text" placeholder="Enter unit ID" required>
        </div>

        <div class="form-group">
            <label>Unit Code</label>
            <input v-model="form.unitCode" type="text" placeholder="Enter unit code" required>
        </div>

        <div class="form-group">
            <label>Unit Name</label>
            <input v-model="form.unitName" type="text" placeholder="Enter unit name" required>
        </div>

        <div class="actions">
          <button type="submit">{{props.buttonText}}</button>
        </div>
    </form>
  </div>

</template>

<style scoped>
.unit-form {
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

button:hover {
  background: #1e40af;
}

</style>

