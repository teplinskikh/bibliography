<template>
  <div>
    <AuthorForm v-model="form" />
    <ElButton
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
  surname: "",
  name: "",
  patronymic: "",
  configIsVisible: true
}

export default {
  name: 'AuthorFormExtended',
  components: { AuthorForm },
  data () {
    return {
      form: { ...emptyForm }
    }
  },
  computed: {
    ...mapGetters('authors', [
      'getAuthor',
    ])
  },
  mounted () {
    const id = this.$route.params.id
    this.updateFormWithAuthor(id)
  },
  methods: {
    ...mapMutations('authors', [
      'addAuthor',
      'editAuthor'
    ]),
    save () {
      const id = this.$route.params.id
      if (id !== undefined) {
        this.editAuthor({ ...this.form })
      } else {
        this.addAuthor({ ...this.form });
      }
    },
    loadAuthor (id) {
      return this.getAuthor(id)
    },
    updateFormWithAuthor (authorId) {
      if (authorId !== undefined) {
        const author = this.loadAuthor(Number(authorId))
        if (author !== undefined) {
          this.form = author
          return
        }
        this.form = { ...emptyForm }
      }
    },
  }
}
</script>
