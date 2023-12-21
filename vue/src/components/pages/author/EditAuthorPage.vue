<template>
  <PageLayout>
    <section>
      <AuthorFormExtended />
    </section>
  </PageLayout>
</template>

<script>
import AuthorFormExtended from "@/components/forms/AuthorFormExtended.vue";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: "EditAuthorPage",
  components: {
    PageLayout,
    AuthorFormExtended,
  },
};
</script>
