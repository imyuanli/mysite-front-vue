<template>
  <view class="time">
    <span>{{ dateTime }}</span>
    <span v-show="showSeconds == 1">{{ dateSeconds }}</span>
  </view>
</template>

<script>
export default {
  name: "index",
  props:['showSeconds'],
  data(){
    return{
      dateTime: "",
      dateSeconds: "",
      timer: "",
    }
  },
  created() {
    //时间显示
    this.timer = setInterval(() => {
      this.getNowTime()
    }, 1000);
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods:{
    getNowTime() {
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      let seconds = date.getSeconds()
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      this.dateTime = `${hours}:${minutes}`
      this.dateSeconds = `:${seconds}`
    },
  }
}
</script>

<style scoped>
.time {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: .25s;
  animation: delayedFadeIn 2s;
  color: #fff;
  font-size: 32px;
  font-weight: 200;
  text-shadow: 0 0 20px rgba(0, 0, 0, .35);
}

.time:hover {
  transform: translateX(-50%) scale(1.2);
}
</style>
