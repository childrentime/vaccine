<template>
  <div>
    <div>
      <el-row>
        <el-col :span="24">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column fixed prop="name" label="姓名" width="120">
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
            <el-table-column label="状态" width="120">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{
                  scope.row.inoculate ? "已接种" : "未接种"
                }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="150">
              <template slot-scope="scope">
                <el-button
                  :disabled="disable(scope.row)"
                  type="danger"
                  size="small"
                  @click="handleDelete(scope.$index, scope.row)"
                  >取消</el-button
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
const pre = "/api/pre";
export default {
  name: "UPre",
  data() {
    return {
      tableData: [],
      ctx: CodeToText,
    };
  },
  created() {
    const userId = sessionStorage.getItem("userId");
    this.$axios.get(`${pre}/me?userId=${userId}`).then((data) => {
      const { data: tableData } = data.data;
      this.tableData = tableData;
    });
  },
  methods: {
    handleDelete(index, row) {
      const { id, preId } = row;
      const userId = sessionStorage.getItem("userId");
      this.$axios
        .post(`${pre}/cancelOrder?preId=${preId}&vaccId=${id}`)
        .then((data) => {
          const { code } = data.data;
          if (code === 200) {
            this.$message({
              showClose: true,
              message: "取消预定成功",
              type: "success",
              duration: 2000,
            });
            this.$axios.get(`${pre}/me?userId=${userId}`).then((data) => {
              const { data: tableData } = data.data;
              this.tableData = tableData;
            });
          }
        });
    },
    disable(row) {
      return row.inoculate;
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
