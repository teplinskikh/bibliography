<template>
  <PageLayout>
    <section>
      <div class="settings">
        <ElUpload
            action="#"
            :limit="1"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="(file) => setFile(file)"
        >
          <ElButton type="primary">
            Импорт
          </ElButton>
        </ElUpload>
        <a
          :href="downloadRef"
          download="file.json"
        >
          <ElButton type="success">
            Экспорт
          </ElButton>
        </a>
      </div>
    </section>
  </PageLayout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'SettingsPage',
  components: {PageLayout},
  computed: {
    ...mapGetters('books', [
      'getBooks'
    ]),
    ...mapGetters('authors', [
      'getAuthors'
    ]),
    downloadRef () {
      return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        books: this.getBooks,
        authors: this.getAuthors,
      }));
    }
  },
  methods: {
    ...mapMutations('books', [
      'setBooks'
    ]),
    ...mapMutations('authors', [
      'setAuthors'
    ]),
    setFile (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { authors, books } = JSON.parse(e.target.result)
        this.setBooks(books)
        this.setAuthors(authors)
      }
      reader.readAsText(file.raw)
    }
  }
}
</script>

<style lang="less" scoped>
.settings {
  padding: 12px;
  display: flex;
  gap: 6px;
}
</style>
