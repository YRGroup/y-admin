<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">
        <el-form-item >
          <!-- <el-button type="warning"  @click="$router.push('/live/config');">新开直播</el-button> -->
          <el-button type="warning"  @click="addLive">新开直播</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="Title" label="直播标题" align="center" width="200">
          <template slot-scope="scope">
            <el-tag  type="success">
              {{scope.row.Title||'---'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="WXShareContent" label="分享内容" align="center" width="200">
          <template slot-scope="scope">
            <el-popover
            placement="top-start"
            title="微信分享"
            trigger="hover"
            :content="scope.row.WXShareContent||'---'">
            <el-button type="text" slot="reference">{{scope.row.WXShareContent||'---'}}</el-button>
          </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="PlayUrl" label="播放地址" align="center">
          <template slot-scope="scope">
            <el-popover
            placement="top-start"
            trigger="hover"
            :content="scope.row.PlayUrl||'---'">
            <el-button type="text" slot="reference">{{scope.row.PlayUrl||'---'}}</el-button>
          </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="PushUrl" label="推流地址" :show-overflow-tooltip="true" align="center">
          <template slot-scope="scope">
            <el-popover
            placement="top-start"
            trigger="hover"
            :content="scope.row.PushUrl||'---'">
            <el-button type="text" slot="reference">{{scope.row.PushUrl||'---'}}</el-button>
          </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="IsVote" label="是否投票" align="center">
          <template slot-scope="scope">
            {{scope.row.IsVote?'是':'否'}}  
          </template>
        </el-table-column>
        <!-- <el-table-column prop="SMS.Phones" label="接收人数" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="warm" size="small" @click.native="checkNodeInfo(scope.row.SMS.Phones)">
              {{JSON.parse(scope.row.SMS.Phones).length}}
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="warm" size="small" @click.native="handleInfoVideo(scope.row.ID)">
              详情
            </el-button> -->
            <el-button type="default" size="small" @click.native="editLive(scope.row.ID)">
              配置
            </el-button>
            <el-button type="default" size="small" @click.native="editLivePrograms(scope.row.ID, scope.row.IsVote)">
              编辑节目
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
    editLive(id) {
      this.$router.push(`/live/config/${id}`);
    },
    editLiveInfo(id) {
      this.$router.push(`/live/info/${id}`);
    },
    editLivePrograms(id, IsVote) {
      this.$router.push({
        path: `/live/program/${id}`,
        query: {
          IsVote: IsVote
        }
      });
    },
    addLive() {
      this.$API.addLiveRoom().then(res => {
        this.getLiveRooms();
      });
    },

    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
    },
    getLiveRooms() {
      this.$API.getLiveRooms().then(res => {
        this.tableData = res;
      });
    }
  },
  created() {
    this.getLiveRooms();
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
