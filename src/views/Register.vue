<template>
  <div class="container">
    <div class="headerWrapper">
      <header class="header">
        <div class="headerContainer">
          <div class="headerFull">
            <div>
              <img
                src="../assets/logo.png"
                alt=""
                style="width: 32px; height: 32px"
              />
            </div>
            <div class="font">
              <span class="account">已经有账号了?</span>
              <el-link href="/login" class="link"> 登录 → </el-link>
            </div>
          </div>
        </div>
      </header>
    </div>
    <div class="application">
      <main class="main">
        <div class="space">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
        <div class="formWrapper">
          <div class="textSuggest">
            <div class="formContainer">
              <div>
                <span class="welcome">
                  欢迎来到接种管理系统！
                  <br />
                  开始你的旅程吧
                </span>
              </div>
              <div class="form">
                <div class="formItem">
                  <div class="label">输入您的名字</div>
                  <el-input class="input" v-model="name"></el-input>
                </div>
                <div class="formItem">
                  <div class="label">创建您的密码</div>
                  <el-input
                    class="input"
                    type="password"
                    v-model="password"
                  ></el-input>
                </div>
                <div class="formItem">
                  <div class="label">输入您的手机号</div>
                  <el-input class="input" v-model="phone"></el-input>
                </div>
                <div class="formItem">
                  <div class="label">输入您的身份证号</div>
                  <el-input class="input" v-model="card"></el-input>
                </div>
                <div class="formItem">
                  <div class="label" style="margin-bottom: 10px">
                    选择您的性别
                  </div>
                  <el-radio label="1" v-model="gender">男</el-radio>
                  <el-radio label="2" v-model="gender">女</el-radio>
                </div>
                <div class="formItem">
                  <el-button
                    type="primary"
                    style="margin-right: 20px"
                    @click="userRegister"
                  >
                    用户注册
                  </el-button>
                  <el-button type="primary"> 接种点管理员注册 </el-button>
                </div>
              </div>
            </div>
            <div class="tips">
              <div class="typo">
                <div class="m1">
                  <div class="mb1">
                    温馨提示：建议密码设置至少带三种不同的标点符号，谨防账号被盗噢！。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bottom">
          <div class="m6">
            <p class="bottomP">创建帐户即表示您同意我们的服务条款。</p>
          </div>
        </div>
        <img class="universe" alt="" src="../assets/universe.svg" />
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
const login = "/api/login";
export default {
  name: "Register",
  data() {
    return {
      name: "",
      card: "",
      phone: "",
      password: "",
      gender: "1",
    };
  },
  methods: {
    userRegister: function () {
      const { phone, password, card, gender, name } = this;
      const sex = gender === "1" ? "男" : "女";

      this.$axios.post(
        `${login}/userRegister?phone=${phone}&password=${password}&card=${card}&gender=${sex}&name=${name}`
      );
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex !important;
  align-items: stretch;
  height: 100% !important;
  flex-direction: column !important;
}

.headerWrapper {
  position: relative !important;
}
.header {
  position: absolute !important;
  right: 0;
  left: 0;
  background-color: transparent;
  z-index: 2 !important;
  font-size: 16px !important;
  padding-top: 16px !important;
  padding-bottom: 16px !important;
  display: block;
}
.headerContainer {
  padding-right: 40px !important;
  padding-left: 40px !important;
  align-items: center !important;
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
}
.headerFull {
  display: flex !important;
  align-items: stretch;
  width: 100% !important;
  align-items: center !important;
  justify-content: space-between !important;
}
.font {
  font-family: "Alliance No.1", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  word-break: keep-all;
}
.account {
  color: #627597 !important;
  margin-right: 8px !important;
}
.link {
  background-color: transparent;
  color: white !important;
  text-decoration: none;
}
.link :hover {
  text-decoration: underline;
}
.application {
  display: flex !important;
  align-items: stretch;
  flex: auto !important;
  flex-direction: column !important;
}
.main {
  background-color: #040d21;
  display: flex !important;
  align-items: stretch;
  overflow: hidden !important;
  position: relative !important;
  flex: auto !important;
  flex-direction: column !important;
  display: block;
}
.space {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
}
.star :nth-child(1) {
  background-position: 50% -40%;
  animation-delay: 0s;
}
.star {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-image: radial-gradient(
      2px 2px at 10px 20px,
      #eee,
      rgba(0, 0, 0, 0)
    ),
    radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
    radial-gradient(2px 2px at 90px 40px, #ddd, rgba(0, 0, 0, 0));
  background-repeat: repeat;
  background-size: 200px 200px;
  opacity: 0;
  animation: zoom 15s infinite;
}

@keyframes zoom {
  0% {
    opacity: 0;
    transform: scale(0.5);
    animation-timing-function: ease-in;
  }
  85% {
    opacity: 1;
    transform: scale(1.8);
    animation-timing-function: linear;
  }
  100% {
    opacity: 0.2;
    transform: scale(2.2);
  }
}

.formWrapper {
  display: flex !important;
  align-items: stretch;
  padding-top: 38px !important;
  flex: auto !important;
  justify-content: center !important;
}

.universe {
  top: 50%;
  left: 50%;
  width: 200%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  overflow: hidden !important;
  position: absolute !important;
  border-style: none;
}

.textSuggest {
  z-index: 1 !important;
  max-width: 654px;
  width: 100% !important;
}

.formContainer {
  background-color: #0c162d;
  border: 1px solid #202637;
  font-size: 16px !important;
  padding: 24px !important;
  margin: 24px !important;
  box-shadow: 0 1px 0 rgba(27, 31, 36, 0.04) !important;
  border-radius: 6px !important;
}

.welcome {
  color: #627597 !important;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace !important;
}

.form {
  position: relative !important;
}
.formItem {
  margin-top: 24px !important;
}
.label {
  color: #00cfc8;
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas,
    Liberation Mono, monospace !important;
  font-weight: 600;
}

.input /deep/ .el-input__inner {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: white;
  border-bottom: 1px solid !important;
}

.tips {
  font-family: "Alliance No.1", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol";
  word-break: keep-all;
  color: #627597 !important;
  font-size: 16px !important;
  padding-right: 24px !important;
  padding-left: 24px !important;
  margin-right: 24px !important;
  margin-left: 24px !important;
}
.typo {
  margin-top: 0;
  margin-bottom: 10px;
}
.m1 {
  margin: 4px !important;
}

.mb1 {
  margin-bottom: 4px !important;
}

.bottom {
  z-index: 2 !important;
  display: flex !important;
  justify-content: center !important;
  padding-top: 20px;
}
.m6 {
  margin-bottom: 40px !important;
  max-width: 654px;
}
.bottomP {
  color: #627597 !important;
  font-size: 12px !important;
  margin: 24px !important;
}
</style>
