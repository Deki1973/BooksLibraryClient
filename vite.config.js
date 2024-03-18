import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[
      {find: "@style/",replacement:"/src/style/"},
      {find:"@context/",replacement:"/src/context/"},
      {find:"@assets/",replacement:"/src/assets/"},
      {find:"@components/",replacement:"/src/components/"}
    ]
  }
})
