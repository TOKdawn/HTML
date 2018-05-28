<template>
<div>
      <zheader></zheader>
    <router-view></router-view>
</div>
  
</template>
<script>
import zheader from './header/zheader'
export default {
    components:{
        zheader
    }
}
</script>
<style scoped>

</style>

