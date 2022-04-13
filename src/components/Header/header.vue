<template>
  <div class="header">
    <div class="logo">
      <p>疫苗接种系统</p>
    </div>
    <div class="user">
      <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link" style="color: white">
          儿时<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // user: {},
  },
  data() {
    return {};
  },
};
</script>
<style scoped>
.header {
  height: 60px;
  background-color: #52bab5;
}

.logo {
  float: left;
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 20px;
  padding-left: 20px;
}

.user {
  float: right;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding-right: 20px;
}
</style>
