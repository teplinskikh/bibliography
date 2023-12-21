<template>
  <div class="list-container__wrapper">
    <div class="list-container">
      <template v-for="author in authors">
        <div
          v-if="author.configIsVisible || isEdit"
          :key="author.id"
        >
          <div v-if="isEdit" class="list-container__item">
            {{ author.surname }} {{ author.name }} {{ author.patronymic }}
            <div class="list-container__item__actions">
              <ElButton
                :type="author.configIsVisible ? 'primary' : 'danger'"
                icon="el-icon-view"
                size="mini"
                circle
                class="list-container__item__actions__button"
                @click="() => hideAuthor(author)"
              />
              <RouterLink :to="{ name: RouteNames.AUTHOR_EDIT, params: { id: author.id } }">
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
                @click="() => deleteAuthor(author)"
              />
            </div>
          </div>
          <template v-else>
            {{ author.surname }} {{ author.name }} {{ author.patronymic }}
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { RouteNames } from "@/router/routes";

export default {
  name: "ListContainerAuthors",
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
      return RouteNames;
    }
  },
  methods: {
    ...mapActions("authors", ["removeAuthor"]),
    ...mapMutations("authors", ["editAuthor"]),
    deleteAuthor(author) {
      this.removeAuthor(author.id);
    },
    hideAuthor(author) {
      author.configIsVisible = !author.configIsVisible;
      this.editAuthor(author);
    },
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
