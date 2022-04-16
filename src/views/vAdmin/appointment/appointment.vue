<template>
  <div>
    <div>
      <el-button type="primary" @click="dialogFormVisible = true"
        >新增</el-button
      >
      <el-dialog title="发布预约名额" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item
            label="疫苗名称"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="类别"
            :label-width="formLabelWidth"
            prop="frequency"
          >
            <el-select v-model="form.frequency" placeholder="请选择类别">
              <el-option label="第一针" value="第一针"></el-option>
              <el-option label="第二针" value="第二针"></el-option>
              <el-option label="第三针" value="第三针"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="开始时间"
            :label-width="formLabelWidth"
            prop="startTime"
          >
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择开始时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="结束时间"
            :label-width="formLabelWidth"
            prop="endTime"
          >
            <el-date-picker
              v-model="form.endTime"
              value-format="yyyy-MM-dd hh:mm:ss"
              type="datetime"
              placeholder="选择结束时间"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="容量"
            :label-width="formLabelWidth"
            prop="capacity"
          >
            <el-input v-model="form.capacity" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%" height="450">
            <el-table-column prop="name" label="疫苗名称" width="180">
            </el-table-column>
            <el-table-column prop="frequency" label="类型" width="180">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="200">
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间" width="200">
            </el-table-column>
            <el-table-column prop="capacity" label="容量">
            </el-table-column> </el-table
        ></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
const prefix = "/api/vacc";
export default {
  name: "Appointment",
  data() {
    return {
      dialogFormVisible: false,
      tableData: [],
      form: {
        name: "",
        frequency: "",
        startTime: "",
        endTime: "",
        capacity: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        frequency: [
          { required: true, message: "请选择类别", trigger: "change" },
        ],
        startTime: [
          { required: true, message: "请选择开始时间", trigger: "blur" },
        ],
        endTime: [
          { required: true, message: "请选择结束时间", trigger: "blur" },
        ],
        capacity: [{ required: true, message: "请输入容量", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    const adminId = sessionStorage.getItem("vadminId");
    this.getData(adminId);
  },
  methods: {
    getData: function (adminId) {
      this.$axios.get(`${prefix}/getVacc?adminId=${adminId}`).then((data) => {
        const { data: tableData } = data.data;
        this.tableData = tableData;
      });
    },
    submitForm(formName) {
      const adminId = sessionStorage.getItem("vadminId");
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const { name, frequency, startTime, endTime, capacity } = this.form;
          this.$axios
            .post(
              `${prefix}/publish?name=${name}&frequency=${frequency}&startTime=${startTime}&endTime=${endTime}&capacity=${capacity}&adminId=${adminId}`
            )
            .then((data) => {
              const { code } = data.data;
              if (code === 200) {
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success",
                });
                this.getData(adminId);
                this.resetForm(formName);
              } else {
                this.$message({
                  showClose: true,
                  message: "添加失败，请联系管理员",
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
};
</script>

<style scoped>
section {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}
</style>
