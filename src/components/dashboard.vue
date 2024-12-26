<template>
  <div>
    <h1 class="text-white mt-3">Dashboard</h1>
    <hr />
    <div class="row">
      <div class="col-md-3">
        <div class="card text-white" style="background-color: rgb(200, 200, 200)">
          <div class="card-body text-center text-black">
            <h1 class="card-title">{{ userCount }}</h1>
            <p class="card-text">All Users</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" style="background-color: rgb(200, 200, 200)">
          <div class="card-body text-center" style="color: rgb(240, 88, 113)">
            <h1 class="card-title">{{ femaleUsersCount }}</h1>
            <p class="card-text">Female Users</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" style="background-color: rgb(200, 200, 200)">
          <div class="card-body text-center" style="color: rgb(3, 3, 87)">
            <h1 class="card-title">{{ maleUsersCount }}</h1>
            <p class="card-text">Male Users</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card" style="background-color: rgb(200, 200, 200)">
          <div class="card-body text-center" style="color: rgb(238, 199, 26)">
            <h1 class="card-title">{{ nullGenderUsersCount }}</h1>
            <p class="card-text">No Gender Users</p>
          </div>
        </div>
      </div>
    </div>
    <table class="table mt-5">
      <thead class="bg-dark">
        <tr class="text-white">
          <th>Full Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Contact Number</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          :class="{
            'bg-blue': user.gender === 'Male',
            'bg-pink': user.gender === 'Female',
            'bg-null': !user.gender
          }"
        >
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.contactNumber }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { auth, db } from '../Firebase/index.js'
import { onSnapshot, collection } from 'firebase/firestore'

export default {
  setup() {
    const users = ref([])
    const maleUsersCount = ref(0)
    const femaleUsersCount = ref(0)
    const nullGenderUsersCount = ref(0)

    onSnapshot(collection(db, 'users'), (snapshot) => {
      users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

      users.value.sort((a, b) => {
        if (a.gender === 'Male') {
          return -1
        } else if (a.gender === 'Female' && b.gender !== 'Male') {
          return -1
        } else if (!a.gender && (b.gender === 'Female' || b.gender === 'Male')) {
          return 1
        } else {
          return 0
        }
      })

      maleUsersCount.value = users.value.filter((user) => user.gender === 'Male').length
      femaleUsersCount.value = users.value.filter((user) => user.gender === 'Female').length
      nullGenderUsersCount.value = users.value.filter((user) => !user.gender).length
    })

    const userCount = computed(() => {
      return users.value.length
    })

    return {
      users,
      userCount,
      maleUsersCount,
      femaleUsersCount,
      nullGenderUsersCount
    }
  }
}
</script>

<style>
.bg-blue {
  background-color: rgb(3, 3, 87);
  color: white;
}

.bg-pink {
  background-color: rgb(240, 88, 113);
}

.bg-null {
  background-color: rgb(238, 199, 26);
}
</style>
