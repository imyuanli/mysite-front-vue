<template>
<view>
  <view class="toolBox">
    <view :class="[shortcuts_list.length ==0?'carouselBox':'carouselBox noCenter']">
      <view class="item">
        <view @click="handleOpen" class="itemBox">
          <svg t="1659162445218" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="21360" width="48" height="48">
            <path
                d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"
                p-id="21361" fill="#f7f6f6"></path>
          </svg>
        </view>
        添加快捷访问
      </view>
      <view v-for="(items,index) in shortcuts_list"
            draggable="true"
            @dragenter="handleDragEnter($event, items,index)"
            @dragend="handleDragEnd($event, items,index)"
            class="item"
            :class="{active:enterIndex===index}"
      >
        <view @contextmenu.prevent="rightClick($event,items,index)" class="itemBox" @click="redirectToUrl(items.url)">
          <view v-if="items.iconObj.isText">
            {{ items.iconObj.data.substring(0,5)}}
          </view>
          <view v-if="!items.iconObj.isText">
            <img class="edit-icon" :src="items.iconObj.data" alt="">
          </view>
        </view>
        <span class="item-title">{{ items.title }}</span>
      </view>
    </view>
    <el-dialog
        title="编辑网站捷径"
        :visible.sync="dialogVisible"
        width="90%"
        style="margin-top: 0"
        :modal="false"
        :close-on-click-modal=false
        :before-close="handleClose"
    >
      <view class="dialog-content" v-loading="loading">
        <view class="edit-box">
          <span class="edit-title">网址</span>
          <input class="edit-input" v-model="url" placeholder="输入或粘贴网址Url"/>
        </view>
        <view class="edit-box">
          <span class="edit-title">名称</span>
          <input class="edit-input" v-model="title" placeholder="输入标题，不填写将自动获取"/>
        </view>
        <view class="edit-box">
          <span class="edit-title">图标</span>
          <view class="edit-icon-box">
            <span v-if="isText" style="font-size:12px ">{{title.substring(0,5)}}</span>
            <img v-if="!isText" class="edit-icon" :src="icon" alt="">
          </view>
          <view class="edit-btn-box">
            <view class="edit-btn" @click="getUrlIcon">
              智能
            </view>
            <view class="edit-btn" @click="changeText">
              文字
            </view>
            <view class="edit-btn" @click="changeDefault">
              默认
            </view>
          </view>
        </view>
      </view>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button v-if="!isUpdate" type="primary" @click="addShortcuts(false)" :loading="btnLoading">确 定</el-button>
    <el-button  v-if="isUpdate" type="primary" @click="addShortcuts(true)" :loading="btnLoading">更 新</el-button>
  </span>
    </el-dialog>
  </view>
  <view v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
    <view class="menu" @click="toolItemEdit">
      <i class="menu-icon el-icon-edit"></i>
      <span>编辑</span>
    </view>
    <view class="menu" @click="toolItemDel">
      <i class="menu-icon el-icon-delete"></i>
      <span>删除</span>
    </view>
  </view>
</view>
</template>

<script>
import {get_url_icon, get_url_title, update_shortcuts} from "../../service/service";
import {isLogin} from "../../utils/utils";
import store from 'store'
export default {
  name: "Tools",
  props: {
    shortcuts_list: {
      type: Array,
    }
  },
  data() {
    return {
      enterIndex: "",
      // startDrag:false,
      dialogVisible: false,
      url: '',
      title: '',
      defaultIcon: 'https://www.jianfast.com/static/home/images/defaultsicon/null.png',
      iconObj: {
        data: "",
        isText: false
      },
      icon: 'https://www.jianfast.com/static/home/images/defaultsicon/null.png',
      isText: false,
      loading:false,
      btnLoading:false,
      visible: false,
      top: 0,
      left: 0,
      rightClickItem:'',
      rightClickIndex:'',
      isUpdate:false
    }
  },
  methods: {
    handleDragEnd(e, item, index) {
      let enterIndex = this.enterIndex
      let tempOption = this.toolsArr[index];
      this.$set(this.toolsArr, index, this.toolsArr[enterIndex]);
      this.$set(this.toolsArr, enterIndex, tempOption)
      this.enterIndex = null
    },
    handleDragEnter(e, item, index) {
      this.enterIndex = index
    },
    handleClose() {
      this.dialogVisible = false
      this.isUpdate = false
    },
    handleOpen() {
      isLogin()
      if(store.get('token')){
        this.isText = false
        this.dialogVisible = true
        this.url = ""
        this.title = ""
        this.icon = 'https://www.jianfast.com/static/home/images/defaultsicon/null.png'
        this.changeIconObj(this.defaultIcon, false)
      }
    },
    getUrlIcon() {
      if(!this.url){
        this.$message({
          showClose: true,
          message: '网址不能为空',
          type: 'warning'
        });
        return;
      }
      if(!this.CheckUrl(this.url)){
        this.$message({
          showClose: true,
          message: '可能需要添加http://或https://,也可能网址有误',
          type: 'warning'
        });
        return;
      }
      this.loading = true
      //  智能获取icon
      this.isText = false
      get_url_icon({domain: this.url}).then(
          (res) => {
            if(res){
              this.icon = res
              this.loading = false
            }
          }
      )
    },
    CheckUrl(url){
      try{
        new URL(url);
        return true;
      }catch(err){
        return false
      }
    },
    changeText() {
      if(!this.url){
        this.$message({
          showClose: true,
          message: '网址不能为空',
          type: 'warning'
        });
        return;
      }
      if(!this.CheckUrl(this.url)){
        this.$message({
          showClose: true,
          message: '可能需要添加http://或https://,也可能网址有误',
          type: 'warning'
        });
        return;
      }
      this.isText = true

      get_url_title({domain: this.url}).then(
          (res)=>{
            if(!this.title){
              this.title = res
            }
          }
      )
    },
    changeDefault() {
      this.isText = false
      this.icon = this.defaultIcon
    },
    //整合数据
    changeIconObj(data, isText) {
      this.iconObj = {...this.iconObj, ...{data, isText}}
    },
    async addShortcuts(isUpdate) {
      this.btnLoading = true
      if(!this.url){
        this.$message({
          showClose: true,
          message: '网址不能为空',
          type: 'warning'
        });
        return;
      }
      if(!this.CheckUrl(this.url)){
        this.$message({
          showClose: true,
          message: '可能需要添加http://或https://,也可能网址有误',
          type: 'warning'
        });
        this.timer = setTimeout(()=>{
          this.btnLoading = false
        },2000)
        return;
      }
      let obj = {}
      obj.url = this.url
      //如果title是空的那就调用这个接口
      if(!this.title){
         await get_url_title({domain: this.url}).then(
            (res)=>{
              if(res){
                this.title = res
              }
            }
        )
      }
      obj.title = this.title
      let text = this.title.substring(0, 5);
      if (this.isText) {
        this.changeIconObj(text, true)
      } else {
        this.changeIconObj(this.icon, false)
      }
      obj.iconObj = this.iconObj
      if(isUpdate){
        this.$set(this.shortcuts_list,this.rightClickIndex,obj)
      }else{
        this.shortcuts_list.push(obj)
      }
      this.updateShortcuts()
      this.dialogVisible = false
      this.isUpdate = false
    },
    updateShortcuts(){
      update_shortcuts({shortcuts_list:JSON.stringify(this.shortcuts_list)}).then(
          (res)=>{
            if(res){
              this.url = ""
              this.title = ""
              this.iconObj = ""
              this.icon= this.defaultIcon
              this.btnLoading = false
            }
          }
      )
    },
    redirectToUrl(url){
      window.open(url)
    },
    rightClick(e,item,index) {
      this.rightClickItem = item;
      this.rightClickIndex = index;
      var x = e.pageX;
      var y = e.pageY;
      this.top = y;
      this.left = x;
      this.visible = true;
    },
    closeMenu() {
      this.visible = false;
    },
    toolItemEdit(){
      const {url,title,iconObj} = this.rightClickItem
      this.dialogVisible = true
      this.url = url
      this.title = title
      this.icon = iconObj.data
      this.isText = iconObj.isText
      this.isUpdate = true
    },
    toolItemDel(){
      this.shortcuts_list.splice(this.rightClickIndex,1)
      this.updateShortcuts()
    }
  },
  watch: {
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    },
  },
  destroyed(){
    clearTimeout( this.timer)
  }
}
</script>

<style scoped>
.toolBox {
  position: absolute;
  margin-top: 230px;
  left: 50%;
  transform: translateX(-50%);
  max-width: 800px;
  width: 100%;
  height: calc(100vh - 330px);
  overflow: hidden;
  transition: .25s;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.carouselBox {
  max-height: 100%;
  max-width: 100%;
  color: #fff;
  overflow-y: auto;
  transition: .25s;
  margin: 0 auto;
  padding: 2px;
  width: 100%;
  display: grid;
  justify-content: center;
  height: 100%;
  align-items: start;
}

.noCenter {
  grid-template-columns: repeat(auto-fill, 120px);
  height: unset;
}

.carouselBox::-webkit-scrollbar {
  display: none
}

.itemBox {
  position: relative;
  /*display: inline-block;*/
  width: 80px;
  height: 80px;
  margin: 20px 26px 10px;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: background-color .35s;
  background-color: rgba(225, 225, 225, .5);
  backdrop-filter: blur(30px);
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
}

.itemBox {
  -webkit-backdrop-filter: blur(30px) !important;
  backdrop-filter: blur(30px) !important;
}

.item-title {

  color: #fff;
  font-size: 12px;

  overflow: hidden;

  text-align: center;
  text-overflow: ellipsis;
  transition: .25s;
  white-space: nowrap;
  width: 90%;
}

.itemBox:hover {
  background-color: rgba(225, 225, 225, .9);
}

@media screen and (max-width: 350px) {
  .itemBox {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 500px) {
  .itemBox {
    height: 50px;
    width: 50px;
  }

  /*.carouselBox {*/
  /*  grid-template-columns: repeat(auto-fill, 90px);*/
  /*}*/
}

@media screen and (max-width: 350px) {
  .itemBox {
    margin-bottom: 20px;
  }
}

@media screen and (max-width: 600px) {
  .itemBox {
    width: 60px;
    height: 60px;
    margin: 15px 15px 10px 15px;
  }
}

.item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 12px;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  transition: .25s;
  white-space: nowrap;
  width: 90%;
  margin: 5px;
}

.active {
  transform: scale(1.1);
}

.startActive {
  border: 1px solid red;
}

/deep/ .el-dialog {
  margin: 0 auto !important;
  background-color: #fff !important;
}

.dialog-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-direction: column;
}

.edit-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.edit-title {
  color: #4d4d4d;
  margin-right: 10px;
}

.edit-input {
  padding: 0 15px;
  border: none;
  outline: 0;
  border-radius: 5px;
  color: black;
  background-color: rgba(0, 0, 0, .05);
  transition: .25s;
  width: 70%;
  height: 40px;
  font-size: 14px;
}

.edit-icon-box {
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid #cccccc;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.edit-icon {
  width: 35px;
  height: 35px;
}

.edit-btn-box {
  width: 65%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.edit-btn {
  font-size: 14px;
  color: #4d4d4d;
  width: 20%;
  height: 30px;
  border-radius: 50px;
  text-align: center;
  border: 1px solid #f2f2f2;
  line-height: 30px;
  margin: 5px 8px;
  cursor: pointer;
  padding: 3px;
  background-color: #f2f2f2;
}

.edit-btn:hover {
  border: 1px solid #b3b3b3;
}

.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  min-width: 160px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgb(0 0 0 / 25%);
  transition: .25s cubic-bezier(0.65, 0.05, 0.1, 1);
  overflow: hidden;

}
.menu{
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  cursor: pointer;
}
.menu:hover{
  background-color: rgba(0,0,0,.1);
}
.menu-icon {
  margin-right: 15px;
  font-size: 14px;
}
</style>
