const booksLocalStorageKey = 'books'

const syncStateBooks = (state) => {
  localStorage.setItem(booksLocalStorageKey, JSON.stringify(state.books))
}

export default {
  namespaced: true,
  state: {
    books: localStorage.getItem(booksLocalStorageKey)
  },
  getters: {
    // Получить список книг
    getBooks: (state) => state.books,
    // Получение книги по индексу
    getBook: (state) => (id) => state.books.find((book) => book.id == id)
  },
  mutations: {
    // Записать книги
    setBooks: (state, payload) => {
      state.books = payload
      syncStateBooks(state)
    },
    // Добавление книги
    addBook: (state, payload) => {
      state.books.push(payload)
      syncStateBooks(state)
    },
    // Удаление книги по индексу
    removeBook: (state, payload) => {
      const objWithIdIndex = state.books.findIndex((book) => book.id === payload);
      if (objWithIdIndex > -1) {
        state.books.splice(objWithIdIndex, 1);
        syncStateBooks(state)
      }
    },
    // Редактирование книги
    editBook: (state, payload) => {
      state.books = state.books.map((book) => book.id == book.id ? payload : book)
      syncStateBooks(state)
    }
  },
  actions: {
    // Добавление книги
    addBook: (store, payload) => new Promise(() => {
      store.commit('addBook', payload)
    }),
    // Удаление книги
    removeBook: (store, payload) => new Promise(() => {
      store.commit('removeBook', payload)
    }),
    // Редактирование книги
    editBook: (store, payload) => new Promise(() => {
      store.commit('editBook', payload)
    })
  }
}