<script setup>
import { RouterLink } from 'vue-router';

defineOptions({
  name: 'AppSidebar'
});
</script>

<template>
    <aside class="sidebar">
        <h3>Menu</h3>
        <ul>
            <li>
                <RouterLink to="/">Dashboard</RouterLink>
            </li>

            <li>
                <RouterLink to="/students">Students</RouterLink>
            </li>

            <li>
                <RouterLink to="/units">Units</RouterLink>
            </li>

            <li>
                <RouterLink to="/enrollments">Enrollments</RouterLink>
            </li>

        </ul>
    </aside>
</template>

<style scoped>
.sidebar {
  background-color: #f5f5f5;
  padding: 1rem;
  width: 200px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar h3 {
  margin-top: 0;
  font-size: 1.2rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin: 0.5rem 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sidebar a:hover {
  background-color: #ddd;
}

.sidebar a.router-link-active {
  background-color: #4CAF50;
  color: white;
}
</style>
