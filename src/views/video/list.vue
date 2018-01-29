<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true">

        <el-form-item label="年级">
          <el-select v-model="filter.grade" placeholder="请选择">
            <el-option v-for="item in gradeList" :key="item.ID" :label="item.GradeName" :value="item.ID"></el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="分类">
          <el-select v-model="filter.cateid" placeholder="请选择">
            <el-option v-for="item in categoryList " :key="item.CateID" :label="item.CateName" :value="item.CateID"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input clearable type="primary"  placeholder="输入关键字" v-model="seachText" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="getData()" >搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData" highlight-current-row style="width: 100%;">
        <el-table-column fixed="left" type="index" width="60">
        </el-table-column>
        <el-table-column prop="CreateTime" label="上传时间" align="center">
          <template slot-scope="scope">
            <span>
              {{scope.row.CreateTime.replace('T','  ')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="TrueName" label="上传人员" align="center">
        </el-table-column>
        <el-table-column prop="Title" label="视频名称" align="center">
        </el-table-column>
        <el-table-column prop="GradeName" label="年级" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="warm" size="small" @click.native="handleInfoVideo(scope.row)">
              详情
            </el-button>
            <el-button type="danger" size="small" @click.native="handleDeleteVideo(scope.row.AliyunCateID)">
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
import { mapGetters } from 'vuex';

export default {
  name: 'userList',
  data() {
    return {
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      currentPage:1,
      seachText:'',
      filter: {
        key: '',
        cateid: '',
        grade: ''
      },
      categoryList: [],
      gradeList:[],
      videoList:[]
    }
  },
  computed: {
    classList() {
      return this.$store.getters.classList;
    },
    total() {
      return this.videoList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize
      let end = this.page * this.pageSize
      return this.videoList.slice(start, end)
    }
  },
  methods: {
    //视频分类列表
    getCategoryList() {
      this.$API.getCategeryList().then(res => {
        this.categoryList=res
      });
    },
    //年级列表
    getGradeList() {
      this.$API.getGradeList().then(res => {
        this.gradeList = res
      });
    },
    //视频列表
    getData() {
      let para = this.filter
      para.currentPage=this.currentPage
      para.pageSize=this.pageSize
      this.$API.getVideoList(para).then(res => {
        this.videoList=res
      })
    },
  
    //查看视频
    handleInfoVideo(val){
      this.$router.push({
        path:`/video/info`,
        query:{
          info:val
        }
      })
    },
    //删除视频
    handleDeleteVideo(val){
      this.$confirm('确认删除该视频吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$API.deleteVideo({videoid:val}).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					}).catch((err) => {
						this.$message({
							message: err.msg,
							type: 'error',
						})
					})
					this.getData()
				})
			})
    },
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    }
  },
  created() {
    this.getCategoryList()
    this.getGradeList()
    this.getData()
  },
  mounted() {
  },
  watch: {
    "$route": "getData"
  },
};

</script>

<style lang="less" scoped>

.userImg {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.seach{
  margin-left: 10%;
}
.waring{
  color:#F56C6C;
}
.success{
  color:#67C23A;
} 
.addItem{
  border-left: 5px solid #67C23A;
  padding-left: 20px;
  padding-top: 20px;
  margin: 20px 0;
}
.addCol{
  display: inline-block;
  margin-top: 30px;
}
</style>
