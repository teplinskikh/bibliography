<template>
  <div>
    <component :is="typeList">
      <li
        v-for="book in books" 
        :key="book.id" 
        :style="cssProps"
      >
        {{ book.title }}, {{ book.author }}
      </li>
    </component>
  </div>
</template>

<script>

export default {
  name: "ListContainer",
  props: {
    books: {
      type: Array,
      default: () => ([])
    },
    typeList: {
      type: String,
      default: 'ul'
    }
  },
  computed: {
    cssProps () {
      return this.typeList == "div" ? {
        'display': 'block'
      } : {}
    }
  }
}
</script>
<style></style>