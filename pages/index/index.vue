<template>
  <view class="content" :style="{'backgroundImage':`url(${backgroundImage})`}">
    <view :class="[showLongInput?'contentBox showBlur':'contentBox']">
      <view class="time">
        <span>{{dateTime}}</span>
        <span v-if="showSeconds">{{dateSeconds}}</span>
      </view>
      <view :class="[showLongInput?'inputBox longInput ':'inputBox shortInput']">
        <view class="searchBar">
          <input @focus="handleClick"
                 @blur="handleClick"
                 class="input"
                 v-model="inputVlaue"
                 :placeholder="showLongInput?'':'搜索'"/>
        </view>
      </view>
      <view v-if="showLongInput ">
        <Tools />
      </view>
      <view class="reflash">
        <view @click="getBackgroundImage">
          <svg t="1659080303977" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7004" width="30" height="30"><path d="M960 416V192l-73.056 73.056a447.712 447.712 0 0 0-373.6-201.088C265.92 63.968 65.312 264.544 65.312 512S265.92 960.032 513.344 960.032a448.064 448.064 0 0 0 415.232-279.488 38.368 38.368 0 1 0-71.136-28.896 371.36 371.36 0 0 1-344.096 231.584C308.32 883.232 142.112 717.024 142.112 512S308.32 140.768 513.344 140.768c132.448 0 251.936 70.08 318.016 179.84L736 416h224z" p-id="7005" fill="#8a8a8a"></path></svg>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {get_login_code,get_background_mage} from "../../service/service";
import Tools from '../../compontent/tools'
import axios from "axios";
export default  {
  components: {
    Tools
  },
  data() {
    return {
      inputVlaue: '',
      showLongInput: false,
      options: [
          {
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶',
        disabled: true
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      //  时间
      dateTime:'',
      dateSeconds:"",
      showSeconds:false,
      timer:"",
    //壁纸
      backgroundImage:''
    }
  },
  onLoad() {
    this.getBackgroundImage()
    this.timer = setInterval(()=>{
      this.getNowTime()
    }, 1000);

  },
  methods: {
    handleClick() {
      this.showLongInput = !this.showLongInput
    },
    getNowTime(){
      let date = new Date()
      this.dateTime = `${date.getHours()}:${date.getMinutes()}`
      this.dateSeconds = `:${date.getSeconds()}`
    },
    getBackgroundImage(){
      get_background_mage().then(
          (res)=>{
            this.backgroundImage = res
          }
      )
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
}
</script>

<style>
.content {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 750 rpx;
  height: 100vh;
  position: relative;
}
.time{
  position: fixed;
  top: 120px;
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
  text-shadow: 0 0 20px rgba(0,0,0,.35);
}
.contentBox {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);
}

.showBlur {
  backdrop-filter: blur(10px);
}

.inputBox {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  width: 230px;
  max-width: 80%;
  height: 43px;
  border-radius: 30px;
  color: #fff;
  background-color: rgba(255, 255, 255, .25);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: color .25s, background-color .25s, box-shadow .25s, left .25s, opacity .25s, top .25s, width .25s;
}

.shortInput {
  width: 230px;
  color: #fff;
  background-color: rgba(255, 255, 255, .25);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  -webkit-backdrop-filter: blur(10px);
}

.searchBar {
  width: 100%;
  height: 100%;
  position: absolute;
}

.input {
  width: 100%;
  height: 100%;
  text-align: center;
}

.shortInput:hover {
  color: var(--txt-b-pure);
  background-color: rgba(255, 255, 255, .6);
  box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
  width: 530px;
}

.longInput {
  color: var(--txt-b-pure);
  background-color: rgba(255, 255, 255, .9);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  width: 530px;
}

.selectBox {
  width: 400px;
  position: fixed;
  left: 0;
  z-index: 1000;
}

.reflash{
  position: absolute;
  right: 50px;
  top: 20px;
  cursor: pointer;
}
</style>
