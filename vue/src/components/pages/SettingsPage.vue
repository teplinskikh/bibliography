<template>
  <PageLayout>
    <div class="main-block">
      <div class="main-block-buttons">
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
            class="el-button el-button--success"
            download="file.json"
            type="primary"
        >
          <span>Экспорт</span>
        </a>
      </div>
    </div>
  </PageLayout>
</template>

<script>
import {mapMutations} from "vuex";
import PageLayout from "@/components/parts/PageLayout.vue";

export default {
  name: 'SettingsPage',
  components: {PageLayout},
  computed: {
    downloadRef () {
      return "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.books));
    }
  },
  methods: {
    ...mapMutations('books', [
      'setBooks'
    ]),
    setFile (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.setBooks(JSON.parse(e.target.result));
      }
      reader.readAsText(file.raw);
    }
  }
}
</script>