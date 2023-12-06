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
import { helpModal } from "@/mixins/modals";
import ListContainer from "@/components/parts/biblio/List.vue";
import {RouteNames} from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'HomePage',
  mixins: [helpModal],
  components: {
    PageLayout,
    ListContainer
  },
  data () {
    return {
      typeOfList: 'ol'
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
        value: "ol",
        label: "Нумерованный список"
      }, {
        value: "ul",
        label: "Простой список"
      }, {
        value: "div",
        label: "Блочный список"
      }]
    }
  }
}
</script>
