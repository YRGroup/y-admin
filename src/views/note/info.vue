<template>
  <div>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form  :inline="true">
        <el-form-item>
          <el-input clearable type="primary"  placeholder="输入手机号或ID" v-model="searchText" @change="searchData"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="warn" @click="$router.back()" >返回</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="currentData" style="width: 100%;margin-top:20px;">
      <el-table-column prop="Key" label="接收人ID" align="center" width="200">
        </el-table-column>
        <el-table-column prop="Value" label="接收号码" align="center">
        </el-table-column>
        <!-- <el-table-column fixed="right" label="操作" width="230">
          <template slot-scope="scope">
            <el-button type="danger" @click.native="handleDeleteVideo()">删除</el-button>
            <el-button type="primary" @click.native="$router.back()">返回视频列表</el-button>
          </template>
        </el-table-column> -->
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>

export default {
  data(){
    return{
      phoneList:[],   //存原数组
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      searchText:'',
      currentPhoneList:[]   //存查找的数组
    }
  },
  computed:{
    currentData:{
      get(){
         let start = (this.page - 1) * this.pageSize
        let end = this.page * this.pageSize
        return this.currentPhoneList.slice(start, end)
      },
      set(val){
        return val
      }
    },
    total(){
      return this.currentPhoneList.length
    }
  },
  methods:{
    //切换每页数据量
    handleSizeChange(val) {
      this.pageSize = val;
    },
    //切换页码
    handleCurrentChange(val) {
      this.page = val;
    },
    getQuery(){
      if(this.$route.query.info){
        this.phoneList=JSON.parse(this.$route.query.info)
        this.currentPhoneList= this.phoneList
      }
    },
    searchData(){
      let str=this.searchText.replace(/\s+/g,"")
      if(!str){
        this.currentPhoneList=this.phoneList
        return
      }
      let array=[]
      this.phoneList.forEach((el) => {
        if(el.Value.includes(str)||el.Key.includes(str)){
          array.push(el)
        }
      })
      this.currentPhoneList=array
    }
  },
  created(){
    this.getQuery()
  }
}
</script>
<style lang="less" scoped>
  .video{
    width: 100%;
    max-width: 1000px;
    margin: 30px auto;
  }
</style>


