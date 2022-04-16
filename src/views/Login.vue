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
      <div class="signin">接种管理系统</div>
      <div class="form">
        <div>
          <div class="phone">手机号</div>
          <div>
            <el-input class="input" v-model="phone"></el-input>
          </div>
          <div class="password">密码</div>
          <div>
            <el-input
              class="input"
              type="password"
              v-model="password"
            ></el-input>
          </div>
          <div class="radio">
            <el-radio v-model="role" label="1">用户</el-radio>
            <el-radio v-model="role" label="2">接种点管理员</el-radio>
            <el-radio v-model="role" label="3">超级管理员</el-radio>
          </div>

          <div class="button">
            <el-button style="width: 100%" type="primary" @click="login">
              登录
            </el-button>
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
const login = "/api/login";
export default {
  name: "Login",
  data() {
    return {
      phone: "",
      password: "",
      role: "1",
    };
  },
  methods: {
    login: function () {
      const { phone, password } = this;
      if (this.role === "1") {
        this.$axios
          .post(`${login}/userLogin?phone=${phone}&password=${password}`)
          .then((data) => {
            const { code, data: id } = data.data;
            if (code === 200) {
              sessionStorage.setItem("userId", id);
              this.$router.push("/uadmin/pre");
            } else {
              this.$message({
                showClose: true,
                message: "密码错误",
                type: "error",
              });
            }
          });
      } else if (this.role === "2") {
        this.$axios
          .post(`${login}/vAdminLogin?phone=${phone}&password=${password}`)
          .then((data) => {
            const { code, data: id } = data.data;
            if (code === 200) {
              sessionStorage.setItem("vadminId", id);
              this.$router.push("/vAdmin/appointment");
            } else {
              this.$message({
                showClose: true,
                message: "密码错误",
                type: "error",
              });
            }
          });
      }
    },
  },
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
.phone {
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
