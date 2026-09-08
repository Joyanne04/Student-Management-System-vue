<script setup>
import { ref, onMounted } from "vue";
import API_URL from "@/services/api";

const units = ref([]);

async function getUnits() {
  try {
    const response = await fetch(`${API_URL}/units`);
    if (response.ok) {
      units.value = await response.json();

    } else {
      console.error("Failed to fetch units");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


async function deleteUnit(unitID) {
  const confirmed = confirm(`Are you sure you want to delete unit ${unitID}?`);
  if (!confirmed) return;

  try {
    const response = await fetch(`${API_URL}/units/${unitID}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Failed to delete unit");
    }

    units.value = units.value.filter(
      (unit) => unit.unitID !== unitID
    );

  } catch (error) {
    console.error("Error deleting unit:", error);
  }
}

onMounted(async () => { await getUnits();});



</script>

<template>
    <div>

        <h1>Units</h1>
        <RouterLink to="/add-unit" class="add-unit-btn">Add Unit</RouterLink>

        <table>
            <thead>

                <tr>
                    <th>ID</th>
                    <th>Unit Code</th>
                    <th>Unit Name</th>
                    <th>Actions</th>
                </tr>

            </thead>

            <tbody>

                <tr
                    v-for="unit in units"
                    :key="unit.unitID">

                    <td>{{ unit.unitID }}</td>

                    <td>{{ unit.unitCode }}</td>

                    <td>{{ unit.unitName }}</td>

                    <td class="actions-cell">
                        <RouterLink :to="`/view-unit/${unit.unitID}`" class="action-btn view-btn">View</RouterLink>
                        <RouterLink :to="`/edit-unit/${unit.unitID}`" class="action-btn edit-btn">Edit</RouterLink>

                        <button @click="deleteUnit(unit.unitID)" class="action-btn delete-btn">
                            Delete
                        </button>
                    </td>

                </tr>
            </tbody>
        </table>
    </div>

</template>

<style scoped>
.add-unit-btn {
  display: inline-block;
  padding: 10px 15px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
