<template>
  <button @click="jump">jump</button>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push('/a/suba')
    }
  }
}
</script>

<style>

</style>