<template>
  <div class="hello">
    <h1>{{ msg }}{{title}}</h1>
    <button>点击我</button>
    <!-- <button @click="emitEvent">点击我</button> -->
    <h2>Essential Links</h2>
    <h2>Ecosystem</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  props: {
    title: String
  },
  methods: {
    // emitEvent() {
    //   this.$emit("my-event", this.msg);
    //   console.log(1111);
    //   //通过按钮的点击事件触发方法，然后用$emit触发一个my-event的自定义方法，传递this.msg数据。
    // },
    emitEvent(msg) {
      console.log("接收的数据--------->" + msg); //接收的数据--------->我是父组件中的数据
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  color: red;
}
</style>
