const booksLocalStorageKey = 'books'

const syncStateBooks = (state) => {
  localStorage.setItem(booksLocalStorageKey, JSON.stringify(state.books))
}

export default {
  namespaced: true,
  state: {
    books: JSON.parse(localStorage.getItem(booksLocalStorageKey)) ?? []
  },
  getters: {
    getBooks: (state) => state.books,
    getBook: (state) => (id) => state.books.find((book) => book.id === id),
    getOrderedBooks: (state) => (sortFunction, filters) => {
      const orderedBooks = [...state.books]
      if(sortFunction != null){
        orderedBooks.sort(sortFunction)
      }
      if(filters.length != 0){
        return orderedBooks.filter((book) => filters.some((filter) =>  filter.name == book.type))
      }
      return orderedBooks
    },
  },
  mutations: {
    setBooks: (state, payload) => {
      state.books = payload
      syncStateBooks(state)
    },
    addBook: (state, payload) => {
      payload.id = Date.now()
      state.books.push(payload)
      syncStateBooks(state)
    },
    removeBook: (state, payload) => {
      state.books = state.books.filter((book) => book.id !== payload);
      syncStateBooks(state)
    },
    editBook: (state, payload) => {
      state.books = state.books.map((book) => book.id === payload.id ? payload : book)
      syncStateBooks(state)
    },
  },
  actions: {  }
}
