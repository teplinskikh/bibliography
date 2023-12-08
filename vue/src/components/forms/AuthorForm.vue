<template>
  <div>
    <span class="book-form__input__label">Автор</span>
    <ElInput
        :value="author.name"
        placeholder="Укажите фамилию автора"
        class="book-form__input__text"
        @input="(v) => updateName(v)"
    />
    <span class="book-form__input__label">Инициалы автора</span>
    <ElInput
        :value="author.initials"
        placeholder="Укажите инициалы автора"
        class="book-form__input__text"
        @input="(v) => updateInitials(v)"
    />
  </div>
</template>

<script>
export default {
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
          name: "",
          initials: ""
        }
      }
    }
  },
  methods: {
    updateName (v) {
      this.$emit('change', {
        name: v,
        initials: this.author.initials
      })
    },
    updateInitials (v) {
      this.$emit('change', {
        name: this.author.name,
        initials: v
      })
    }
  }
}
</script>