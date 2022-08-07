<template>
  <view class="comment-box">
    <view class="node-list">
      <view class="node-btn" @click="addBlankNote" >
        <i class="el-icon-plus node-icon"></i>
        <span>新的便利贴</span>
      </view>
      <view class="node-item-main" id="node-item-main">
        <view :class="currentIndex === index?'activeChoose':''"
              class="node-item"
              v-for="(item,index) in stickyNoteList"
              @click="chooseNode(item,index)"
              :id="'li' + index"
        >
          <view class="node-text">
            {{ item.data }}
          </view>
          <view class="node-time">
            {{ changeTime(item.time) }}
          </view>
        </view>
      </view>
    </view>
    <view class="comment">
      <!--      <view class="allCommentBox">-->
      <!--        <view class="showBtn btn">-->
      <!--          <span>查看所有评论</span>-->
      <!--          <i class="btn-icon el-icon-caret-right"></i>-->
      <!--        </view>-->
      <!--      </view>-->
      <textarea @click="isNeedLogin" class="mytextarea" placeholder="友善交流 or Ding一下添加便利贴"
                name=""
                id=""
                v-model="texTareaValue"
                cols="100%" rows="100%"
                maxlength="10000">
    </textarea>
      <view class="btnBox">
        <view class="btn" @click="addNote">
          <span>保存</span>
          <i class="btn-icon el-icon-s-claim"></i>
        </view>
        <view class="btn dingBtn" @click="dingNote">
          <span>Ding</span>
          <i class="btn-icon el-icon-s-flag"></i>
        </view>
        <view v-show="this.currentItem" class="btn" @click="deleteNote">
          <span>删除</span>
          <i class="btn-icon el-icon-delete-solid"></i>
        </view>
        <!--        <view class="btn">-->
        <!--          <span>评论</span>-->
        <!--          <i class="btn-icon el-icon-s-promotion"></i>-->
        <!--        </view>-->
      </view>
    </view>
  </view>
</template>

<script>
import {update_sticky_note} from "../../service/service";
import {fnTime, isLogin} from "../../utils/utils";
import store from 'store'
import {goToLoginPage} from "../../utils/routers";
export default {
  name: "index",
  props: {
    stickyNoteList: {
      type: Array,
    },
    detailsIndex:{

    }
  },
  data() {
    return {
      texTareaValue: '',
      currentIndex: "",
      currentItem: "",
    }
  },
  methods: {
    isNeedLogin(){
     isLogin()
    },
    chooseNode(item, index) {
      this.texTareaValue = item.data
      this.currentIndex = index
      this.currentItem = item
    },
    deleteNote() {
      isLogin()
      this.stickyNoteList.splice(this.currentIndex, 1)
      //置空
      this.texTareaValue = ""
      this.currentIndex = ""
      this.currentItem = ""
      // 删除
      this.updateStickyNote()
    },
    dingNote() {
      isLogin()
      if (this.currentItem) {
        this.currentItem.isDing = true
        this.$set(this.stickyNoteList, this.currentIndex, this.currentItem)
        this.updateStickyNote()
        this.addNote()
      }
    },
    addNote() {
      isLogin()
      if(store.get('token')){
        //获取当前时间戳
        let today = Date.now()
        //添加或修改完默认选中之前的
        if(String(this.currentIndex)){
          //如果有这个就是修改数据
          let obj = {
            time: today,
            isDing: this.stickyNoteList[this.currentIndex].isDing,
            data: this.texTareaValue
          }
          this.$set(this.stickyNoteList,this.currentIndex,obj)
          this.currentItem = this.stickyNoteList[this.currentIndex]
        }
        else{
          // 新的blank保存数据
          let obj = {
            time: today,
            isDing: false,
            data: this.texTareaValue
          }
          this.stickyNoteList.unshift(obj)
          this.currentIndex = 0
          this.currentItem = this.stickyNoteList[0]
        }
        //新增 和更新
        this.updateStickyNote()
      }
    },
    addBlankNote(){
      isLogin()
      if(store.get('token')){
        this.texTareaValue = ""
        // this.isBlank =
        let today = Date.now()
        let obj = {
          time: today,
          isDing: false,
          data: "",
        }
        this.stickyNoteList.unshift(obj)
        this.currentIndex = 0
        this.currentItem = this.stickyNoteList[0]
      }
    },
    //增删改
    updateStickyNote(){
      update_sticky_note({stickyNoteList:JSON.stringify(this.stickyNoteList)})
    },
    changeTime(time){
      return fnTime(time)
    }
  },
  watch:{
    detailsIndex(value){
      this.texTareaValue = this.stickyNoteList[value].data
      this.currentIndex = value
      this.currentItem = this.stickyNoteList[value]
      let target = document.getElementById(`li${value}`);
      let parent = document.getElementById('node-item-main');
      parent.scrollTo(0, target.offsetTop - parent.offsetTop);
    }
  }
}
</script>

<style scoped>
.comment-box {
  width: 85%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: calc(100vh - 340px);
  top: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.comment {
  width: 65%;
  max-width: 450px;
  height: 100%;
  background-color: rgba(255, 255, 255, .6);
  border-radius: 15px;
  overflow: hidden;
  transition: .25s;
  backdrop-filter: blur(30px) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-direction: column;
}

.mytextarea {
  width: 95%;
  height: 75%;
  background-color: transparent;
  color: black;
  font-family: "Microsoft Yahei Light", "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif;;
  font-size: small;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  outline: 0;
  resize: none;
  transition: .25s;
  /*overflow: auto;*/
}

.comment::-webkit-scrollbar {
  display: none;
}

/deep/ .uni-textarea-textarea::-webkit-scrollbar {
  display: none;
}

.btnBox {
  /*position: absolute;*/
  /*left: 50%;*/
  /*transform: translateX(-50%);*/
  /*bottom: 5px;*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.allCommentBox {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

}

.showBtn {
  padding: 5px !important;
  margin: 5px !important;
}

.btn {
  padding: 10px;
  /*background-color: red;*/
  color: #515151;
  font-family: "Microsoft Yahei Light", "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif;;
  font-size: small;
  border: none;
  outline: 0;
  transition: .25s;
  cursor: pointer;
  margin: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  color: #70C000;
}

.node-list {
  max-width: 222px;
  margin-right: 20px;
  width: 190px;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  overflow: hidden;
  border-radius: 15px;
  transition: .25s;
  font-size: 14px;
  color: #fff;
}

.node-icon {
  margin-right: 5px;
}

.node-btn {
  padding: 10px;
  border-bottom: solid 1px rgba(255, 255, 255, .2);
  transition: .25s;
  animation: fadeIn .5s;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.node-btn:hover {
  background-color: rgba(255, 255, 255, .3);
  border-color: transparent;
}

.node-item-main {
  height: 90%;
  overflow: auto;
}

.node-item-main::-webkit-scrollbar {
  display: none
}

.node-item {
  padding: 10px;
  border-bottom: solid 1px rgba(255, 255, 255, .1);
  transition: .25s;
  animation: fadeIn .5s;
  cursor: pointer;
}

.node-item:hover {
  background-color: rgba(255, 255, 255, .3);
  border-color: transparent;
}

.node-text {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: -3.6px;
}

.node-time {
  font-size: 12px;
  color: rgba(255, 255, 255, .3);
}

.activeChoose {
  background-color: #70C000;
}

@media screen and (max-width: 600px) {
  .node-list {
    margin-right: 5px;
    width: 120px;
    font-size: 12px;
  }

  .dingBtn {
    display: none;
  }
}
</style>
