<template>
  <div>
    <!-- <div>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="身份证">
          <el-input v-model="formInline.card" placeholder="身份证"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div> -->
    <div>
      <el-button type="primary">新增</el-button>
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
      formInline: {
        user: "",
        region: "",
        phone: "",
        card: "",
      },
      tableData: [],
    };
  },
  created() {
    const adminId = sessionStorage.getItem("vadminId");
    this.$axios.get(`${prefix}/getVacc?adminId=${adminId}`).then((data) => {
      const { data: tableData } = data.data;
      this.tableData = tableData;
    });
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
