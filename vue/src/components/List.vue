<template>
  <div>
    <component :is="typeList" class="list-container">
      <li
          v-for="book in books"
          :key="book.id"
          :style="cssProps"
      >
        <div class="list-container__item" v-if="isEdit">
          <span class="list-container__item__text">
            {{ book.title }}, {{ book.author }}
          </span>
          <div class="list-container__item__actions">
            <div>
              <ElButton
                  v-if="isEdit"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  circle
                  class="list-container__item__actions__button"
                  @click="() => deleteBook(book)"
              />
            </div>
            <RouterLink :to="{ name: RouteNames.BOOK_EDIT, params: { id: book.id } } ">
              <div class="list-container__item__actions__button">
                <ElButton
                    v-if="isEdit"
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    circle
                />
              </div>
            </RouterLink>
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
  &__item {
    display: inline-flex;

    &__actions {
      display: inline-flex;

      &__button {
        margin: 2px;
      }
    }

    &__text {
      min-width: 200px;
    }
  }
}
</style>
