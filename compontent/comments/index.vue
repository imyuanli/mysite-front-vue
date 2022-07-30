<template>
  <view class="comment">
    <view class="allCommentBox">
      <view class="showBtn btn">
        <span>查看所有评论</span>
        <svg t="1659161794438" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="16834" width="16" height="16">
          <path
              d="M326.714 950.611l415.897-415.897c6.271-6.271 9.399-14.495 9.386-22.714 0.013-8.219-3.115-16.443-9.386-22.714L326.714 73.389c-12.516-12.516-32.809-12.516-45.325 0-5.712 5.712-8.808 13.044-9.307 20.516-0.048 0.67-0.082 1.36-0.082 2.095v832c0 0.735 0.034 1.425 0.083 2.095 0.499 7.473 3.595 14.804 9.307 20.516 12.515 12.516 32.808 12.516 45.324 0z"
              p-id="16835" fill="#515151"></path>
        </svg>
      </view>
    </view>
    <textarea class="mytextarea" placeholder="留下你的宝贵意见 or Ding一下固定在屏幕左上角"
              name=""
              id=""
              cols="100%" rows="100%"
              maxlength="1000">
    </textarea>
    <view class="btnBox">
      <view class="btn">
        <span>Ding</span>
        <svg t="1659162036561" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="17867" width="17" height="17">
          <path
              d="M405.333333 430.933333l136.533334-136.533333-29.866667-29.866667L605.866667 170.666667l273.066666 273.066666-89.6 89.6-29.866666-29.866666-140.8 136.533333 59.733333 59.733333-89.6 89.6L256 460.8l89.6-89.6 59.733333 59.733333z m128 145.066667l162.133334-162.133333-64-64L469.333333 512l64 64z m-162.133333 34.133333l59.733333 59.733334-200.533333 200.533333L170.666667 806.4l200.533333-196.266667z"
              fill="#515151" p-id="17868"></path>
        </svg>
      </view>
      <view class="btn">
        <span>发送</span>
        <svg t="1659162111764" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="19754" width="15" height="15">
          <path
              d="M711.51616 398.62272a40.96 40.96 0 1 1 0-57.91744 40.96 40.96 0 0 1 0 57.91744zM640.73728 944.7424a40.79616 40.79616 0 0 1-64.83968 23.08096c-0.38912-0.28672-0.65536-0.65536-1.024-0.96256a40.6528 40.6528 0 0 1-8.82688-10.24c-0.32768-0.53248-0.7168-1.00352-1.024-1.55648l-178.5856-303.65696a40.61184 40.61184 0 0 1-4.56704-12.71808c0-0.32768-0.16384-0.65536-0.22528-0.98304a40.26368 40.26368 0 0 1-0.47104-4.93568c0-1.3312-0.14336-2.64192-0.1024-3.97312 0-0.63488 0.12288-1.26976 0.18432-1.90464a40.59136 40.59136 0 0 1 11.6736-25.62048l173.7728-173.7728a40.96 40.96 0 1 1 57.93792 58.01984l-151.552 151.552 120.27904 204.65664L860.16 154.17344 183.68512 416.768l147.90656 67.97312a40.96 40.96 0 0 1-40.96 70.94272L59.53536 449.49504l-1.6384-0.9216a40.69376 40.69376 0 0 1-10.24-8.99072c-0.32768-0.38912-0.69632-0.69632-1.024-1.10592a40.96 40.96 0 0 1-6.94272-13.96736s0-0.14336-0.1024-0.2048 0-0.28672 0-0.43008a41.10336 41.10336 0 0 1-1.24928-7.63904v-1.92512a40.57088 40.57088 0 0 1 0.24576-6.144c0-0.26624 0.14336-0.53248 0.18432-0.79872a40.42752 40.42752 0 0 1 30.24896-33.44384L920.53504 43.4176c1.024-0.28672 2.048 0 3.072-0.18432a40.36608 40.36608 0 0 1 11.14112-0.69632 39.1168 39.1168 0 0 1 4.54656 0.73728c0.9216 0.18432 1.82272 0.2048 2.74432 0.45056 1.2288 0.32768 2.048 1.18784 3.25632 1.61792a39.91552 39.91552 0 0 1 8.9088 4.42368 39.15776 39.15776 0 0 1 5.59104 4.85376 39.15776 39.15776 0 0 1 4.85376 5.59104 39.936 39.936 0 0 1 4.42368 8.9088c0.43008 1.16736 1.29024 2.048 1.61792 3.25632 0.24576 0.9216 0.26624 1.82272 0.45056 2.74432a38.912 38.912 0 0 1 0.73728 4.54656 40.32512 40.32512 0 0 1-0.69632 11.14112c-0.18432 1.024 0 2.048-0.18432 3.072z"
              p-id="19755" fill="#515151"></path>
        </svg>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
.comment {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 250px;
  width: 100%;
  max-width: 550px;
  height: calc(100vh - 340px);
  background-color: rgba(255, 255, 255, .6);
  border-radius: 15px;
  overflow: hidden;
  transition: .25s;
  backdrop-filter: blur(30px) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mytextarea {
  width: 100%;
  height: 75%;
  padding: 10px;
  background-color: transparent;
  color: black;
  font-family: "Microsoft Yahei Light", "Microsoft Yahei", "PingFang SC", "Helvetica Neue", Helvetica, Tahoma, Arial, sans-serif;;
  font-size: small;
  border: none;
  outline: 0;
  resize: none;
  transition: .25s;
}

.btnBox {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.allCommentBox {
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  margin: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {

}
</style>