<template>
  <!--  <view class="content" :style="{'backgroundImage':`url(${backgroundImage})`}">-->
  <view class="content">
    <view :class="[showLongInput?'contentBox showBlur':'contentBox']">
      <view>
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
      <view class="loginAndFlash">
        <view class="lFBox">
          <el-tooltip class="item"
                      effect="light"
                      placement="bottom">
            <view slot="content" class="contentSlotBox">
              <view class="content-bottom">
                换壁纸
              </view>
            </view>
            <svg @click="getBackgroundImage" t="1659164995587" class="icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="34667" width="22" height="22">
              <path
                  d="M265.476047 298.525672a31.565968 31.565968 0 0 1-22.336079-53.88942L477.611978 10.10111a31.601322 31.601322 0 0 1 44.684784 44.69741l-234.47201 234.47201a31.464957 31.464957 0 0 1-22.348705 9.255142zM254.933013 769.199507a31.464957 31.464957 0 0 1-22.336078-9.255142L31.951016 559.273194a31.601322 31.601322 0 1 1 44.684784-44.697411l200.645919 200.671171a31.565968 31.565968 0 0 1-22.348706 53.952553zM519.165418 1014.593342a31.565968 31.565968 0 0 1-22.348705-53.952553l225.684044-225.684044a31.606372 31.606372 0 1 1 44.697411 44.69741L541.514123 1005.3382a31.565968 31.565968 0 0 1-22.348705 9.255142zM984.826577 548.932182a31.477583 31.477583 0 0 1-22.336079-9.267768L718.977995 296.177164a31.597534 31.597534 0 0 1 44.684784-44.684784L1007.175282 494.97963a31.565968 31.565968 0 0 1-22.348705 53.952552z"
                  fill="#cdcdcd" p-id="34668"></path>
              <path
                  d="M509.809265 533.780518a31.565968 31.565968 0 0 1-31.565968-31.565968V31.603847a31.565968 31.565968 0 0 1 31.565968-31.565968h470.547571a31.565968 31.565968 0 0 1 22.348705 53.939926L532.107465 524.550629a31.565968 31.565968 0 0 1-22.2982 9.229889z m31.565968-470.610703v362.743477L904.068205 63.207694z"
                  fill="#cdcdcd" p-id="34669"></path>
              <path
                  d="M980.356836 1024a31.565968 31.565968 0 0 1-22.310826-9.255142L487.410054 544.134155a31.565968 31.565968 0 0 1 22.399211-53.952552h470.547571a31.565968 31.565968 0 0 1 31.565968 31.565968v470.648582a31.654353 31.654353 0 0 1-19.507768 29.204833 31.995265 31.995265 0 0 1-12.0582 2.399014zM586.060017 553.401924l362.692972 362.692971V553.401924z"
                  fill="#cdcdcd" p-id="34670"></path>
              <path
                  d="M509.809265 1004.391221H39.160683a31.565968 31.565968 0 0 1-22.348705-53.939926l470.598076-470.610703a31.565968 31.565968 0 0 1 53.965179 22.373958v470.572824a31.565968 31.565968 0 0 1-31.565968 31.603847zM115.449314 941.183527h362.705598V578.477928z"
                  fill="#cdcdcd" p-id="34671"></path>
              <path
                  d="M509.809265 553.401924H39.160683a31.565968 31.565968 0 0 1-31.565968-31.565968V51.187374a31.565968 31.565968 0 0 1 53.939926-22.348706l470.572824 470.610703a31.565968 31.565968 0 0 1-22.2982 53.952553zM70.76453 490.181603h362.692972L70.76453 127.488631z"
                  fill="#cdcdcd" p-id="34672"></path>
            </svg>
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
            <svg @click="goToLoginPage" t="1659162872590" class="icon" viewBox="0 0 1039 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="29706" width="25" height="25">
              <path
                  d="M462.619289 83.68731c-12.994924 2.598985-40.024365 12.994924-60.816243 22.871066C284.328934 164.255838 244.824365 313.437563 317.076142 425.193909c97.721827 151.780711 335.788832 127.870051 402.322843-40.544163C783.853807 221.433503 637.790863 49.900508 462.619289 83.68731zM369.055838 570.217259c-115.394924 20.791878-212.596954 114.35533-236.507615 227.671066-8.836548 42.62335-9.876142 82.127919-2.598984 96.682233 7.796954 14.034518 40.544162 29.108629 78.48934 36.385787 47.82132 8.316751 429.872081 12.475127 534.871066 5.19797 133.587817-8.316751 166.335025-23.390863 166.335025-75.370559-0.519797-72.251777-29.628426-145.543147-78.48934-198.042639-36.385787-38.464975-70.172589-61.336041-117.993909-80.048731-34.306599-12.994924-37.945178-12.994924-182.968528-14.034518-81.608122-0.519797-153.859898 0-161.137055 1.559391z"
                  p-id="29707" fill="#cdcdcd"></path>
            </svg>
          </el-tooltip>
        </view>
      </view>
      <view>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            :before-close="handleClose">
          <view class="dialog-info">
            <view class="info-item">
              邮箱
              <span class="info-text">2865437316@qq.com</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
            <view class="info-item">
              邮箱
              <span class="info-text">2865437316@qq.com</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
            <view class="info-item">
              邮箱
              <span class="info-text">2865437316@qq.com</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
            <view class="info-item">
              邮箱
              <span class="info-text">2865437316@qq.com</span>
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
import {get_background_mage} from "../../service/service";
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
      haveToken:store.get('token')?true:'',
      dialogVisible:false
    }
  },
  onLoad() {
    //随机推荐一张壁纸
    // this.getBackgroundImage()
    //时间显示
    this.timer = setInterval(() => {
      this.getNowTime()
    }, 1000);
    if(store.get('token')){
      this.haveToken = true
    }
  },
  onShow(){
    if(store.get('token')){
      this.haveToken = true
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
        minutes += "0";
      }
      this.dateTime = `${hours}:${minutes}`
      this.dateSeconds = `:${date.getSeconds()}`
      this.dateYear = date.getFullYear()
    },
    getBackgroundImage() {
      get_background_mage().then(
          (res) => {
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
    showDialog(){
      this.dialogVisible = true
    },
    handleClose(){
      this.dialogVisible = false
    },
    logOut(){
      store.remove('token')
      location.reload()
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
  margin: 10px;
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
  color:black;
  font-size: 12px;
  transition: .25s;
  width: 100px;
  cursor: pointer;
}
.userInfo:hover{
  background-color: rgba(0,0,0,.1);
}
.userName{
  display: block;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/deep/.el-dialog{
  max-width: 600px;
  width: 90%;
  background-color: rgb(245,245,245);
  font-size: small;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
  transition: .25s;
}
/deep/ .el-dialog__header {
  padding: 40px 30px 10px;
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

.dialog-info{
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: white;
  padding: 12px 30px;
}
.info-item{
  position: relative;
  padding: 8px 0;
  color: rgba(0,0,0,.35);
  font-size:13px ;
}
.info-text{
  position: absolute;
  left: 55px;
  max-width: calc(100% - 85px);
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(0,0,0,.6);
}

.info-icon{
  position: absolute;
  right: 0;
  padding-left: 14px;

  font-size: 16px;
  transition: .25s;
  cursor: pointer;
}
.info-icon:hover{
  color: #70C000;
}
</style>
