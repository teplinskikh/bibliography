<template>
  <div class="list-container__wrapper">
    <Component :is="typeList" class="list-container">
      <li
        v-for="book in books"
        :key="book.id"
        :style="cssProps"
      >
        <div v-if="isEdit" class="list-container__item">
          <span class="list-container__item__text">
            {{ book.title }}, {{ book.author }}
          </span>
          <div class="list-container__item__actions">
            <RouterLink :to="{ name: RouteNames.BOOK_EDIT, params: { id: book.id } } ">
              <div class="list-container__item__actions__button">
                <ElButton
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  circle
                />
              </div>
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
          {{ book.title }}, {{ book.author }}
        </template>
      </li>
    </component>
  </div>
</template>

<script>
import {mapActions} from "vuex";
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
    deleteBook (book) {
      this.removeBook(book.id)
    }
  },
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
