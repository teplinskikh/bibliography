<template>
  <ModalComponent>
    <div class="p-16">
      <button @click="() => $emit('close')">
        Close
      </button>
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
    </div>
  </ModalComponent>
</template>

<script>
import { mapMutations } from "vuex";
import ModalComponent from "@/components/parts/Modal";
import AuthorForm, { author } from "@/components/forms/AuthorForm";

export default {
  name: "AuthorFormModal",
  components: {
    ModalComponent,
    AuthorForm
  },
  props: {
    params: Object
  },
  data () {
    return {
      form: { ...author() }
    }
  },
  mounted () {
    if (this.params && this.params.form) {
      this.form = {
        ...this.form,
        ...this.params.form
      }
    }
  },
  methods: {
    ...mapMutations('authors', [
      'addAuthor',
      'editAuthor'
    ]),
    save () {
      if (!this.form.surname) {
        alert('Обязательные поля: Фамилия, Имя')
        return
      }

      if (this.form.id) {
        this.editAuthor(this.form)
      } else {
        this.addAuthor(this.form)
      }

      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
