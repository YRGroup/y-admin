<template>
  <section>
    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" width="200">
          <template slot-scope="scope">
            <el-tag  type="success">
              {{scope.row.nickname||'---'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="互动内容" align="center" width="200">
          <template slot-scope="scope">
            <el-popover
            placement="top-start"
            trigger="hover"
            :content="scope.row.content||'---'">
            <el-button type="text" slot="reference">{{scope.row.content||'--'}}</el-button>
          </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="addtime" label="发表时间" align="center">
          <template slot-scope="scope">
            {{formatTime(scope.row.addtime)}}
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button plain type="warning" size="small" @click.native="delComment(scope.row.ID)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import utils from "@/utils/utils";

export default {
  name: "userList",
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      seachText: "",
      filter: {
        key: "",
        cateid: "",
        grade: ""
      },
      gradeList: [],
      tableData: []
    };
  },
  computed: {
    total() {
      return this.tableData.length;
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      return this.tableData.slice(start, end);
    }
  },
  methods: {
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
    },
    formatTime(time) {
      let t = utils.formatTime(time);
      return `${t.Y}-${t.M}-${t.D} ${t.h}:${t.m}:${t.s}`;
    },
    getLiveRooms() {
      this.$API.getLiveRooms().then(res => {
        this.tableData = res;
      });
    },
    getTableData() {
      let para = {
        lid: this.id,
        curid: this.curid
      };
      this.$API.getCommentsList(para).then(res => {
        console.log(res);
        this.tableData = res;
      });
    },
    delComment(id) {
      let para = {
        id: id,
        lid: this.id
      };
      let This = this;
      this.$confirm("确认删除此条评论？", "提示").then(() => {
        this.$API.delComment(para).then(res => {
          this.getTableData()
        });
      });
    }
  },

  created() {
    this.id = this.$route.params.id;
    this.getTableData();
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.userImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.seach {
  margin-left: 10%;
}
.waring {
  color: #f56c6c;
}
.success {
  color: #67c23a;
}
.addItem {
  border-left: 5px solid #67c23a;
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px 0;
}
.addCol {
  display: inline-block;
  margin-top: 30px;
}
</style>
