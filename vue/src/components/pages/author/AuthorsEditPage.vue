<template>
  <PageLayout>
    <section>
      <ListContainerAuthors
        :authors="authors"
        :is-edit="$route.name === RouteNames.AUTHORS_EDIT"
      />
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters } from "vuex";
import ListContainerAuthors from "@/components/parts/biblio/authors/ListAuthors.vue";
import { RouteNames } from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: "AuthorsEditPage",
  components: {
    PageLayout,
    ListContainerAuthors
  },
  data () {
    return {
      typeOfList: "div"
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
