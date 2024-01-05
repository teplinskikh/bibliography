<template>
  <div class="book-form">
    <span class="book-form__label">Фамимлия</span>
    <ElInput
      :value="author.surname"
      placeholder="Фамилия"
      class="book-form__input"
      @input="(v) => update({ surname: v })"
    />
    <span class="book-form__label">Имя</span>
    <ElInput
      :value="author.name"
      placeholder="Имя"
      class="book-form__input"
      @input="(v) => update({ name: v })"
    />
    <span class="book-form__label">Отчество</span>
    <ElInput
      :value="author.patronymic"
      placeholder="Отчество"
      class="book-form__input"
      @input="(v) => update({ patronymic: v })"
    />
  </div>
</template>

<script>
export const author = () => ({
  surname: "",
  name: "",
  patronymic: "",
  configIsVisible: true
})

export default {
  name: 'AuthorForm',
  model: {
    prop: 'author',
    event: 'change'
  },
  props: {
    author: {
      type: Object,
      required: true,
      default: () => ({
        surname: "",
        name: "",
        patronymic: ""
      })
    }
  },
  methods: {
    update (v) {
      this.$emit('change', {
        ...this.author,
        ...v
      })
    }
  }
}
</script>
