import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  }),

  actions: {
    login(user: any) {
      this.user = user
      localStorage.setItem('currentUser', JSON.stringify(user))
    },

    logout() {
      this.user = null
      localStorage.removeItem('currentUser')
    },
  },
})