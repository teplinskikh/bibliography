const authorsLocalStorageKey = 'authors'

const syncStateAuthors = (state) => {
  localStorage.setItem(authorsLocalStorageKey, JSON.stringify(state.authors))
}

export default {
  namespaced: true,
  state: {
    authors: JSON.parse(localStorage.getItem(authorsLocalStorageKey)) ?? []
  },
  getters: {
    getAuthors: (state) => state.authors,
    getAuthor: (state) => (id) => state.authors.find((author) => author.id === id)
  },
  mutations: {
    setAuthors: (state, payload) => {
      state.authors = payload
      syncStateAuthors(state)
    },
    addAuthor: (state, payload) => {
      payload.id = Date.now().toString()
      state.authors.push(payload)
      syncStateAuthors(state)
    },
    removeAuthor: (state, payload) => {
      state.authors = state.authors.filter((author) => author.id !== payload)
      syncStateAuthors(state)
    },
    editAuthor: (state, payload) => {
      state.authors = state.authors.map((author) => author.id === payload.id ? payload : author)
      syncStateAuthors(state)
    }
  }
}
