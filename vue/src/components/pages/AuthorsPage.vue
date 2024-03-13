<template>
  <PageLayout>
    <section>
      <div class="navigation">
        <h2 class="flex-1">
          Список авторов
        </h2>
        <ElSwitch
          v-model="editMode"
          active-text="Режим редактирования"
        />
        <ElButton
          type="primary"
          size="small"
          @click="() => openNewAuthorModal()"
        >Добавить автора</ElButton>
      </div>

      <ListContainerAuthors
        :authors="authors"
        :is-edit="editMode"
      />
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters } from "vuex";
import { authorsModal } from "@/mixins/modals";
import ListContainerAuthors from "@/components/parts/biblio/ListAuthors.vue";
import { RouteNames } from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: "AuthorsPage",
  mixins: [
    authorsModal
  ],
  components: {
    PageLayout,
    ListContainerAuthors
  },
  data() {
    return {
      editMode: false,
      typeOfList: "ol"
    };
  },
  computed: {
    ...mapGetters('authors', [
      'getAuthors'
    ]),
    RouteNames () {
      return RouteNames;
    },
    authors () {
      return this.getAuthors;
    },
  },
};
</script>
