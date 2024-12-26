<template>
  <div class="container col-md-6 offset-md-3 mt-5 text-warning">
    <div v-show="error" class="alert alert-danger">
      <h5 class="text-center">
        {{ errorMsg }}
      </h5>
    </div>
    <div v-show="success" class="alert alert-success">
      <h5 class="text-center">
        {{ successMsg }}
      </h5>
    </div>
    <div class="card shadow bg-dark">
      <div class="card-header bg-info">
        <h1 class="text-center text-warning">Login</h1>
      </div>
      <div class="card-body pl-5 pr-5">
        <div class="form-group mb-3">
          <label for="email">Email:</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="form-group mb-3">
          <label for="password">Password:</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <div class="a-flex">
          <div class="flex-grow-1">
            <router-link to="register">Create account</router-link>
          </div>
          <button class="btn btn-primary mt-3" @click="loginUser">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../Firebase/index.js'
import { signInWithEmailAndPassword } from 'firebase/auth'
import router from '../router'

const email = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')
const userName = ref('')

const loginUser = () => {
  if (email.value != '' || password.value != '') {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((cred) => {
        console.log('user created', cred.user)
        email.value = ''
        password.value = ''
        error.value = false
        success.value = true
        successMsg.value = 'Login Successfully'
        router.push('/dashboard')
      })
      .catch((err) => {
        success.value = false
        error.value = true
        errorMsg.value = err.message
      })
  } else {
    error.value = true
    errorMsg.value = 'Please fill out all the fields'
  }
}

// This code will update the userName ref when the user logs in
auth.onAuthStateChanged((user) => {
  if (user) {
    userName.value = user.displayName
  } else {
    userName.value = ''
  }
})
</script>
