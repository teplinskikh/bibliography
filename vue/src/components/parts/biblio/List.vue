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
          <div v-else class="list-container__item">
            <SourceItem :book="book" />
            <div v-if="typeList === 'div'" class="list-container__item__actions">
              <el-tooltip content="Скачать фрагмент" placement="top">
                <a
                  :href="getFileLink(`fragment/${book.fullFileName}`)"
                  download
                >
                  <ElButton
                    type="warning"
                    icon="el-icon-download"
                    size="mini"
                    v-tooltip="'fragment'"
                    circle
                  />
                </a>
              </el-tooltip>
              <el-tooltip content="Скачать полный файл" placement="top">
                <a
                  :href="getFileLink(`full/${book.fullFileName}`)"
                  download
                >  
                  <ElButton
                    type="primary"
                    icon="el-icon-download"
                    size="mini"
                    circle
                  />
                </a>
              </el-tooltip>
            </div>
          </div>
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
    },
    getFileLink(lnk){
      if (lnk === 'full/' || lnk == 'fragment/')
        return null
      else 
        return `@/assets/${lnk}`
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
