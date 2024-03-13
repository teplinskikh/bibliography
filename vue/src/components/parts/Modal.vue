<template>
  <div class="modal__wrapper">
    <div class="modal">
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalRCMS"
}
</script>

<style scoped lang="less">
.modal {
  max-height: 100vh;
  width: 100%;
  padding: 20px;
  overflow: auto;
  box-sizing: border-box;

  &__wrapper {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.25);
  }

  &__content {
    background: #EBEEF2;
    border-radius: 5px;
    overflow: hidden;
    max-width: 800px;
    margin: 0 auto;
  }
}
</style>
