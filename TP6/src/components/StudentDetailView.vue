<template>
  <div v-if="student">
    <h1>{{ student.firstName }} {{ student.lastName }}</h1>

    <p>
      <label>Filière :
        <input v-model="student.filiere" type="text" />
      </label>
    </p>
    <p>
      <label>Année :
        <input v-model.number="student.year" type="number" min="1" max="5" />
      </label>
    </p>
    <p>
      <label>Email :
        <input v-model="student.email" type="email" />
      </label>
    </p>
  </div>
  <div v-else>
    <p>Étudiant introuvable.</p>
  </div>

  <button @click="router.back()">Retour</button>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { store } from '../store/students.js'

const route = useRoute()
const router = useRouter()

const student = computed(() =>
  store.students.find(s => s.id === Number(route.params.id))
)
</script>