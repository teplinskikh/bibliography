<template>
  <PageLayout>
    <div class="main-block">
      <RouterLink v-if="$route.name === RouteNames.HOME" :to="{ name: RouteNames.EDIT } ">
        <div class="main-block-navigation">
          <ElButton type="primary" class="main-block-navigation">Режим редактирования</ElButton>
        </div>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.HOME" :to="{ name: RouteNames.HOME } ">
        <div class="main-block-navigation">
          <ElButton type="primary" class="main-block-navigation">На главную</ElButton>
        </div>
      </RouterLink>
    </div>
    <BookForm />
  </PageLayout>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import {RouteNames} from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'EditBookPage',
  components: {
    PageLayout,
    BookForm
  },
  computed: {
    RouteNames () {
      return RouteNames
    }
  }
}
</script>
