<template>
  <div class="page">
    <div class="page__navigation">
      <RouterLink v-if="$route.name !== RouteNames.HOME" :to="{ name: RouteNames.HOME } ">
        <ElButton type="primary">Список</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name === RouteNames.HOME" :to="{ name: RouteNames.EDIT } ">
        <ElButton type="primary">Редактирование</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.BOOK_ADD" :to="{ name: RouteNames.BOOK_ADD } ">
        <ElButton type="primary">Добавить источник</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.AUTHORS" :to="{ name: RouteNames.AUTHORS } ">
        <ElButton type="primary">Список Авторов</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.AUTHORS_EDIT" :to="{ name: RouteNames.AUTHORS_EDIT } ">
        <ElButton type="primary">Редактирование Авторов</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.AUTHOR_ADD" :to="{ name: RouteNames.AUTHOR_ADD } ">
        <ElButton type="primary">Добавить автора</ElButton>
      </RouterLink>
      <RouterLink v-if="$route.name !== RouteNames.SETTINGS" :to="{ name: RouteNames.SETTINGS } ">
        <ElButton type="primary">Настройки</ElButton>
      </RouterLink>
    </div>
    <slot />
  </div>
</template>

<script>
import {RouteNames} from "@/router/routes";

export default {
  name: 'PageLayout',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    RouteNames () {
      return RouteNames
    }
  }
}
</script>

<style scoped lang="less">
.page {
  margin: 0 auto;
  padding: 20px 34px;
  min-height: 100vh;
  overflow: auto;
  box-sizing: border-box;
  max-width: 1000px;

  &__navigation {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
  }
}
</style>
