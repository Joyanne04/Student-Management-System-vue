<template>
    <div>
        <h1>Dashboard</h1>

        <p>Welcome!</p>

        <div class="dashboard-cards">

            <div class="card">
                <h2>Students</h2>
                <p>Manage students</p>
                <RouterLink to="/students" class="view-students-btn">View Students</RouterLink>
            </div>

            <div class="card">
                <h2>Units</h2>
                <p>Manage units</p>
                <RouterLink to="/units" class="view-units-btn">View Units</RouterLink>
            </div>

            <div class="card">
                <h2>Enrollments</h2>
                <p>Manage student units</p>
                <RouterLink to="/enrollments" class="view-enrollments-btn">View Enrollments</RouterLink>
            </div>

        </div>

    </div>

</template>

<style scoped>
.view-students-btn,.view-units-btn,.view-enrollments-btn {
  display: inline-block;
  padding: 10px 15px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
