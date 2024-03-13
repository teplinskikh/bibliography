<template>
  <PageLayout>
    <section>
      <div class="navigation">
        <h2 class="flex-1">
          Список источников
        </h2>
        <ElSelect v-model="typeOfList" size="small" placeholder="Выберите тип списка">
          <ElOption
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElSwitch
          v-model="editMode"
          active-text="Режим редактирования"
        />
        <ElButton
          type="primary"
          size="small"
          @click="() => openNewBiblioModal()"
        >Добавить источник</ElButton>
      </div>
      <div class="order">
        <div class="order--sort">
          <span>Сортировать по: </span>
          <ElSelect 
            v-model="typeOfSort" 
            size="small" 
            placeholder="Выберите тип сортировки" 
            @change="() => sortBooks(typeOfSort)"
          >
            <ElOption
              v-for="item in sort"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>
        <div class="order--filter">
          <span>Фильтровать по: </span>
          <ElSelect 
            v-model="typeOfFilter" 
            size="small" 
            placeholder="Выберите тип фильтрации" 
            @change="() => tags.push({name: typeOfFilter})"
            >
              <ElOption
                v-for="item in filters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
          </ElSelect>
          <el-tag
            v-for="tag in tags"
            :key="tag.name"
            closable
            :type="tag.type"
            @close="() => tags.splice(tags.indexOf(tag), 1)"
            >
            {{filters.find((filter) => filter.value == tag.name).label}}
          </el-tag>
        </div>
      </div>
      <ListContainer
        :books="books"
        :type-list="editMode ? 'div' : typeOfList"
        :is-edit="editMode"
      />
    </section>
  </PageLayout>
</template>

<script>
import {mapGetters} from "vuex";
import { biblioModal } from "@/mixins/modals";
import ListContainer from "@/components/parts/biblio/List.vue";
import {RouteNames} from "@/router/routes";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'HomePage',
  mixins: [
    biblioModal
  ],
  components: {
    PageLayout,
    ListContainer
  },
  data () {
    return {
      editMode: false,
      typeOfList: 'ol',
      typeOfSort: '',
      sortFunc: null,
      typeOfFilter: [],
      tags: []
    }
  },
  computed: {
    ...mapGetters('books', [
      'getBooks',
      'getOrderedBooks',
    ]),
    RouteNames () {
      return RouteNames
    },
    books () {
      if(this.typeOfSort != '' || this.tags.length != 0) {
        return this.getOrderedBooks(this.sortFunc, this.tags)
      }
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
    },
    sort () {
      return [{
        value: "type",
        label: "По типу источника"
      },
      {
        value: "author",
        label: "По фамилии первого автора"
      },
      {
        value: "name",
        label: "По названию источника"
      },
      {
        value: "year",
        label: "По году публикации"
      },
      ]
    },
    filters () {
      return [{
        value: "ARTICLE_MAGAZINE",
        label: "Статья в журнале"
      },
      {
        value: "ARTICLE_CONFERENCE",
        label: "Статья в сборнике конференции"
      },
      {
        value: "TUTORIAL",
        label: "Учебное пособие"
      },
    ]
    },
    sortFunctions () {
      return {
        type: (a, b) => {
          const order = {
            'TUTORIAL': 1,
            'ARTICLE_MAGAZINE': 2,
            'ARTICLE_CONFERENCE': 3
          };
          return order[a.type] - order[b.type];
        },
        author: (a, b) => a.authors[0].surname.localeCompare(b.authors[0].surname),
        name: (a, b) => a.type.localeCompare(b.type),
        year: (a, b) => a.year - b.year
      }
    }
  },
  methods: {
    sortBooks (type) {
      this.sortFunc = this.sortFunctions[type]
    }
  }
}
</script>

<style lang="less" scoped>
.order {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  &--sort {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 10px;
  }
  &--filter {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    padding: 10px;
  }
}
</style>
