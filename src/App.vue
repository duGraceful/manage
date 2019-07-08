<template>
  <div id="app" @mouseover="OperatingWebsite()">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentTime: new Date().getTime(),
      token: null
    }
  },
  mounted() {
    let _ = this
    _.token = window.localStorage.getItem('token')
    if (!_.token) {
      this.$router.push('/login')
    }
  },
  methods: {
    OperatingWebsite() {
      let currentTime = this.currentTime
      console.log(currentTime, 'currentTime')
      let lastTime = new Date().getTime()
      console.log(lastTime, 'lastTime')
      let timeOut = 5 * 1000 //设置时间 1分钟
      // let timeOut = 1 * 60 * 1000 //设置时间 1分钟
      if (lastTime - currentTime > timeOut) {
        console.log('*******************************************')
        // 未操作页面，跳转登录页面
        this.currentTime = new Date().getTime()
        window.localStorage.removeItem('token')

        const fullPath = this.$route.fullPath
        const query = fullPath
        // const query = this.$Base64.encode(fullPath)
        this.$router.push({
          path: '/login',
          query: {
            type: query
          }
        })
      } else {
        this.currentTime = new Date().getTime()
      }

      // const truthPathQuery = this.$route.query.type;
      // const truthPath = this.$Base64.decode(truthPathQuery); //点击登录的时候跳转这个地址
    }
  }
}
</script>

