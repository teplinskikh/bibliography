<template>
  <div>
    <div class="main-block">
      <div class="main-block-content">
        <ListContainer :books="books" :type-list="typeOfList" />
        <div>
          <el-select v-model="typeOfList" placeholder="Выберите тип списка">
            <el-option
              v-for="item in options" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <RouterView />
    <ModalContainer />
    <BookForm />
  </div>
</template>

<script>
import ModalContainer from "@/components/parts/ModalContainer";
import ListContainer from "@/components/List.vue";
import BookForm from "@/components/BookForm.vue";

export default {
  components: {
    ModalContainer,
    BookForm,
    ListContainer
  },
  data() {
    return {
      typeOfList: 'div',
      options: [{
        value: "ul",
        label: "Простой список"
      }, {
        value: "ol",
        label: "Нумерованный список"
      }, {
        value: "div",
        label: "По умолчанию"
      }],
      books: [
        { id: 1, title: "A", author: "a" },
        { id: 2, title: "B", author: "b" },
        { id: 3, title: "C", author: "c" },
        { id: 4, title: "D", author: "d" }
      ]
    }
  }
}
</script>

<style lang="less">
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;700&display=swap');

.main-block {
  display: flex;
  justify-content: center;

  &-content {
    background-color: @cBaseOne;
  }
}

body {
  margin: 0;
  padding: 0;
  background-color: @cBaseTwo;
}

a {
  text-decoration: none;
}

section {
  background-color: @cBaseOne;
  margin-bottom: 20px;
  border-radius: 2px;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 0;
  }
}

h1, h2, h3, h4, h5 {
  font-family: @ffOne;
  color: @cBaseThree;
  margin: 0;
}

h2 {
  font-size: 32px;
}

.p-16 {
  padding: 16px;
}

.d-flex {
  display: flex;
}

.rcms {

  &-divider {

    &-h {
      width: 100%;
      height: @sizeBorderDefault;
      background-color: @cBaseTwo;
    }

    &-v {

    }
  }

  &-loading {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 1;
      background: rgba(100, 100, 100, 0.5);
      cursor: wait;
    }
  }
}
</style>
