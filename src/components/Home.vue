<template>
  {{ notifications }}
</template>

<script>
import globalAxios from 'axios';

export default {
  name: 'Home',
  data: () => ({
    notifications: [],
  }),
  created() {
    globalAxios.get(`http://localhost:3000/avisos`)
        .then(r => {
          this.notifications = r.data
        })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
