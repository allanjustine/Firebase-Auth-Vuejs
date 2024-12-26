<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <router-link to="/dashboard" class="navbar-brand p-3 ml-5 text-white"
        >Vue Firebase Project</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link to="/dashboard" class="nav-link text-white">Dashboard</router-link>
          </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto mr-3">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-white"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ><i class="fa-solid fa-circle-user"></i>&nbsp;<span v-if="user">{{
                  user.displayName
                }}</span
                ><span v-if="!user">Click here to Login/Register</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <span v-if="!user"
                  ><router-link to="/login" class="dropdown-item">Login</router-link>
                  <router-link to="/register" class="dropdown-item">Register</router-link></span
                >
                <li v-if="user">
                  <button class="dropdown-item" @click="logoutUser()">Logout</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-view />
    </div>
  </header>
</template>

<style scoped></style>

<script>
import { auth, db } from '@/firebase'

export default {
  data() {
    return {
      user: null
    }
  },
  created() {
    auth.onAuthStateChanged((user) => {
      console.log(user)
      if (user) {
        this.user = user
        this.$router.push('/dashboard')
      } else {
        this.user = null
      }
    })
  },
  methods: {
    logoutUser() {
      auth
        .signOut()
        .then(() => {
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
