<template>
  <div class="book-form">
    <div class="book-form__input"> 
      <el-input v-model="form.author" placeholder="Автор" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.initials" placeholder="Инициалы автора" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.title" placeholder="Заглавие" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.place" placeholder="Место издания" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.publisher" placeholder="Издательство" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.year" placeholder="Год издания" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.pages" placeholder="Количество страниц" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.additionals" placeholder="Дополнительные сведения" />
    </div>
    <div class="book-form__input"> 
      <el-input v-model="form.isbn" placeholder="ISBN" />
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
          place: '',
          publisher: '',
          year: '',
          pages: '',
          additionals: '',
          isbn: ''
        }
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
