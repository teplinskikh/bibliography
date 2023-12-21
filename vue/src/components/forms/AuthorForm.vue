<template>
  <div>
    <span class="book-form__input__label">Фамимлия автора</span>
    <ElInput
        :value="author.surname"
        placeholder="Укажите фамилию автора"
        class="book-form__input__text"
        @input="(v) => update({ surname: v })"
    />
    <span class="book-form__input__label">Имя автора</span>
    <ElInput
        :value="author.name"
        placeholder="Укажите имя автора"
        class="book-form__input__text"
        @input="(v) => update({ name: v })"
    />
    <span class="book-form__input__label">Отчество автора</span>
    <ElInput
        :value="author.patronymic"
        placeholder="Укажите фамимлию автора"
        class="book-form__input__text"
        @input="(v) => update({ patronymic: v })"
    />
  </div>
</template>

<script>
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
      default: () => {
        return {
          surname: "",
          name: "",
          patronymic: ""
        }
      }
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
