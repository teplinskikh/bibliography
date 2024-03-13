<template>
  <ModalComponent>
    <div class="p-16">
      <button @click="() => $emit('close')">
        Close
      </button>
      <div>
        <BookForm v-model="form" />

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
import BookForm, { biblio } from "@/components/forms/BookForm";

export default {
  name: "AuthorFormModal",
  components: {
    ModalComponent,
    BookForm
  },
  props: {
    params: Object
  },
  data () {
    return {
      form: { ...biblio() }
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
    ...mapMutations('books', [
      'addBook',
      'editBook'
    ]),
    save () {
      if (this.form.id) {
        this.editBook(this.form)
      } else {
        this.addBook(this.form)
      }

      this.$emit('close')
    }
  }
}
</script>
