<script setup>

import UnitsForm from '@/components/UnitsForm.vue';
import API_URL from '@/services/api';
import { useRouter } from 'vue-router';

const router = useRouter ();

async function addUnit(unit) {
  try {
    const response = await fetch(`${API_URL}/units`, {    // sends data to Flask
      method: "POST",
      headers: {
        "Content-Type": "application/json"    // data being sent is JSON
      },
      body: JSON.stringify(unit)
    });

    if (response.ok) {
      alert("Unit added successfully!");

      router.push("/units")      // Redirect to the units page after successful addition

    } else {
      alert("Failed to add unit");
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
}
</script>

<template>
    <div class="add-unit-page">

        <h1>Add Unit</h1>

        <UnitsForm buttonText="Add Unit" @submit="addUnit"/>
        <br>

        <RouterLink to="/units">Back to Units</RouterLink>
    </div>

</template>
