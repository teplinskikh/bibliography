<template>
  <div class="page">
    <div class="page__navigation">
      <RouterLink :to="{ name: RouteNames.HOME } ">
        <ElButton type="primary" :plain="$route.name !== RouteNames.HOME">Список источников</ElButton>
      </RouterLink>
      <RouterLink :to="{ name: RouteNames.AUTHORS } ">
        <ElButton type="primary" :plain="$route.name !== RouteNames.AUTHORS">Список авторов</ElButton>
      </RouterLink>
      <RouterLink :to="{ name: RouteNames.SETTINGS } ">
        <ElButton type="primary" :plain="$route.name !== RouteNames.SETTINGS">Настройки</ElButton>
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
