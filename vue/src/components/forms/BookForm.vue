<template>
  <div class="book-form">
    <div class="book-form__input">
      <ElSelect v-model="form.type" placeholder="Выберите тип источника">
        <ElOption
          v-for="item in typeOptions" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value" 
        />
      </ElSelect>
    </div>
    <div v-if="form.type !== 'web' && form.type !== ''" class="book-form__input">
      <div v-for="(item, index) in form.authors" :key="index" >
        <ElSelect v-model="authors[index]"  @change="(id) => chooseAuthor(id, index)" value-key="id" placeholder="Выберите автора из выпадающего списка">
          <ElOption
            v-for="author in getAuthors.filter(x => x.configIsVisible)" 
            :key="author.id" 
            :label="`${author.surname} ${author.name} ${author.patronymic}`" 
            :value="author.id" 
          />
      </ElSelect>
        <AuthorForm v-model="form.authors[index]" :index="index" />
      </div>
      <ElButton
          type="primary"
          icon="save"
          @click="() => addAuthor()"
      >
        Добавить автора
      </ElButton>
    </div>
    <div v-if="form.type !== ''" class="book-form__input">
      <span class="book-form__input__label">Заглавие</span>
      <ElInput
          v-model="form.title"
          placeholder="Введите заглавие"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book' || form.type === 'abstract' || form.type === 'articleBook'" class="book-form__input">
      <span class="book-form__input__label">Город</span>
      <ElInput
          v-model="form.city"
          placeholder="Укажите город"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book' || form.type === 'articleBook'" class="book-form__input">
      <span class="book-form__input__label">Издательство</span>
      <ElInput
          v-model="form.publisher"
          placeholder="Укажите издательство"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type !== 'web' && form.type !== ''" class="book-form__input">
      <span class="book-form__input__label">Год издания</span>
      <ElInput
          v-model="form.year"
          placeholder="Введите год издания"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'articleBook' || form.type === 'articleMagazine'" class="book-form__input">
      <span class="book-form__input__label">Страницы</span>
      <ElInput
          v-model="form.pages"
          placeholder="Укажите количество страницы"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book' || form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Количество страниц</span>
      <ElInput
          v-model="form.pagesNum"
          placeholder="Укажите количество страницы"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book'" class="book-form__input">
      <span class="book-form__input__label">ISBN</span>
      <ElInput
          v-model="form.isbn"
          placeholder="ISBN"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book'" class="book-form__input">
      <span class="book-form__input__label">Номер издания</span>
      <ElInput
          v-model="form.editionNum"
          placeholder="Укажите номер издания"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'book'" class="book-form__input">
      <span class="book-form__input__label">Тип книги</span>
      <ElInput
          v-model="form.typeBook"
          placeholder="Тип книги"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Полные инициалы автора</span>
      <ElInput
          v-model="form.fullInitials"
          placeholder="Укажите полные инициалы автора"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Научная специальность</span>
      <ElInput
          v-model="form.scientificSpecialty"
          placeholder="Укажите научную специальность"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Научное звание автора</span>
      <ElInput
          v-model="form.authorTitle"
          placeholder="Укажите научное звание автора"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Научный руководитель</span>
      <ElInput
          v-model="form.supervisor"
          placeholder="Научный руководитель"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'abstract'" class="book-form__input">
      <span class="book-form__input__label">Университет</span>
      <ElInput
          v-model="form.university"
          placeholder="Университет"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type == 'articleBook' || form.type == 'articleMagazine' || form.type == 'articleWeb'" class="book-form__input">
      <span class="book-form__input__label">Название источника сатьи</span>
      <ElInput
          v-model="form.originName"
          placeholder="Укажите название источника статьи"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'articleMagazine'" class="book-form__input">
      <span class="book-form__input__label">Номер выпуска журнала</span>
      <ElInput
          v-model="form.magazineNum"
          placeholder="Укажите номер выпуска журнала"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'web' || form.type === 'articleWeb'" class="book-form__input">
      <span class="book-form__input__label">URL сайта</span>
      <ElInput
          v-model="form.url"
          placeholder="URL сайта"
          class="book-form__input__text"
      />
    </div>
    <div v-if="form.type === 'web' || form.type === 'articleWeb'" class="book-form__input">
      <span class="book-form__input__label">Дата обращения</span>
      <ElInput
          v-model="form.viewDate"
          placeholder="Дата обращения"
          class="book-form__input__text"
      />
    </div>
    <ElButton
        v-if="form.type !== ''"
        type="primary"
        icon="save"
        @click="() => save()"
    >
      Сохранить
    </ElButton>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import AuthorForm from "@/components/forms/AuthorForm.vue";

const emptyForm = {
  authors: [
    {
      surname: "",
      name: "",
      patronymic: ""
    }
  ],
  title: '',
  city: '',
  publisher: '',
  year: '',
  pages: '',
  pagesNum: '',
  isbn: '',
  editionNum: '',
  typeBook: '',
  authorTitle: '',
  supervisor: '',
  university: '',
  fullInitials: '',
  scientificSpecialty: '',
  originName: '',
  magazineNum: '',
  url: '',
  viewDate: '',
  type: '',
  configIsVisible: true
}

export default {
  name: 'BookForm',
  components: {AuthorForm},
  data () {
    return {
      form: { ...emptyForm },
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
    typeOptions () {
      return [{
        value: "book",
        label: "Книга с одним автором"
      }, {
        value: "abstract",
        label: "Диссертации и авторефераты"
      }, {
        value: "articleBook",
        label: "Статья из книги"
      }, {
        value: "articleMagazine",
        label: "Статья из журнала"
      }, {
        value: "web",
        label: "Cайты в сети"
      }, {
        value: "articleWeb",
        label: "Статья с сайта"
      }]
    }
  },
  mounted () {
    // Перезагружать форму после обновления страницы значениями из хранилища
    const id = this.$route.params.id
    this.updateFormWithBook(id)
  },
  methods: {
    ...mapMutations('books', [
      'addBook',
      'editBook'
    ]),
    save () {
      const id = this.$route.params.id
      if (id !== undefined) {
        this.editBook(id)
      } else {
        this.addBook({...this.form});
      }
    },
    loadBook(id) {
      return this.getBook(id)
    },
    // Обновить форму значениями книги с bookId
    updateFormWithBook(bookId) {
      if (bookId !== undefined) {
        const book = this.loadBook(Number(bookId))
        if (book !== undefined) {
          this.form = book
          return
        }
      }
      // Если книга не найдена, но требуется обновить форму,
      // то она обновляется дефолтным значением
      this.form = { ...emptyForm }
    },
    addAuthor () {
      this.form.authors.push({
        name: '',
        initials: ''
      })
    },
    chooseAuthor (id, index) {
      const author = this.getAuthor(id)
      this.form.authors[index] = { ...author }
    }
  }
}
</script>

<style lang="less">
.book-form {
  padding: 3px;
  margin-bottom: 5px;
  text-align: center;

  &__input {
    text-align: center;
    margin-bottom: 5px;

    &__label {
      display: flex;
      place-content: center;
    }

    &__text {
      width: 500px;
      padding-bottom: 5px;
    }
  }
}
</style>
