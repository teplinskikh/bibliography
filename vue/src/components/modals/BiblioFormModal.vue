<template>
  <ModalComponent>
    <div class="p-16">
      <div class="information-panel">
        <h1>{{ componentName }}</h1>
        <button class="information-panel__close-button" @click="() => $emit('close')">
          ✕
        </button>
      </div>
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
  computed: {
    componentName() {
      return this.$options.name || ""
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

<style scoped lang="less">
  .information-panel {
    display: flex;
    justify-content: space-between;

    &__close-button {
      background-color: transparent;
      border: none;
      cursor: pointer;

      &:hover {
        color: @cBaseFive;
      }
    }
  }

</style>
