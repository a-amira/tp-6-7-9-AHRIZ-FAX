<template>
  <h1>Explorateur de pays</h1>

  <p class="loading" v-show="loading">Chargement des pays</p>
  <p class="error" v-if="error">{{ error }}</p>

  <div class="toolbar">
    <input v-model="recherche" placeholder="Rechercher un pays" />
  </div>

  <div class="grid">
    <CountryCard v-for="country in paysAffiches" :key="country.cca3" :country="country" />
  </div>
</template>

<script>
import CountryCard from '../components/CountryCard.vue'
import { API_URL, adapter } from '../api.js'

export default {
  name: 'CountryListView',
  components: { CountryCard },
  data() {
    return {
      countries: [],
      loading: true,
      error: null,
      recherche: ''
    }
  },
  computed: {
    paysAffiches() {
      const texte = this.recherche.toLowerCase()
      return this.countries.filter(country =>
        country.name.common.toLowerCase().includes(texte)
      )
    }
  },
  methods: {
    async chargerPays() {
      this.loading = true
      this.error = null
      try {
        const reponse = await fetch(`${API_URL}/countries`)
        if (!reponse.ok) throw new Error(`Erreur ${reponse.status}`)
        const donnees = await reponse.json()
        this.countries = donnees.map(adapter)
      } catch (e) {
        this.error = 'Impossible de charger les pays.'
      } finally {
        this.loading = false
      }
    }
  },
  mounted() {
    this.chargerPays()
  }
}
</script>