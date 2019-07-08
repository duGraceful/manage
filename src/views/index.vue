<template>
  <div>
    <p>nihaoya</p>
    <hello-world ref="child" title="jjjjww222"></hello-world>
    <button @click="getMyEvent">点击父组件</button>
  </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld'
import { SellerLoginIn } from '@/common/api/common'
export default {
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'wwwwww'
    }
  },
  mounted() {
    this.getLogin()
  },
  methods: {
    getLogin() {
      SellerLoginIn({})
        .then(res => {})
        .catch(e => {})
    },
    // getMyEvent(msg) {
    //   console.log("接收的数据--------->" + msg); //接收的数据--------->我是子组件中的数据
    // },
    getMyEvent() {
      this.$refs.child.emitEvent(this.msg)
      //调用子组件的方法，child是上边ref起的名字，emitEvent是子组件的方法。
    }
  }
}
</script>
<style lang="sass">

</style>


