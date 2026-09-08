<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import UnitsForm from "@/components/UnitsForm.vue";
import API_URL from "@/services/api";

const route = useRoute();
const router = useRouter();

const unitID = route.params.id;
const unit = ref(null);
const loading = ref(true);

async function getUnit() {
    try {
        const response = await fetch(`${API_URL}/units/${unitID}`);
        if (!response.ok) {
            throw new Error("Failed to get unit");
        }
        unit.value = await response.json();
    } catch (error) {
        console.error(error);
        alert("Failed to get unit");

    } finally {
        loading.value = false;
    }
}


async function updateUnit(updatedUnit) {
    try {
        const response = await fetch(`${API_URL}/units/${unitID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUnit)
        });

        if (response.ok) {
            alert("Unit updated successfully");
            router.push("/units");

        } else {
            const errorData = await response.json();
            alert(`Failed to update unit: ${errorData.message}`);
        }

    } catch (error) {
        console.error("Error updating unit:", error);
        alert("Failed to update unit");
    }
}

onMounted(() => { getUnit(); });

</script>

<template>

    <div class="edit-unit-page">
        <h1>Edit Unit</h1>

        <div v-if="loading">Loading unit information...</div>
        <div v-else-if="unit">
            <UnitsForm :unit="unit" buttonText="Update" @submit="updateUnit" />
            <br>
            <RouterLink to="/units">Back to Units</RouterLink>
        </div>
        <div v-else>
              <p>Unit not found.</p>
        </div>
    </div>

</template>
