<template>
  <div class="list-container__wrapper">
    <div class="list-container">
      <template v-for="(author, index) in (isEdit ? authors : authors.filter(i => i.configIsVisible))">
        <div
          :key="author.id"
          class="list-container__item"
          :class="{ edit: isEdit }"
        >
          <div>
            {{ index + 1 }}. {{ authorStringFull(author) }}
          </div>
          <div v-if="isEdit" class="list-container__item__actions">
            <ElButton
              :type="author.configIsVisible ? 'primary' : 'danger'"
              icon="el-icon-view"
              size="mini"
              circle
              class="list-container__item__actions__button"
              @click="() => hideAuthor(author)"
            />
            <ElButton
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              class="list-container__item__actions__button"
              @click="() => editAuthorHandler(author)"
            />
            <ElButton
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              class="list-container__item__actions__button"
              @click="() => deleteAuthor(author)"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { RouteNames } from "@/router/routes";
import { authorsModal } from "@/mixins/modals";
import { authorStringFull } from "@/const/functions";

export default {
  name: "ListContainerAuthors",
  mixins: [
    authorsModal
  ],
  props: {
    authors: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    RouteNames() {
      return RouteNames
    }
  },
  methods: {
    ...mapMutations("authors", [
      "editAuthor",
      "removeAuthor"
    ]),
    authorStringFull,
    editAuthorHandler (author) {
      this.openEditAuthorModal({ form: author })
    },
    deleteAuthor(author) {
      this.removeAuthor(author.id)
    },
    hideAuthor(author) {
      author.configIsVisible = !author.configIsVisible
      this.editAuthor(author)
    }
  },
};
</script>

<style scoped lang="less">
.list-container {
  &__wrapper {
    padding: 10px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border-radius: 4px;
    box-sizing: border-box;
    height: 42px;

    &.edit {
      transition: 0.2s;

      &:hover {
        background-color: #f1f1f1;
      }
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
