<template>
  <PageLayout>
    <section>
      <AuthorFormExtended />
    </section>
  </PageLayout>
</template>

<script>
import AuthorFormExtended from "../../forms/AuthorFormExtended.vue";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: "AddAuthorPage",
  components: {
    PageLayout,
    AuthorFormExtended,
  },
};
</script>
