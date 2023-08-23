/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// Components
import { VDataTableServer } from 'vuetify/labs/VDataTable'

import { zhHant } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VDataTableServer
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#C2F043',
          secondary: '#5B701F',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          lightblue: '#14c6FF',
          yellow: '#FFCF00',
          pink: '#FF1976',
          orange: '#FF8657',
          magenta: '#C33AFC',
          darkblue: '#1E2D56',
          gray: '#909090',
          neutralgray: '#9BA6C1',
          green: '#2ED47A',
          red: '#FF5c4E',
          darkblueshade: '#308DC2',
          lightgray: '#BDBDBD',
          lightpink: '#FFCFE3',
          white: '#FFFFFF'
        }
      }
    }
  },
  locale: {
    locale: 'zhHant',
    messages: { zhHant }
  }
})
