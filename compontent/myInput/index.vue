<template>
  <view @click="handleClickOpen" :class="['searchBar',showLongInput?'longInput ':'shortInput']">
    <input
        @keydown.enter="searchData"
        class="input"
        v-model="inputValue"
        :placeholder="showLongInput?'':'搜索'"/>
    <el-popover
        placement="bottom"
        width="100"
        trigger="click"
        v-model="popoverVisible">
      <view class="search-menu">
        <view @click="selectEngines(item,index)" class="menu-item" v-for="(item,index) in searchEngines">
          <img class="menu-img" :src="item.icon" alt="">
          <span>{{ item.name }}</span>
        </view>
        <!--              <view class="menu-item" @click="addSearchEngines">-->
        <!--                <i class="menu-icon el-icon-plus"></i>-->
        <!--                <span>添加搜索引擎</span>-->
        <!--              </view>-->
      </view>
      <view @click="!popoverVisible" slot="reference" v-show="showLongInput" class="search-item search-type">
        <img class="search-item-img" :src="searchEngines[default_search].icon" alt="">
      </view>
    </el-popover>
    <view @click="searchData" v-show="showLongInput" class="search-item search-icon-box">
      <i class="search-icon el-icon-search"></i>
    </view>
  </view>
</template>

<script>
import {update_search_engines} from "../../service/service";
import store from "store";

export default {
  name: "index",
  props: ['showLongInput','default_search_index', 'handleClickOpen'],
  data() {
    return {
      inputValue: '',
      popoverVisible: false,
      searchEngines: [
        {
          name: "百度",
          target: "https://www.baidu.com/s?wd=",
          icon: 'https://www.baidu.com/favicon.ico'
        },
        {
          name: "必应",
          target: "https://cn.bing.com/search?q=",
          icon: 'https://www.jianfast.com/static/home/images/searchChoice/bing.svg'
        },
        {
          name: "谷歌",
          target: "https://www.google.com/search?q=",
          icon: 'https://www.jianfast.com/static/home/images/searchChoice/google.svg'
        },
        {
          name: "360",
          target: "https://www.so.com/s?q=",
          icon: 'https://s2.ssl.qhimg.com/static/121a1737750aa53d.ico'
        },
        {
          name: "搜狗",
          target: "https://www.sogou.com/web?query=",
          icon: 'https://www.sogou.com/images/logo/new/favicon.ico'
        },
      ],
      selectTarget: "https://www.baidu.com/s?wd=",
      default_search:this.default_search_index
    }
  },
  created(){
    this.selectTarget = this.searchEngines[this.default_search].target
  },
  methods: {
    searchData() {
      let value = ""
      value = this.inputValue.replaceAll('&', '%26')
      value = this.inputValue.replaceAll('#', '%23')
      window.location.href = this.selectTarget + value
    },
    selectEngines(item, index) {
      this.selectTarget = item.target
      this.default_search = index
      this.popoverVisible = false
      if (store.get('token')) {
        update_search_engines({default_search: this.default_search})
      }
    },
  },
  watch:{
    default_search_index(value){
      if (value) {
        this.default_search = this.default_search_index
      }
    }
  }
}
</script>

<style scoped>
.searchBar {
  position: absolute;
  top: 180px;
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.shortInput {
  width: 230px;
  color: #fff;
  background-color: rgba(255, 255, 255, .25);
  box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
  -webkit-backdrop-filter: blur(10px);
}

.input {
  outline: 0;
  border: none;
  width: 80%;
  height: 100%;
  color: inherit;
  background-color: transparent;
  font-size: 14px;
  font-family: "Microsoft Yahei Light", "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif;
  text-align: center;
}

.shortInput:hover {
  color: black;
  background-color: rgba(255, 255, 255, .6);
  box-shadow: rgb(0 0 0 / 30%) 0 0 10px;
  width: 530px;
}

.longInput {
  color: black;
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

.search-item {
  /*pointer-events: none;*/
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 2px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: .25s;
  text-align: center;
}

.search-item-img {
  width: 28px;
  height: auto;
}

.search-type {
  left: 10px;
  color: rgba(0, 0, 0, .5);
}

.search-icon-box {
  right: 10px;
  color: #70C000;
}

.search-item:hover {
  border-radius: 50px;
  background-color: #fff;
  filter: brightness(1.1);
}

.search-icon {
  font-size: 20px;
}

.menu-item {
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
}

.menu-item:hover {
  background-color: rgba(0, 0, 0, .1);
}

.menu-icon {
  margin-right: 15px;
  font-size: 14px;
}

.menu-img {
  width: 14px;
  height: 14px;
  margin-right: 15px;
}
</style>
