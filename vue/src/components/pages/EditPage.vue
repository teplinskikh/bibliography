<template>
  <PageLayout>
    <div class="main-block">
      <div>
        <div class="main-block-content">
          <ListContainer
              :books="books"
              :type-list="typeOfList"
              :is-edit="$route.name===RouteNames.EDIT"
          />
          <div>
            <ElSelect v-model="typeOfList" placeholder="Выберите тип списка">
              <ElOption
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </ElSelect>
          </div>
        </div>
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
    </div>
  </PageLayout>
</template>

<script>

import {mapGetters} from "vuex";
import ListContainer from "@/components/List.vue";
import {RouteNames} from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'EditPage',
  components: {
    PageLayout,
    ListContainer
  },
  data () {
    return {
      typeOfList: 'div'
    }
  },
  computed: {
    ...mapGetters('books', [
      'getBooks'
    ]),
    RouteNames () {
      return RouteNames
    },
    books () {
      return this.getBooks
    },
    options () {
      return [{
        value: "ul",
        label: "Простой список"
      }, {
        value: "ol",
        label: "Нумерованный список"
      }, {
        value: "div",
        label: "По умолчанию"
      }]
    }
  }
}
</script>
