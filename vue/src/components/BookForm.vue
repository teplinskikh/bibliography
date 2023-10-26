<template>
  <div class="book-form">
    <div class="book-form__input">
      <el-select v-model="form.type" placeholder="Выберите тип источника">
        <el-option
          v-for="item in typeOptions" 
          :key="item.value" 
          :label="item.label" 
          :value="item.value" 
        />
      </el-select>
    </div>
    <div v-if="form.type != 'web' && form.type != ''" class="book-form__input">
      <el-input v-model="form.author" placeholder="Автор" />
    </div>
    <div v-if="form.type != 'web' && form.type != ''" class="book-form__input">
      <el-input v-model="form.initials" placeholder="Инициалы автора" />
    </div>
    <div v-if="form.type != ''" class="book-form__input">
      <el-input v-model="form.title" placeholder="Заглавие" />
    </div>
    <div v-if="form.type == 'book' || form.type == 'abstract' || form.type == 'articleBook'" class="book-form__input">
      <el-input v-model="form.city" placeholder="Город" />
    </div>
    <div v-if="form.type == 'book' || form.type == 'articleBook'" class="book-form__input">
      <el-input v-model="form.publisher" placeholder="Издательство" />
    </div>
    <div v-if="form.type != 'web' && form.type != ''" class="book-form__input">
      <el-input v-model="form.year" placeholder="Год издания" />
    </div>
    <div v-if="form.type == 'articleBook' || form.type == 'articleMagazine'" class="book-form__input">
      <el-input v-model="form.pages" placeholder="Страницы" />
    </div>
    <div v-if="form.type == 'book' || form.type == 'abstract'" class="book-form__input">
      <el-input v-model="form.pagesNum" placeholder="Количество страниц" />
    </div>
    <div v-if="form.type == 'book'" class="book-form__input">
      <el-input v-model="form.isbn" placeholder="ISBN" />
    </div>
    <div v-if="form.type == 'book'" class="book-form__input">
      <el-input v-model="form.editionNum" placeholder="Номер издания" />
    </div>
    <div v-if="form.type == 'book'" class="book-form__input">
      <el-input v-model="form.typeBook" placeholder="Тип книги" />
    </div>
    <div v-if="form.type == 'abstract'" class="book-form__input">
      <el-input v-model="form.authorTitle" placeholder="Научное звание автора" />
    </div>
    <div v-if="form.type == 'abstract'" class="book-form__input">
      <el-input v-model="form.supervisor" placeholder="Научный руководитель" />
    </div>
    <div v-if="form.type == 'abstract'" class="book-form__input">
      <el-input v-model="form.university" placeholder="Университет" />
    </div>
    <div v-if="form.type == 'articleMagazine'" class="book-form__input">
      <el-input v-model="form.magazineNum" placeholder="Номер выпуска журнала" />
    </div>
    <div v-if="form.type == 'web' || form.type == 'articleWeb'" class="book-form__input">
      <el-input v-model="form.url" placeholder="URL сайта" />
    </div>
    <div v-if="form.type == 'web' || form.type == 'articleWeb'" class="book-form__input">
      <el-input v-model="form.viewDate" placeholder="Дата обращения" />
    </div>
    <el-button type="primary" @click="() => save()">Сохранить</el-button>
  </div>
</template>

<script>
export default {
  name: 'BookForm',
  data () {
    return {
      form: {
        author: '',
        initials: '',
        title: '',
        city: '',
        publisher: '',
        year: '',
        pages: '',
        pegesNum: '',
        isbn: '',
        editionNum: '',
        typeBook: '',
        authorTitle: '',
        supervisor: '',
        university: '',
        magazineNum: '',
        url: '',
        viewDate: '',
        type: ''
      }
    }
  },
  computed: {
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
        label: "Сататья из журнала"
      }, {
        value: "web",
        label: "Cайты в сети"
      }, {
        value: "articleWeb",
        label: "Статья с сайта"
      }]
    }
  },
  methods: {
    save () {
      console.log(this.form)
    }
  }
}
</script>

<style scoped lang="less">
.book-form {
  padding: 3px;
  margin-bottom: 5px;

  &__input {
    margin-bottom: 5px;
  }
}
</style>
