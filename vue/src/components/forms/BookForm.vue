<template>
  <div class="book-form">
    <div class="book-form__input">
      <span class="book-form__label">Тип источника</span>
      <ElSelect
        :value="book.type"
        placeholder="Выбрать тип источника"
        @change="(v) => update({ type: v })"
      >
        <ElOption
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </ElSelect>
    </div>

    <div v-if="book.type">
      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.TUTORIAL ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input book-form__inner"
      >
        <div v-for="(author, index) in book.authors" :key="index" class="book-form__inner__deep">
          <ElSelect
            :value="authors[index]"
            placeholder="Выбрать автора из списка"
            @change="(id) => chooseAuthor(id, index)"
          >
            <ElOption
              v-for="author in getAuthors.filter(x => x.configIsVisible)"
              :key="author.id"
              :label="authorStringFull(author)"
              :value="author.id"
            />
          </ElSelect>

          <ElButton
            type="primary"
            icon="save"
            @click="() => removeAuthor(index)"
          >
            Удалить автора
          </ElButton>
          <AuthorForm :author="author" @change="(v) => updateAuthor(v, index)" />
        </div>
        <ElButton
          type="primary"
          icon="save"
          @click="() => addAuthor()"
        >
          Добавить автора
        </ElButton>
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.TUTORIAL ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Заголовок</span>
        <ElInput
          :value="book.title"
          placeholder="Заголовок"
          class="book-form__input__text"
          @input="(v) => update({ title: v })"
        />
      </div>

      <div v-if="book.type === sourceType.ARTICLE_CONFERENCE" class="book-form__inner">
        <div class="book-form__input">
          <span class="book-form__input__label">Название конференции</span>
          <ElInput
            :value="book.conference.naming"
            placeholder="Название конференции"
            class="book-form__input__text"
            @input="(v) => updateDeep({ naming: v }, 'conference')"
          />
        </div>
        <div class="book-form__input">
          <span class="book-form__input__label">Название и тип сборника</span>
          <ElInput
            :value="book.conference.subnaming"
            placeholder="Название и тип сборника"
            class="book-form__input__text"
            @input="(v) => updateDeep({ subnaming: v }, 'conference')"
          />
        </div>
        <div class="book-form__input">
          <span class="book-form__input__label">Город проведения</span>
          <ElInput
            :value="book.conference.city"
            placeholder="Город проведения"
            class="book-form__input__text"
            @input="(v) => updateDeep({ city: v }, 'conference')"
          />
        </div>
        <div class="book-form__input">
          <span class="book-form__input__label">Время проведения</span>
          <ElInput
            :value="book.conference.date"
            placeholder="Время проведения"
            class="book-form__input__text"
            @input="(v) => updateDeep({ date: v }, 'conference')"
          />
        </div>
        <div class="book-form__input">
          <span class="book-form__input__label">Организатор</span>
          <ElInput
            :value="book.conference.organization"
            placeholder="Организатор"
            class="book-form__input__text"
            @input="(v) => updateDeep({ organization: v }, 'conference')"
          />
        </div>
      </div>

      <div v-if="book.type === sourceType.ARTICLE_MAGAZINE" class="book-form__inner">
        <div class="book-form__input">
          <span class="book-form__input__label">Название журнала</span>
          <ElInput
            :value="book.magazine.naming"
            placeholder="Название журнала"
            class="book-form__input__text"
            @input="(v) => updateDeep({ naming: v }, 'magazine')"
          />
        </div>
        <div class="book-form__input">
          <span class="book-form__input__label">Нумерация (том, годовой номер, порядковый номер)</span>
          <ElInput
            :value="book.magazine.numeration"
            placeholder="Нумерация (том, годовой номер, порядковый номер)"
            class="book-form__input__text"
            @input="(v) => updateDeep({ numeration: v }, 'magazine')"
          />
        </div>
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.TUTORIAL ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Город издания</span>
        <ElInput
          :value="book.city"
          placeholder="Город издания"
          class="book-form__input__text"
          @input="(v) => update({ city: v })"
        />
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.TUTORIAL ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Издательство</span>
        <ElInput
          :value="book.publisher"
          placeholder="Издательство"
          class="book-form__input__text"
          @input="(v) => update({ publisher: v })"
        />
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.TUTORIAL ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Год издания</span>
        <ElInput
          :value="book.year"
          placeholder="Год издания"
          class="book-form__input__text"
          @input="(v) => update({ year: v })"
        />
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Начальная страница</span>
        <ElInput
          :value="book.pageStart"
          placeholder="Начальная страница"
          class="book-form__input__text"
          @input="(v) => update({ pageStart: v })"
        />
      </div>

      <div
        v-if="
          book.type === sourceType.ARTICLE_CONFERENCE ||
          book.type === sourceType.ARTICLE_MAGAZINE
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Конечная страница</span>
        <ElInput
          :value="book.pageEnd"
          placeholder="Конечная страница"
          class="book-form__input__text"
          @input="(v) => update({ pageEnd: v })"
        />
      </div>

      <div
        v-if="
          book.type === sourceType.TUTORIAL
        "
        class="book-form__input"
      >
        <span class="book-form__input__label">Количество страниц</span>
        <ElInput
          :value="book.pagesNum"
          placeholder="Количество страниц"
          class="book-form__input__text"
          @input="(v) => update({ pagesNum: v })"
        />
      </div>

      <div class="book-form__input"> 
        <span class="book-form__input__label">Имя фрагмента файла</span>
        <ElInput
          :value="book.fragmentFileName"
          placeholder="Имя фрагмента файла"
          class="book-form__input__text"
          @input="(v) => update({ fragmentFileName: v })"
        />
      </div>
      <div class="book-form__input">
        <span class="book-form__input__label">Имя файла</span>
        <ElInput
          :value="book.fullFileName"
          placeholder="Имя файла"
          class="book-form__input__text"
          @input="(v) => update({ fullFileName: v })"
        />
      </div>

      <!-- FOR ALL -->
      <div class="book-form__input">
        <span class="book-form__input__label">Особые отметки</span>
        <ElSelect
          :value="book.tags"
          multiple
          filterable
          allow-create
          collapse-tags
          placeholder="Особые отметки"
          @change="(v) => update({ tags: v })"
        >
          <ElOption
            v-for="tag in tagsOptions"
            :key="tag.value"
            :label="tag.label"
            :value="tag.value"
          />
        </ElSelect>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AuthorForm, { author } from "@/components/forms/AuthorForm.vue";
import { authorStringFull } from "@/const/functions";

export const TAG = {
  RINC: 'RINC',
  VAC: 'VAC',
  SCOPUS: 'SCOPUS',
  PATENT: 'PATENT',
  CONFERENCE: 'CONFERENCE',
}

export const LABEL_TAG = {
  [TAG.RINC]: 'РИНЦ',
  [TAG.VAC]: 'ВАК',
  [TAG.SCOPUS]: 'SCOPUS',
  [TAG.PATENT]: 'ПАТЕНТ',
  [TAG.CONFERENCE]: 'КОНФЕРЕНЦИЯ',
}

export const SOURCE_TYPE = {
  // BOOK: 'BOOK',
  // WEB: 'WEB',
  ARTICLE_MAGAZINE: 'ARTICLE_MAGAZINE',
  // ARTICLE_WEB: 'ARTICLE_WEB',
  ARTICLE_CONFERENCE: 'ARTICLE_CONFERENCE',
  TUTORIAL: 'TUTORIAL',
}

export const LABEL_SOURCE_TYPE = {
  // [SOURCE_TYPE.BOOK]: 'Книга',
  // [SOURCE_TYPE.WEB]: 'Сайт',
  // [SOURCE_TYPE.ARTICLE_WEB]: 'Статья на сайте',
  [SOURCE_TYPE.ARTICLE_MAGAZINE]: 'Статья в журнале',
  [SOURCE_TYPE.ARTICLE_CONFERENCE]: 'Статья в сборнике конференции',
  [SOURCE_TYPE.TUTORIAL]: 'Учебное пособие',
}

export const biblio = () => ({
  configIsVisible: true, // показывать/скрыть в списке

  type: '', // тип
  authors: [ // авторы
    author()
  ],
  title: '', // заголовок материала
  city: '', // город издания
  publisher: '', // название издателя
  year: '', // город издания

  pagesNum: '', // страниц всего
  pageStart: '', // начальная страница материала
  pageEnd: '', // конечная страница материала

  tags: [],

  conference: { // информация о конфиренции для сборника
    naming: '', // название конференции
    subnaming: '', // тип cборника
    city: '', // город проведения
    date: '', // дата/даты проведения
    organization: '' // организатор/спонсор/домен проведения
  },

  magazine: { // информация о журнале
    naming: '', // название журнала
    numeration: '', // нумерация издания (том, номер в году, порядковый номер)
  },

  fragmentFileName: '', // название фрагмента файла
  fullFileName: '', // название полного файла

})

export default {
  name: 'BookForm',
  components: {
    AuthorForm
  },
  model: {
    prop: 'book',
    event: 'change'
  },
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      authors: []
    }
  },
  computed: {
    ...mapGetters('books', [
      'getBook',
    ]),
    ...mapGetters('authors', [
      'getAuthors',
      'getAuthor'
    ]),
    sourceType () {
      return SOURCE_TYPE
    },
    typeOptions () {
      return Object.keys(SOURCE_TYPE).map(i => ({
        value: i,
        label: LABEL_SOURCE_TYPE[i]
      }))
    },
    tagsOptions () {
      return Object.keys(TAG).map(i => ({
        value: i,
        label: LABEL_TAG[i]
      }))
    }
  },
  methods: {
    authorStringFull,
    addAuthor () {
      const authors = [ ...this.book.authors ]
      authors.push(author())

      this.update({
        authors
      })
    },
    updateAuthor (author, index) {
      const authors = [ ...this.book.authors ]
      authors[index] = author

      this.update({
        authors
      })
    },
    chooseAuthor (id, index) {
      const author = this.getAuthor(id)
      const authors = [ ...this.book.authors ]
      authors[index] = { ...author }
      this.authors[index] = id

      this.update({
        authors
      })
    },
    removeAuthor (index) {
      const authors = [ ...this.book.authors ]
      authors.splice(index, 1)

      this.update({
        authors
      })
    },
    update (v) {
      this.$emit('change', {
        ...this.book,
        ...v
      })
    },
    updateDeep (v, deep) {
      this.$emit('change', {
        ...this.book,
        [deep]: {
          ...this.book[deep],
          ...v
        }
      })
    }
  }
}
</script>

<style lang="less">
.book-form {
  padding: 3px;
  margin-bottom: 5px;
  text-align: center;

  &__inner {
    background-color: #dddddd;
    padding: 5px;
    margin-bottom: 5px;

    &__deep {
      padding: 5px;
      background-color: #d2d2d2;
      margin-bottom: 5px;
    }
  }

  &__input {
    text-align: center;
    margin-bottom: 5px;
  }

  &__label {
    display: flex;
    place-content: center;
  }
}
</style>
