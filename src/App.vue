<script setup lang="ts">

</script>

<template>
  <h1 class="container">You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <span class="w-32 h-32 bg-red-500"> documentation  </span>
  <a-button type="primary">Primary Button</a-button>
</template>

<style lang="scss" scoped>
$primary-color: #42b983;
.container {
  color: $primary-color;
  padding: 20px;

  .title {
    font-size: 18px;
  }
}
</style>
