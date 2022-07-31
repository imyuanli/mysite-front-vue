<template>
  <view class="main">
    <view class="mainBox">
      <view class="title">登录</view>
      <view class="inputBox">
        <el-input
            placeholder="请输入邮箱"
            prefix-icon="el-icon-user"
            v-model="email"
            class="my-input"
        >
        </el-input>
        <el-input
            placeholder="请输入验证码"
            prefix-icon="el-icon-key"
            v-model="code"
            class="my-input"
        >
        </el-input>
        <el-button class="btn" type="primary">注册&登录</el-button>

        <el-button size="mini"
                   class="code-btn"
                   type="primary"
                   plain
        >
          <span @click="getLoginCode" v-if="time == 60">发送验证码</span>
          <span v-if="time !== 60">{{ time }}秒</span>
        </el-button>
        <span class="info">
          <i class="el-icon-info"></i>
          未注册的账号登录后将会自动注册
        </span>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      code: '',
      time: 60,
      interval: ''
    };
  },
  methods: {
    getLoginCode() {
      console.log(123123)
      if (!this.email) {
        this.$message({
          showClose: true,
          message: '邮箱不能为空',
          type: 'warning'
        });
        return;
      }
      if (this.email.indexOf('@') < 0) {
        this.$message({
          showClose: true,
          message: '邮箱格式不正确哦',
          type: 'warning'
        });
        return;
      }
      if (this.interval) {
        clearInterval(this.interval)
      }
      this.interval = setInterval(() => {
        this.time--
        if (this.time <= -1) {
          clearInterval(this.interval)
          this.time = 60
        }
      }, 1000)
    }
  },
};
</script>

<style scoped>
.main {
  position: relative;
  animation: fadeIn .25s linear;
  height: 100vh;
  background-image: radial-gradient(transparent 0, rgba(0, 0, 0, .5) 100%), radial-gradient(transparent 33%, rgba(0, 0, 0, .3) 166%), url(https://assets.retiehe.com/blur/matterhorn.jpg)
}

.mainBox {
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, .1);
  border-radius: 10px;
  box-shadow: 0 20px 50px rgb(0 0 0 / 10%);
  margin: 0 auto;
  padding: 30px;
  transition: all .25s;
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  max-width: 400px;
}

.inputBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.my-input {
  margin-bottom: 15px;
  width: 85%;
}

.btn {
  width: 85%;
}

.info {
  color: red;
  margin-top: 10px;
}

.code-btn {
  position: absolute;
  right: 10%;
  bottom: 50%;
}

.title {
  color: rgba(0, 0, 0, .6);
  cursor: default;
  pointer-events: none;
  text-align: center;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
}
</style>