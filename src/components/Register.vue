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
    <div class="card shadow rounded bg-dark">
      <div class="card-header rounded bg-info">
        <h1 class="text-center text-warning">Register</h1>
      </div>
      <div class="card-body pr-5 pl-5">
        <div class="form-group mb-3">
          <label for="fullName">Full Name:</label>
          <input
            type="text"
            class="form-control"
            v-model="fullName"
            required
            placeholder="Full Name"
          />
        </div>
        <div class="form-group mb-3">
          <label for="address">Address:</label>
          <input
            type="text"
            class="form-control"
            v-model="address"
            required
            placeholder="Address"
          />
        </div>
        <div class="form-group mb-3">
          <label for="contactNumber">Gender:</label>
          <select name="gender" id="" v-model="gender" class="form-select" required>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group mb-3">
          <label for="contactNumber">Contact Number:</label>
          <input
            type="number"
            class="form-control"
            v-model="contactNumber"
            required
            placeholder="Contact Number"
          />
        </div>
        <div class="form-group mb-3">
          <label for="email">Email:</label>
          <input type="email" class="form-control" v-model="email" required placeholder="Email" />
        </div>
        <div class="form-group mb-3">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="password"
            required
            placeholder="Password"
          />
        </div>
        <div class="a-flex">
          <div class="flex-grow-1">
            <router-link to="login">Already have an account!</router-link>
          </div>
          <button class="btn btn-primary mt-2" @click="registerUser">Register</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth, db } from '../Firebase/index.js'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
import router from '../router'

const fullName = ref('')
const address = ref('')
const gender = ref('')
const contactNumber = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const errorMsg = ref('')
const success = ref('')
const successMsg = ref('')

const registerUser = async () => {
  if (
    fullName.value != '' ||
    address.value != '' ||
    gender.value != '' ||
    contactNumber.value != '' ||
    email.value != '' ||
    password.value != ''
  ) {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.value, password.value)

      await updateProfile(cred.user, { displayName: fullName.value })

      await sendEmailVerification(cred.user)

      await addDoc(collection(db, 'users'), {
        fullName: fullName.value,
        address: address.value,
        gender: gender.value,
        contactNumber: contactNumber.value,
        email: email.value,
        uid: cred.user.uid
      })

      fullName.value = ''
      address.value = ''
      gender.value = ''
      contactNumber.value = ''
      email.value = ''
      password.value = ''
      error.value = false
      success.value = true
      successMsg.value = 'Registered Successfully'
      router.push('/login')
    } catch (err) {
      success.value = false
      error.value = true
      errorMsg.value = err.message
    }
  } else {
    error.value = true
    errorMsg.value = 'Please fill out all the fields'
  }
}
</script>

