<template>
  <div class="header">
    <div class="logo">
      <p>疫苗接种系统</p>
    </div>
    <div class="user">
      <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link" style="color: white">
          {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogFormVisible = true"
            >修改个人信息</el-dropdown-item
          >
          <el-dropdown-item @click.native="exit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" :label-width="formLabelWidth" prop="card">
          <el-input v-model="form.card" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const prefix = "/api/user/updateUser";
export default {
  props: {
    user: {},
  },
  data() {
    return {
      dialogFormVisible: false,

      form: {
        name: "",
        sex: "",
        phone: "",
        card: "",
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        card: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    exit: function () {
      sessionStorage.removeItem("userId");
      this.$router.push("/login");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { phone, card, sex, name } = this.form;
          const userId = sessionStorage.getItem("userId");
          this.$axios
            .post(
              `${prefix}?userId=${userId}&phone=${phone}&card=${card}&gender=${sex}&name=${name}`
            )
            .then((data) => {
              const { code } = data.data;
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: "修改成功",
                  type: "success",
                });
                this.resetForm(formName);
                this.$parent.getUser();
              } else {
                this.$message({
                  showClose: true,
                  message: "修改失败，手机号重复",
                  type: "error",
                });
              }
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
    },
  },
  watch: {
    user: function (val) {
      //监听props中的属性
      this.form.name = val.name;
      this.form.sex = val.gender;
      this.form.phone = val.phone;
      this.form.card = val.card;
    },
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
