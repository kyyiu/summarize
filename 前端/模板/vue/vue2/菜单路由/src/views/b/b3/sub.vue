<template>
  <div @click="jump">我是b3--sub</div>
</template>

<script>
export default {
  methods: {
    jump() {
      this.$router.push("/b/b2/sub2")
    }
  }
}
</script>

<style>

</style>