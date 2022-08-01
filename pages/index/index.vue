<template>
    <view class="content" :style="{'backgroundImage':`url(${backgroundImage})`}">
<!--  <view class="content">-->
    <view :class="[showLongInput?'contentBox showBlur':'contentBox']">
      <view >
        <view class="time">
          <span>{{ dateTime }}</span>
          <span v-if="showSeconds">{{ dateSeconds }}</span>
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
        <view v-if="!showLongInput">
          <view @touchstart="touchStart" @touchend="touchEnd">
            <view v-if="showWorks">
              <Tools/>
            </view>
            <view v-if="!showWorks">
              <Comments/>
            </view>
          </view>
          <view class="navPageBox">
            <view class="navBox" @click="changeComment">
              <span :class="[showWorks?'nav navActive':'nav']"></span>
            </view>
            <view class="navBox" @click="changeTools">
              <span :class="[showWorks?'nav':'nav navActive']" class="nav"></span>
            </view>
          </view>
        </view>
      </view>
      <view class="loginAndFlash">
        <view class="lFBox">
          <el-tooltip class="item"
                      effect="light"
                      placement="bottom">
            <view v-if="!selfImage" slot="content" class="contentSlotBox">
              <view class="content-bottom">
                将当前壁纸设为永久
              </view>
            </view>
            <view v-if="selfImage" slot="content" class="contentSlotBox">
              <view class="content-bottom">
                当前壁纸为永久，再次点击将随机切换
              </view>
            </view>
            <i v-if="!selfImage" @click="saveCurrentImage" class="el-icon-star-off icon-btn"></i>
            <i v-if="selfImage" @click="delCurrentImage" class="el-icon-star-on icon-btn"></i>
          </el-tooltip>
        </view>
        <view class="lFBox">
          <el-tooltip class="item"
                      effect="light"
                      placement="bottom">
            <view slot="content" class="contentSlotBox">
              <view class="content-bottom">
                随机切换一张壁纸
              </view>
            </view>
            <i @click="getBackgroundImage" class="el-icon-picture-outline icon-btn"></i>
          </el-tooltip>
        </view>
        <view class="lFBox">
          <el-tooltip class="item"
                      effect="light"
                      placement="bottom-end">
            <view v-if="!haveToken" slot="content" class="contentSlotBox">
              <view class="content-top">
                <svg t="1659164183161" class="icon" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="32101" width="25" height="25">
                  <path
                      d="M677.973333 599.466667a42.666667 42.666667 0 0 1-30.293333-12.373334l-45.653333-45.653333 60.586666-60.16 15.36 15.36 75.52-75.52a106.666667 106.666667 0 0 0 0-150.613333 108.8 108.8 0 0 0-151.04 0l-75.093333 75.52 13.226667 13.226666-60.16 60.586667-42.666667-42.666667a42.666667 42.666667 0 0 1 0-60.16l105.813333-105.813333a192 192 0 0 1 271.36 271.786667l-106.666666 104.106666a42.666667 42.666667 0 0 1-30.293334 12.373334zM346.026667 869.546667a192 192 0 0 1-135.68-327.68l105.813333-105.813334a42.666667 42.666667 0 0 1 60.16 0l45.653333 45.653334-60.16 60.586666-15.786666-15.36-75.093334 75.093334a106.666667 106.666667 0 0 0 150.613334 151.04l75.52-75.52-13.653334-13.653334 60.16-60.16 42.666667 42.666667a42.666667 42.666667 0 0 1 0 60.586667l-104.106667 106.24a191.573333 191.573333 0 0 1-136.106666 56.32zM701.44 884.906667a42.666667 42.666667 0 0 1-42.666667-31.573334l-23.893333-88.746666a42.666667 42.666667 0 0 1 82.346667-22.186667l23.893333 88.746667a42.666667 42.666667 0 0 1-30.293333 52.48 46.506667 46.506667 0 0 1-9.386667 1.28zM847.786667 738.986667a34.986667 34.986667 0 0 1-11.093334 0l-88.746666-23.893334a42.666667 42.666667 0 0 1-30.293334-52.053333 42.666667 42.666667 0 0 1 52.48-30.293333l88.746667 23.893333a42.666667 42.666667 0 0 1-11.093333 85.333333zM265.813333 394.24a46.506667 46.506667 0 0 1-11.093333 0l-89.173333-25.173333a42.666667 42.666667 0 0 1 22.186666-82.346667l88.746667 23.893333a42.666667 42.666667 0 0 1-10.666667 85.333334zM346.88 312.746667a42.666667 42.666667 0 0 1-42.666667-31.573334l-22.186666-88.746666a42.666667 42.666667 0 0 1 30.293333-52.48A42.666667 42.666667 0 0 1 364.373333 170.666667l23.893334 88.32a42.666667 42.666667 0 0 1-30.293334 52.48 46.506667 46.506667 0 0 1-11.093333 1.28z"
                      p-id="32102" fill="#8a8a8a"></path>
                </svg>
                您还没有
                <span @click="goToLoginPage"
                      style="color: #007aff;cursor: pointer"
                >登录</span>
              </view>
              <view class="content-bottom">
                登录后即可获得自定义网站捷径及众多功能
              </view>
            </view>
            <view v-if="haveToken" slot="content" class="contentSlotBox">
              <view class="userInfo" @click="showDialog">
                <span class="userName">鸢离</span>
                <span>账号管理</span>
              </view>
              <view class="userInfo">
                自定义设置
              </view>
              <view class="userInfo" @click="logOut">退出登录</view>
            </view>
            <i @click="goToLoginPage" class="el-icon-user-solid icon-btn"></i>
          </el-tooltip>
        </view>
      </view>
      <view>
        <el-dialog
            :visible.sync="dialogVisible"
            :before-close="handleClose">
          <view slot="title" class="header-title">
            欢迎你，<span style="color:#70C000;">{{userName}}</span>
          </view>
          <view class="dialog-info">
            <view class="info-item">
              邮箱
              <span class="info-text">{{ email }}</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
            <view class="info-item">
              UID
              <span class="info-text">{{ uid }}</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
            <view class="info-item">
              昵称
              <span v-if="!isChangeName"  class="info-text">{{ userName }}</span>
              <el-input class="info-text update" v-if="isChangeName" v-model="changeNameValue" type="text" />
              <i v-if="!isChangeName" @click="showUpdate"  class="info-icon el-icon-edit"></i>
              <span @click="updateUserName" v-if="isChangeName" class="info-edit info-icon">保存</span>
            </view>
            <view class="info-item">
              创建时间
              <span class="info-text">{{ createTime }}</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
          </view>
        </el-dialog>
      </view>
      <!--      <view class="dingTag">-->
      <!--        添加的dingtag-->
      <!--      </view>-->
      <view class="footer">
        {{ dateYear }} © 鸢离
      </view>
    </view>
  </view>
</template>

<script>
import {get_background_mage, get_user_info, save_current_image, update_info} from "../../service/service";
import Tools from '../../compontent/tools'
import Comments from '../../compontent/comments'
import Userinfo from '../../compontent/userInfo'
import {goToLoginPage} from '../../utils/routers'
import store from "store";

export default {
  components: {
    Tools,
    Comments,
    Userinfo
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
      dateTime: '',
      dateSeconds: "",
      showSeconds: false,
      dateYear: "",
      timer: "",
      //作品和评论及DING
      showWorks: true,
      //壁纸
      backgroundImage: '',
      //初始化点击位置的x坐标
      startX: 0,
      haveToken: store.get('token'),
      dialogVisible: false,
      userInfo: [],
      userName: '',
      email: '',
      uid: '',
      createTime: '',

      isChangeName:false,
      changeNameValue:"",
      selfImage:false,  //false

    //  下拉框
      testDisabled:false,
    }
  },
  onLoad() {
    //时间显示
    this.timer = setInterval(() => {
      this.getNowTime()
    }, 1000);
    if (store.get('token')) {
      this.haveToken = true
      get_user_info().then(
          (res) => {
            if (res) {
              this.userName = res.user_name
              this.email = res.email
              this.uid = res.uid
              this.createTime = res.create_time.split("T")[0]
              if(res.background_image !== "null"){
                this.selfImage = true
                this.backgroundImage = res.background_image
              }
              else{
                this.getBackgroundImage()
              }
            }
          }
      )
    }
    //没有登录也是随机刷新
    else{
      this.getBackgroundImage()
    }

  },
  methods: {
    handleClick() {
      this.showLongInput = !this.showLongInput
    },
    getNowTime() {
      let date = new Date()
      let hours = date.getHours()
      let minutes = date.getMinutes()
      if (minutes < 10) {
        minutes = "0"+minutes;
      }
      this.dateTime = `${hours}:${minutes}`
      this.dateSeconds = `:${date.getSeconds()}`
      this.dateYear = date.getFullYear()
    },
    getBackgroundImage() {
      get_background_mage().then(
          (res) => {
            if(this.selfImage) {
              this.delCurrentImage()
            }
            this.backgroundImage = res
          }
      )
    },
    changeComment() {
      this.showWorks = true
    },
    changeTools() {
      this.showWorks = false
    },
    changePages() {
      this.showWorks = !this.showWorks
    },
    goToLoginPage() {
      goToLoginPage()
    },
    touchStart: function (e) {
      if (e.touches.length == 1) {
        //设置触摸起始点水平方向位置
        this.startX = e.touches[0].clientX;
      }
    },
    touchEnd: function (e) {
      if (e.changedTouches.length == 1) {
        //手指移动结束后水平位置
        let endX = e.changedTouches[0].clientX;
        let diff = endX - this.startX;
        if (Math.abs(diff) > 30) {
          if (diff > 0) {
            this.changePages()
          } else {
            this.changePages()
          }
        }
      }
    },
    showDialog() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
    logOut() {
      store.remove('token')
      location.reload()
    },
    showUpdate(){
      this.isChangeName = true
      this.changeNameValue = this.userName
    },
    updateUserName(){
      update_info({user_name:this.changeNameValue}).then(
          (res)=>{
            if(res){
              this.userName = res
              this.isChangeName = false
            }
          }
      )
    },
    //将当前壁纸设为永久
    saveCurrentImage(){
      save_current_image({background_image:this.backgroundImage}).then(
          (res)=>{
            if(res){
              this.selfImage = true
            }
          }
      )
    },

    //取消当前的永久壁纸
    delCurrentImage(){
      save_current_image({background_image:''}).then(
          (res)=>{
            if(res){
              this.selfImage = false
              this.getBackgroundImage()
            }
          }
      )
    }
  },
  onHide() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
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

.lFBox {
  margin: 15px;
  cursor: pointer;
}

.loginAndFlash {
  position: absolute;
  right: 3%;
  top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navPageBox {
  position: absolute;
  left: 50%;
  bottom: 50px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  padding: 0 7px;
  border-radius: 12px;
  transition: .25s;
  cursor: pointer;
}

.navPageBox:hover {
  background-color: rgba(255, 255, 255, .1);
  backdrop-filter: blur(10px) !important;
}

.navBox {
  display: inline-block;
  padding: 10px 3px;
}

.nav {
  display: block;
  width: 30px;
  height: 5px;
  background-color: rgba(0, 0, 0);
  transition: .25s;
  border-radius: 2px;
}

.navBox:hover .nav {
  background-color: rgba(255, 255, 255, .5);
  backdrop-filter: blur(10px) !important;
}

.navActive {
  background-color: rgba(255, 255, 255, .5);
  backdrop-filter: blur(10px) !important;
}

.content-top {
  color: black;
  font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.content-bottom {
  position: relative;
  color: rgba(0, 0, 0, .8);
  margin-top: 10px;
  font-family: "Microsoft Yahei Light", "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif;
}

.footer {
  display: inline-block;
  border-radius: 2px;
  backdrop-filter: blur(10px);
  animation: delayedFadeIn 1s;
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  font-size: 14px;
  color: rgba(255, 255, 255, .6);
  text-align: center;
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
  white-space: nowrap;
  padding: 3px 10px;
}

.userInfo {
  padding: 10px 15px;
  border-radius: 5px;
  color: black;
  font-size: 12px;
  transition: .25s;
  width: 100px;
  cursor: pointer;
}

.userInfo:hover {
  background-color: rgba(0, 0, 0, .1);
}

.userName {
  display: block;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/ .el-dialog {
  max-width: 600px;
  width: 90%;
  background-color: rgb(245, 245, 245);
  font-size: small;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
  transition: .25s;
}

/deep/ .el-dialog__header {
  padding: 40px 30px 10px;
}
/deep/ .el-dialog__body{
  padding: 20px;
}
/deep/ .el-dialog__headerbtn {
  position: absolute;
  top: 20px;
  right: 15px;
  padding: 0;
  background: 0 0;
  border: none;
  outline: 0;
  cursor: pointer;
  font-size: 25px;
}

.dialog-info {
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  padding: 12px 22px;
}

.info-item {
  position: relative;
  padding: 10px 0;
  color: rgba(0, 0, 0, .35);
  font-size: 13px;
}

.info-text {
  position: absolute;
  left: 70px;
  max-width: calc(100% - 85px);
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0, 0, 0, .6);
}

.info-icon {
  position: absolute;
  right: 0;
  padding-left: 14px;

  transition: .25s;
  cursor: pointer;
}

.info-icon:hover {
  color: #70C000;
}
.info-edit{
  color: #70C000;
}
.header-title{
  color: black;
  font-size: 26px;
  font-family: "Helvetica Neue",Helvetica,Tahoma,Arial,"PingFang SC","Microsoft Yahei",sans-serif;
  transition: .25s;
}

/deep/ .el-input__inner:focus {
  border-bottom: solid 1px #70C000;
}
/deep/ .el-input__inner{
  -webkit-appearance: none;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  height: 20px;
  line-height: 20px;
  outline: 0;
  /* padding: 0 15px; */
  width: 200px;
  border: none;
  border-radius: 0;
  border-bottom: solid 1px rgba(0,0,0,.1);
  color: black;
  background-color: white;
  transition: .25s;
}
.icon-btn{
  display: inline-block;
  font-size: 26px;
  color: rgba(255,255,255,.35);
  cursor: pointer;
  transition: .25s;
}
.icon-btn:hover{
  color: rgba(255,255,255,.75)
}
</style>
