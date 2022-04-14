<template>
  <div class="container">
    <v-header :user="user"></v-header>
    <div class="main">
      <div class="slider">
        <el-menu
          :default-active="$route.path.substring(8)"
          class="list"
          light
          router
        >
          <el-menu-item
            v-for="item in $router.options.routes[4].children"
            :index="item.path"
            :key="item.name"
            class="item"
            >{{ item.name }}</el-menu-item
          >
        </el-menu>
      </div>

      <section class="content">
        <transition>
          <router-view></router-view>
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import header from "../../components/Header/header.vue";

const prefix = "/api/user";
export default {
  name: "VAdmin",
  data() {
    return {
      user: {
        name: "",
        gender: "",
        phone: "",
        card: "",
        title: "",
        address: "",
      },
    };
  },
  created() {
    const vadminId = sessionStorage.getItem("vadminId");
    if (!vadminId) {
      this.$message({
        showClose: true,
        message: "未登录，正在跳转",
        type: "error",
        duration: 2000,
        onClose: () => {
          this.$router.push("/login");
        },
      });
      return;
    }
    this.$axios.get(`${prefix}/getVadmin?vAdminId=${vadminId}`).then((data) => {
      const { data: user } = data.data;
      console.log(user);
      this.user = user;
    });
    console.log(this.$route.path.substring(8));
    console.log(this.$router);
  },
  components: {
    "v-header": header,
  },
};
</script>

<style scoped>
.container {
  width: 100vw;
  height: 100vh;
}

.main {
  display: flex;
  background: #f0f2f5;
}

.slider {
  width: 160px;
  height: calc(100vh - 60px);
  flex: 0 0 160px;
  max-width: 160px;
  min-width: 160px;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
}

.list {
  background-color: #f4f4f4;
  width: 100%;
}

.content {
  padding: 20px;
  flex: auto;
}

.el-menu {
  border: none;
}
.el-menu-item.is-active {
  color: #303133;
  background-color: rgba(82, 186, 181, 0.38);
}

.item {
  height: 56px;
  line-height: 56px;
  font-size: 14px;
  color: #303133;
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  box-sizing: border-box;
  white-space: nowrap;
}
</style>
