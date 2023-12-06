<template>
  <PageLayout>
    <section>
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
      <ListContainer
        :books="books"
        :type-list="typeOfList"
        :is-edit="$route.name===RouteNames.EDIT"
      />
    </section>
  </PageLayout>
</template>

<script>

import {mapGetters} from "vuex";
import ListContainer from "@/components/parts/biblio/List.vue";
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
