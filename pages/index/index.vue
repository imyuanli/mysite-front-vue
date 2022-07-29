<template>
  <view class="content">
    <view :class="[showLongInput?'contentBox showBlur':'contentBox']">
      <view class="time">{{dateTime}}
      </view>
      <view :class="[showLongInput?'inputBox longInput ':'inputBox shortInput']">
<!--        <view :class="['inputBox longInput ']">-->
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
    </view>
  </view>
</template>

<script>
import {get_source_list} from "../../service/service";
import Tools from '../../compontent/tools'

export default {
  components: {
    Tools,
  },
  data() {
    return {
      inputVlaue: '',
      showLongInput: false,
      dateTime:'',
      options: [{
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
      value: ''
    }
  },
  onLoad() {

    get_source_list().then((res) => {
      console.log(res)
    });
  },
  methods: {
    handleClick() {
      this.showLongInput = !this.showLongInput
    },
    getNowTime(){
      let date = new Date()
      this.dateTime = `${date.getHours()}:${date .getMinutes()}:${date.getSeconds()}`
    }
  }
}
</script>

<style>
.content {
  background-image: url("../../static/backimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 750 rpx;
  height: 100vh;
  position: relative;
}
.time{

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
  top: 220px;
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

</style>
