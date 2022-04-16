<template>
  <div>
    <div>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="名称">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>

        <el-form-item label="类别">
          <el-select v-model="formInline.frequency">
            <el-option label="第一针" value="第一针"></el-option>
            <el-option label="第二针" value="第二针"></el-option>
            <el-option label="第三针" value="第三针"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="name" label="名称" width="120">
            </el-table-column>
            <el-table-column prop="frequency" label="类别" width="180">
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="180">
            </el-table-column
            ><el-table-column prop="endTime" label="结束时间" width="180">
            </el-table-column>
            <el-table-column label="接种点地址" width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  ctx[scope.row.address.split(",")[0]] +
                  ctx[scope.row.address.split(",")[1]] +
                  ctx[scope.row.address.split(",")[2]]
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="接种点名称" width="180">
            </el-table-column>
            <el-table-column prop="capacity" label="剩余容量" width="120">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  :disabled="disable(scope.row)"
                  type="primary"
                  size="small"
                  @click="handlePre(scope.$index, scope.row)"
                  >预约</el-button
                >
              </template>
            </el-table-column></el-table
          ></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
import { CodeToText } from "element-china-area-data";
const prefix = "/api/vacc";
const pre = "/api/pre";
export default {
  name: "UPre",
  data() {
    return {
      formInline: {
        name: "",
        frequency: "",
      },
      tableData: [],
      ctx: CodeToText,
    };
  },
  created() {
    this.$axios.get(`${prefix}/getVaccs`).then((data) => {
      const { data: tableData } = data.data;
      this.tableData = tableData;
    });
  },
  methods: {
    onSubmit() {
      const { name, frequency } = this.formInline;
      this.$axios
        .get(`${prefix}/getVaccs?name=${name}&frequency=${frequency}`)
        .then((data) => {
          const { data: tableData } = data.data;
          this.tableData = tableData;
        });
    },
    handlePre(index, row) {
      const { id } = row;
      const userId = sessionStorage.getItem("userId");
      this.$axios
        .post(`${pre}/order?userId=${userId}&vaccId=${id}`)
        .then((data) => {
          const { code } = data.data;
          if (code === 200) {
            this.$message({
              showClose: true,
              message: "预定成功",
              type: "success",
              duration: 2000,
            });
            this.$axios.get(`${prefix}/getVaccs`).then((data) => {
              const { data: tableData } = data.data;
              this.tableData = tableData;
            });
          } else {
            this.$message({
              showClose: true,
              message: "已预定",
              type: "error",
              duration: 2000,
            });
          }
        });
    },
    disable(row) {
      return row.capacity === 0;
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
