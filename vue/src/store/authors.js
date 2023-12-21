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
    // Получить список авторов
    getAuthors: (state) => state.authors,
    // Получение автора по индексу
    getAuthor: (state) => (id) => state.authors.find((author) => author.id == id)
  },
  mutations: {
    // Записать авторов
    setAuthors: (state, payload) => {
      state.authors = payload
      syncStateAuthors(state)
    },
    // Добавление автора
    addAuthor: (state, payload) => {
      payload.id = Date.now().toString()
      state.authors.push(payload)
      syncStateAuthors(state)
    },
    // Удаление автора по индексу
    removeAuthor: (state, payload) => {
      const objWithIdIndex = state.authors.findIndex((author) => author.id === payload);
      if (objWithIdIndex > -1) {
        state.authors.splice(objWithIdIndex, 1);
        syncStateAuthors(state)
      }
    },
    // Редактирование автора
    editAuthor: (state, payload) => {
      state.authors = state.authors.map((author) => author.id == payload.id ? payload : author)
      syncStateAuthors(state)
    }
  },
  actions: {
    // Добавление автора
    addAuthor: (store, payload) => new Promise(() => {
      store.commit('addAuthor', payload)
      console.log(payload)
    }),
    // Удаление автора
    removeAuthor: (store, payload) => new Promise(() => {
      store.commit('removeAuthor', payload)
    }),
    // Редактирование автора
    editAuthor: (store, payload) => new Promise(() => {
      store.commit('editAuthor', payload)
    })
  }
}
