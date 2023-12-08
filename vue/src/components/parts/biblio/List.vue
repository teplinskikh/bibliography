<template>
  <div class="list-container__wrapper">
    <Component :is="typeList" class="list-container">
      <template v-for="book in books">
        <li
            v-if="book.configIsVisible || isEdit"
            :key="book.id"
            :style="cssProps"
        >
          <div v-if="isEdit" class="list-container__item">
            <span class="list-container__item__text">
              {{ book.title }}, {{ book.authors }}
            </span>
            <div class="list-container__item__actions">
              <ElButton
                  :type="book.configIsVisible ? 'primary': 'danger'"
                  icon="el-icon-view"
                  size="mini"
                  circle
                  class="list-container__item__actions__button"
                  @click="() => hideBook(book)"
              />
              <RouterLink :to="{ name: RouteNames.BOOK_EDIT, params: { id: book.id } } ">
                <ElButton
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    circle
                    class="list-container__item__actions__button"
                />
              </RouterLink>
              <ElButton
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  class="list-container__item__actions__button"
                  @click="() => deleteBook(book)"
              />
            </div>
          </div>
          <template v-else>
            {{ book.title }}, {{ book.authors }}
          </template>
        </li>
      </template>
    </component>
  </div>
</template>

<script>
import {mapActions, mapMutations} from "vuex";
import {RouteNames} from "@/router/routes";

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
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    RouteNames () {
      return RouteNames
    },
    cssProps () {
      return this.typeList == "div" ? {
        'display': 'block'
      } : {}
    }
  },
  methods: {
    ...mapActions('books', [
      'removeBook'
    ]),
    ...mapMutations('books', [
      'editBook'
    ]),
    deleteBook (book) {
      this.removeBook(book.id)
    },
    hideBook (book) {
      book.configIsVisible = !book.configIsVisible
      this.editBook(book)
    }
  }
}
</script>

<style scoped lang="less">
.list-container {
  &__wrapper {
    padding: 10px;
  }

  &__item {
    display: flex;

    &__text {
      flex: 1;
    }

    &__actions {
      display: flex;

      &__button {
        margin: 2px;
      }
    }
  }
}
</style>
