<template>
  <h1>Annuaire des étudiants</h1>

  <form @submit.prevent="ajouterEtudiant">
    <input v-model="newStudent.firstName" placeholder="Prénom" />
    <input v-model="newStudent.lastName" placeholder="Nom" />
    <input v-model="newStudent.filiere" placeholder="Filière" />
    <input v-model.number="newStudent.year" type="number" min="1" max="5" placeholder="Année" />
    <input v-model="newStudent.email" type="email" placeholder="Email" />
    <button type="submit">Ajouter</button>
  </form>

  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher par nom ou prénom" />
    <select v-model="tri">
      <option value="lastName">Trier par nom</option>
      <option value="firstName">Trier par prénom</option>
    </select>
  </div>

  <StudentCard
    v-for="student in etudiantsAffiches"
    :key="student.id"
    :student="student"
  />
  <p v-if="etudiantsAffiches.length === 0">Aucun étudiant trouvé.</p>
</template>

<script setup>
import { ref, computed } from 'vue'
import StudentCard from './StudentCard.vue'
import { store } from '../store/students.js'

const recherche = ref('')
const tri = ref('lastName')
const newStudent = ref({ firstName: '', lastName: '', filiere: '', year: 1, email: '' })

const etudiantsAffiches = computed(() => {
  const texte = recherche.value.trim().toLowerCase()

  const filtres = store.students.filter(s =>
    s.firstName.toLowerCase().includes(texte) ||
    s.lastName.toLowerCase().includes(texte)
  )

  return filtres.sort((a, b) => a[tri.value].localeCompare(b[tri.value]))
})

function ajouterEtudiant() {
  const s = newStudent.value
  if (!s.firstName.trim() || !s.lastName.trim()) return

  const nextId = store.students.reduce((max, e) => Math.max(max, e.id), 0) + 1

  store.students.push({
    id: nextId,
    firstName: s.firstName.trim(),
    lastName: s.lastName.trim(),
    filiere: s.filiere.trim(),
    year: s.year,
    email: s.email.trim()
  })

  newStudent.value = { firstName: '', lastName: '', filiere: '', year: 1, email: '' }
}
</script>