<template>
  <div>
    <div class="header">
      <div class="headerContainer">
        <img
          src="../assets/logo.png"
          alt=""
          style="width: 32px; height: 32px"
        />
      </div>
    </div>
    <div class="main">
      <div class="signin">新闻推荐系统</div>
      <div class="form">
        <div>
          <div class="username">用户名</div>
          <div>
            <el-input class="input"></el-input>
          </div>
          <div class="password">密码</div>
          <div>
            <el-input class="input" type="password"></el-input>
          </div>
          <div class="radio">
            <el-radio label="1">用户</el-radio>
            <el-radio label="2">接种点管理员</el-radio>
            <el-radio label="3">超级管理员</el-radio>
          </div>

          <div class="button">
            <el-button style="width: 100%" type="primary"> 登录 </el-button>
          </div>
        </div>
      </div>
      <p class="p">
        新用户？
        <el-link type="primary" href="/register">创建一个账号</el-link>
      </p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
};
</script>

<style scoped>
.header {
  padding-top: 32px !important;
  padding-bottom: 24px !important;
}
.headerContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.signin {
  font-size: 24px;
  font-weight: 300;
}
.form {
  border: 1px solid #d0d7de;
  border-radius: 2px;
  box-shadow: 0 12px 30px 0 rgb(59 59 97 / 18%);
  padding: 16px;
  font-size: 14px;
  margin-top: 16px !important;
  background-color: #f6f8fa;
  width: 350px;
}
.username {
  margin-bottom: 8px;
  font-weight: 400;
  text-align: left;
}
.password {
  margin-bottom: 8px;
  font-weight: 400;
  text-align: left;
}
.input {
  margin-bottom: 16px;
}
.radio {
  display: flex;
  gap: 5px;
}
.button {
  margin-top: 16px;
  margin-bottom: 4px;
}
.p {
  background-color: #f6f8fa;
  box-shadow: 0 12px 30px 0 rgb(59 59 97 / 18%);
  margin-top: 16px;
  padding: 16px 16px;
  text-align: center;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  width: 350px;
}
</style>
