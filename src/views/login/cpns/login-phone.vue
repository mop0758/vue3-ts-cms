<template>
  <div class="login-account">login-phone</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const foo = ref<string>('aaa')
    return {
      foo
    }
  }
})
</script>

<style scoped></style>
