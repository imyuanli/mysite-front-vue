<template>
  <view class="content" v-loading="backImageLoading" :style="{'backgroundImage':`url(${backgroundImage})`}">
    <!--  <view class="content">-->
    <view @click.self="handleClickClose()" :class="['contentBox',showLongInput?'showBlur':'']">
      <view>
        <Time :showSeconds="showSeconds"/>
        <MyInput
            :showLongInput="showLongInput"
            :default_search_index="default_search_index"
            :handleClickOpen="handleClickOpen"
        />
        <view v-show="!showLongInput">
          <view @touchstart="touchStart" @touchend="touchEnd">
            <view v-show="showWorks">
              <Tools :shortcuts_list="shortcuts_list"/>
            </view>
            <view v-show="!showWorks">
              <Comments :detailsIndex="detailsIndex" :stickyNoteList="stickyNoteList"/>
            </view>
          </view>
          <view class="navPageBox">
            <view class="navBox" @click="changeComment">
              <span :class="['nav',showWorks && 'navActive']"></span>
            </view>
            <view class="navBox" @click="changeTools">
              <span :class="['nav',!showWorks && 'navActive']"></span>
            </view>
          </view>
        </view>
        <!--一言-->
        <view v-show="showWeather == 1" style="width: 80%">
          <view class="famous-info-box" v-show="showLongInput">
            <view class="famous-info">
              「 {{ famousInfo.hitokoto }} 」
            </view>
            <view class="famous-form">
              —— {{ famousInfo.from }}
            </view>
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
                 {{selfImage?'当前壁纸为永久，再次点击将随机切换':'将当前壁纸设为永久'}}
              </view>
            </view>
            <i @click="handleCurrentImage" :class="['icon-btn',selfImage?'el-icon-star-on':'el-icon-star-off']"></i>
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
        <view v-if="!haveToken" class="lFBox">
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
              <!--              <view class="navBar">-->
              <!--                自定义设置-->
              <!--              </view>-->
              <view class="userInfo" @click="logOut">退出登录</view>
            </view>
            <i @click="goToLoginPage" class="el-icon-user-solid icon-btn"></i>
          </el-tooltip>
        </view>
        <view v-if="haveToken" class="lFBox">
          <el-popover
              placement="bottom"
              width="150"
              trigger="click">
            <view>
              <view class="userInfo" @click="showDialog">
                <span class="userName">{{ userName }}</span>
                <span>账号管理</span>
              </view>
              <!--              <view class="navBar">-->
              <!--                自定义设置-->
              <!--              </view>-->
              <view class="userInfo" @click="logOut">退出登录</view>
            </view>
            <i slot="reference" class="el-icon-user-solid icon-btn"></i>
          </el-popover>
        </view>
      </view>
      <el-dialog
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          :append-to-body="true"
      >
        <view slot="title" class="header-title">
          欢迎你，<span style="color:#70C000;">{{ userName }}</span>
        </view>
        <view class="dialog-info">
          <view class="dialog-title">基础信息</view>
          <view v-for="(i,index) in info" :key="i.name" class="info-item">
            <view v-if="i.should_edit == 'true'">
              <span>{{ i.name }}</span>
              <span v-if="!isChangeName" class="info-text">{{ i.data }}</span>
              <el-input maxlength="30" class="info-text update" v-if="isChangeName" v-model="changeNameValue"
                        type="text"/>
              <i v-if="!isChangeName" @click="showUpdate" class="info-icon el-icon-edit"></i>
              <span @click="updateUserName(i,index)" v-if="isChangeName" class="info-edit info-icon">保存</span>
            </view>
            <view v-else>
              <span>{{ i.name }}</span>
              <span class="info-text">{{ i.data }}</span>
              <i class="info-icon el-icon-document-copy"></i>
            </view>
          </view>
        </view>
        <view class="dialog-info">
          <view class="dialog-title">常规设置</view>
          <view @click="updateSetting(i,index)" v-for="(i,index) in basic_settings" :key="i.type"
                class="info-item basic">
            <span>{{ i.name }}</span>
            <i v-if="i.data == 1" class="basic_icon basic_true el-icon-open"></i>
            <i v-else class="basic_icon  el-icon-turn-off"></i>
          </view>
        </view>
      </el-dialog>
      <view class="dingTag">
        <view @click="showDetails(index)" class="tabs" v-for="(item,index) in stickyNoteList"
              v-if="item.isDing == true">
          <view class="tabs-text">
            {{ item.data }}
          </view>
          <view class="tabs-time">
            {{ changeTime(item.time) }}
          </view>
          <i class="el-icon-close tabs-close" @click="deleteDing(item,index)"></i>
          <view class="circle"></view>
        </view>
      </view>
      <view class="footer">
        © {{ new Date().getFullYear() }} 鸢离
        <span v-show="showConciseFooter == 1">
          <span class="geduan">|</span>
          <a class="icp" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=41052202001272">豫公安网备41052202001272</a>
          <span class="geduan">|</span>
          <a class="icp" href="https://beian.miit.gov.cn/">冀ICP备2020030880号</a></span>
      </view>
    </view>
  </view>
</template>

<script>
import {
  get_background_mage,
  get_basic_settings,
  get_famous,
  get_user_info,
  save_current_image,
  update_basic_settings,
  update_info,
  update_sticky_note
} from "../../service/service";
import Tools from '../../compontent/tools'
import Comments from '../../compontent/comments'
import Time from '../../compontent/time'
import MyInput from '../../compontent/myInput'
import {goToLoginPage} from '../../utils/routers'
import store from "store";
import {fnTime} from "../../utils/utils";

export default {
  components: {
    Tools,
    Comments,
    Time,
    MyInput
  },
  data() {
    return {
      inputVlaue: '',
      showLongInput: false,
      //快捷方式
      shortcuts_list: [],
      value: '',

      //作品和评论及DING
      showWorks: true,
      //壁纸
      backgroundImage: '',
      //初始化点击位置的x坐标
      startX: 0,
      haveToken: store.get('token'),
      dialogVisible: false,
      info: '',
      basic_settings: '',

      userName: '',
      email: '',
      uid: '',
      createTime: '',
      isChangeName: false,
      changeNameValue: "",
      selfImage: false,  //false

      //  基础设置
      showSeconds: 0,
      showWeather: 0,
      showConciseFooter: 0,
      showToGreet: 0,

      //  搜索引擎
      default_search_index: 0,

      //  便利贴功能
      stickyNoteList: [],
      detailsIndex: '',
      greetInfo: '',

      // 名人名言
      famousInfo: "",
      backImageLoading: false
    }
  },
  mounted() {
    this.showGreete()
    if (store.get('token')) {
      this.haveToken = true
      get_user_info().then(
          (res) => {
            if (res) {
              this.userName = res.user_name
              this.info = res.info[0]
              this.shortcuts_list = JSON.parse(res.shortcuts_list)
              this.default_search_index = Number(res.default_search)
              this.stickyNoteList = JSON.parse(res.stickyNoteList)
              if (res.background_image !== "null") {
                //说明背景图不为空
                this.selfImage = true
                this.backgroundImage = res.background_image
              } else {
                this.getBackgroundImage()
              }
            }
            this.getBasicSettings()
          }
      )
    }
    //没有登录也是随机刷新
    else {
      this.getBackgroundImage()
    }
  },
  methods: {
    //问候
    showGreete() {
      var dd = new Date();
      var hour = dd.getHours();//获取当前时
      //alert(hour);
      if (hour > 0 && hour <= 6) {
        this.greetInfo = "还没休息啊，该休息了";
      } else if (hour > 6 && hour <= 9) {
        this.greetInfo = "上午好";
      } else if (hour > 9 && hour <= 12) {
        this.greetInfo = "早上好";
      } else if (hour > 12 && hour <= 14) {
        this.greetInfo = "中午好";
      } else if (hour > 14 && hour <= 18) {
        this.greetInfo = "下午好";
      } else if (hour > 18 && hour <= 21) {
        this.greetInfo = "傍晚好";
      } else if (hour > 21 && hour <= 24) {
        this.greetInfo = "晚上好";
      }
    },
    //北京颜色的变换
    handleClickOpen() {
      this.showLongInput = true
    },
    handleClickClose() {
      this.showLongInput = false
    },
    //背景图片
    getBackgroundImage() {
      this.backImageLoading = true
      get_background_mage().then(
          (res) => {
            if (res) {
              if (this.selfImage) {
                this.handleCurrentImage(true)
              }
              this.backgroundImage = res
              this.backImageLoading = false
            }
          }
      )
    },
    //
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
    showUpdate() {
      this.isChangeName = true
      this.changeNameValue = this.userName
    },
    updateUserName(i, index) {
      let user_name = this.changeNameValue.replace(/\s*/g, '')
      if (!user_name) {
        this.$message({
          message: '用户名不能输入空',
          center: true,
          type: 'warning'
        });
        return;
      }
      let obj = {
        data: user_name,
        name: "姓名",
        should_edit: "true",
      }
      this.$set(this.info, index, obj);
      update_info({user_name}).then(
          (res) => {
            if (res) {
              this.userName = res
              this.isChangeName = false
            }
          }
      )
    },
    //将当前壁纸 设为/取消 永久
    handleCurrentImage() {
      if(this.selfImage){
        this.backImageLoading = true
      }
      let background_image = this.selfImage?'':this.backgroundImage
      save_current_image({background_image}).then(
          (res) => {
            if (res) {
              if(this.selfImage){
                this.getBackgroundImage()
                this.selfImage= false
                this.backImageLoading = false
              }
              else{
                this.selfImage= true
              }
            }
          }
      )
    },

    //  基础设置
    getBasicSettings() {
      get_basic_settings().then(
          (res) => {
            this.basic_settings = res.basic_settings
            //显示秒数
            this.showSeconds = res.show_seconds
            //一言
            this.showWeather = res.show_weather
            //显示footer
            this.showConciseFooter = res.show_concise_footer
            //问候
            this.showToGreet = res.show_to_greet
            if (res.show_to_greet == 1) {
              this.$message({
                message: this.userName + ',' + this.greetInfo,
                center: true,
                iconClass: 'el-icon-mm',
              });
            }
            if (res.show_weather == 1) {
              this.getFamous()
            }
          }
      )
    },
    updateSetting(item, index) {
      let {type} = item
      let data = item.data == 0 ? 1 : 0
      if (type == 'show_seconds') {
        this.showSeconds = data
      }
      if (type == 'show_concise_footer') {
        this.showConciseFooter = data
      }
      if (type == 'show_to_greet') {
        this.showToGreet = data
      }
      if (type == 'show_weather') {
        this.showWeather = data
      }
      let obj = {
        name: item.name,
        type: item.type,
        data,
      }
      this.$set(this.basic_settings, index, obj);
      update_basic_settings({type, data}).then(
          (res) => {
            if (res.show_weather && res.show_weather == 1) {
              this.getFamous()
            }
          }
      )
    },
    changeTime(time) {
      return fnTime(time)
    },
    //dingtag
    deleteDing(item, index) {
      item.isDing = false
      this.$set(this.stickyNoteList, index, item)
      this.updateStickyNote()
    },
    updateStickyNote() {
      update_sticky_note({stickyNoteList: JSON.stringify(this.stickyNoteList)})
    },
    showDetails(index) {
      this.detailsIndex = index
      this.showWorks = false
    },
    getFamous() {
      get_famous().then(
          (res1) => {
            let data = JSON.parse(res1).data
            this.famousInfo = {
              from: data.from,
              hitokoto: data.hitokoto,
            }
          }
      )
    }
  }
}
</script>

<style scoped>
.content {
  background-image: url("../../static/backimg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 750 rpx;
  height: 100vh;
  position: relative;
}

.contentBox {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, .5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, .3) 166%);
}

.showBlur {
  backdrop-filter: blur(10px);
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
  color: #70C000;
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

/deep/ .el-dialog__body {
  padding: 20px;
  max-height: 350px;
  overflow: auto;
}

/deep/ .el-dialog__body::-webkit-scrollbar {
  display: none
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
  padding: 14px;
}

.dialog-title {
  color: black;
  font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
  font-size: 15px;
  font-weight: 700;
}

.info-item {
  position: relative;
  padding: 10px 0;
  color: rgba(0, 0, 0, .35);
  font-size: 13px;
}

.basic {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.basic_icon {
  font-size: 30px;
  cursor: pointer;
}

.basic_true {
  color: #70C000;
}

.info-text {
  position: absolute;
  left: 70px;
  max-width: calc(100% - 85px);
  overflow: hidden;
  white-space: nowrap;
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

.info-edit {
  color: #70C000;
}

.header-title {
  color: black;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
  transition: .25s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 98%;
}

/deep/ .el-input__inner:focus {
  border-bottom: solid 1px #70C000;
}

/deep/ .el-input__inner {
  -webkit-appearance: none;
  box-sizing: border-box;
  display: inline-block;
  font-size: inherit;
  height: 20px;
  line-height: 20px;
  outline: 0;
  padding: 0px;
  width: 95%;
  border: none;
  border-radius: 0;
  border-bottom: solid 1px rgba(0, 0, 0, .1);
  color: black;
  background-color: white;
  transition: .25s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon-btn {
  display: inline-block;
  font-size: 26px;
  color: rgba(255, 255, 255, .35);
  cursor: pointer;
  transition: .25s;
}

.icon-btn:hover {
  color: rgba(255, 255, 255, .75)
}


.dingTag {
  position: absolute;
  left: 10px;
  padding: 40px 10px 10px 20px;
  max-height: calc(100vh - 60px);
  perspective-origin: 145px 68px;
  perspective: 500px;
  overflow-y: auto;
  transition: .25s;
}

.tabs {
  margin-bottom: 10px;
  width: 200px;
  padding: 10px 10px 10px 30px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, .8);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 5%) 0 10px 20px;
  transition: .25s;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Tahoma, Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
  position: relative;
}

.tabs-text {
  display: inline-block;
  width: 180px;
  max-height: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  font-size: small;
}

.tabs-time {
  color: rgba(0, 0, 0, .35);
  font-size: 12px;
}

.tabs-close {
  z-index: 99;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 18px;
  height: 18px;
  color: rgba(0, 0, 0, .5);
  cursor: pointer;
  transition: .25s;
  font-size: 20px;
  display: none;
}

.tabs:hover .tabs-close {
  display: block;
  transition: .25s;
  color: #70C000;
  transform: rotateY(5deg);
}

.tabs:hover {
  transform: rotateY(5deg);
}

.circle {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  border-radius: 50%;
  box-shadow: inset 1px 1px 1px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 25px rgba(255, 255, 255, .25);
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, .5);
}

@media screen and (max-width: 600px) {
  .dingTag {
    display: none;
  }
}

.geduan {
  margin: 0 10px;

}

.icp {
  color: rgba(255, 255, 255, .6);
  text-decoration: none;
}

.el-icon-mm {
  display: none;
}

.famous-info-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 125px;
  width: 80%;
  padding: 15px 50px;
  border-radius: 15px;
  color: rgba(255, 255, 255, .9);
  font-size: small;
  text-align: center;
  cursor: default;
  transition: .5s;
}

.famous-info {
  text-shadow: 0 0 20px rgb(0 0 0 / 80%);
  transition: .25s;
}

.famous-form {
  opacity: 0;
  margin-top: 8px;
}

.famous-info-box:hover {
  background-color: rgba(255, 255, 255, .1);
}

.famous-info-box:hover .famous-form {
  opacity: 1;
}

</style>
