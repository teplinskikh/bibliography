<template>
  <div class="list-container__wrapper">
    <Component v-if="books.length > 0" :is="typeList" class="list-container">
      <template v-for="book in books">
        <li
          v-if="book.configIsVisible || isEdit"
          :key="book.id"
          :class="typeList === 'div' ? 'block list-container__item' : ''"
        >
          <div v-if="isEdit" class="list-container__item" :class="{ edit: isEdit }">
            <SourceItem :book="book" />
            <div class="list-container__item__actions">
              <ElButton
                :type="book.configIsVisible ? 'primary': 'danger'"
                icon="el-icon-view"
                size="mini"
                circle
                @click="() => hideBook(book)"
              />
              <ElButton
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click="() => editBookHandler(book)"
              />
              <ElButton
                type="danger"
                icon="el-icon-delete"
                size="mini"
                circle
                @click="() => deleteBook(book)"
              />
            </div>
          </div>
          <template v-else>
            <SourceItem :book="book" />
          </template>
        </li>
      </template>
    </Component>
    <div v-else>
      Список пуст
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { RouteNames } from "@/router/routes";
import SourceItem from "./Source.vue";
import { biblioModal } from "@/mixins/modals";

export default {
  name: "ListContainer",
  mixins: [
    biblioModal
  ],
  components: {
    SourceItem
  },
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
    }
  },
  methods: {
    ...mapMutations('books', [
      'editBook',
      'removeBook'
    ]),
    deleteBook (book) {
      this.removeBook(book.id)
    },
    editBookHandler (book) {
      this.openEditBiblioModal({ form: book })
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
  text-align: justify;

  &__wrapper {
    padding: 10px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-radius: 4px;
    box-sizing: border-box;
    min-height: 42px;

    &.edit {
      transition: 0.2s;

      &:hover {
        background-color: #f1f1f1;
      }
    }

    &.block {
      display: block;
    }

    &__text {
      flex: 1;
    }

    &__actions {
      display: flex;
      align-items: center;
    }
  }
}
</style>
