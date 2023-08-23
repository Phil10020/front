/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// VueGoogleMap

import VueGoogleMaps from '@fawmi/vue-google-maps'
// StyleSheet
import './assets/main.scss'

// AOS
import AOS from 'aos'
import 'aos/dist/aos.css'

const app = createApp(App)

app.mixin({
  created () {
    AOS.init()
  }
})
app.use(VueGoogleMaps, {
  load: {
    key: import.meta.env.VITE_GOOGLE_KEY,
    libraries: 'places'
  },
  installComponents: true
})

registerPlugins(app)

app.mount('#app')
