<template>
  <section>

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item label="类别">
          <el-radio-group v-model="filters.isDelete" @change="getData">
            <el-radio-button :label="false">轮播图</el-radio-button>
            <el-radio-button :label="true">回收站</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="success" @click="addSwiper">
            <span>添加轮播图</span>
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <template>
      <el-table :data="currentData"  highlight-current-row style="width: 100%;" border>
        <el-table-column type="index" width="50">
    </el-table-column>
        <el-table-column prop="ID" label="ID" width="80" align="center">
        </el-table-column>
        <el-table-column prop="Title" label="名称" width="300" align="center">
        </el-table-column>
        <el-table-column prop="Link" label="指向链接" width="400"  show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <a :href="scope.row.Link">{{scope.row.Link&&scope.row.Link.indexOf('http://')!=-1?scope.row.Link.replace('http://',''):scope.row.Link}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="ImgUrl" label="图片" align="center">
          <template slot-scope="scope">
            <img class="viewImg" @click="showBigImg(scope.row.ImgUrl)" :src="scope.row.ImgUrl" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="AddTime" label="时间" align="center" width="200">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.native="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button v-if="scope.row.IsDelete" type="danger" size="small" @click.native="handleUnDeleteNews(scope.row.ID)">
              上架
            </el-button>
            <el-button v-else type="warning" size="small" @click.native="handleDeleteNews(scope.row.ID)">
              下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>

    </template>

    <el-col :span="24" class="toolbar">
      <el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    <el-dialog  :visible.sync="showEditForm" title="轮播图" size="small">
      <el-form label-width="80px">
        <el-form-item label="图片标题">
          <el-input v-model="data.Title" :disabled="isLook"></el-input>
        </el-form-item>    
        <el-form-item label="指向链接" v-if="data">
          <el-input v-model="data.Link" placeholder="jkyr.yearnedu.com"><template slot="prepend">Http://</template></el-input>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload class="uploadAlbum"  list-type="picture" ref="upImg" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :on-success="handleImageSuccess">
            <span>
              <el-button size="small" type="primary">点击上传</el-button>
            </span>
            <span slot="tip" class="el-upload__tip">
              <span style="color:red"> 建议宽高比为2:1</span></span>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditForm = false">取 消</el-button>
        <el-button type="primary" @click="submit">上传</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="showViewImg" id="imgDialog">
      <div style="text-align:center">
          <img :src="showImg" alt="">
      </div> 
    </el-dialog>

  </section>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
import { mapGetters } from 'vuex';
export default {
  name: 'newsList',
  components: { VueEditor },
  data() {
    return {
      data: {
        Title: '',
        Url: '',
        Type: 1,
        ImgUrl: ''
      },
      commentVisible: false,
      comment: {},
      isEdit: false,
      isLook: false,
      attachList: [],
      albumsList: [],
      page: 1,
      pageSize: 10,
      pageSizes: [10, 20, 30, 50],
      showEditForm: false,
      filters: {
        category: 3,
        isDelete:false
      },
      swiperList:[],
      showImg:'',
      showViewImg:false
    }
  },
  computed: {
    total() {
      return this.$store.getters.allNewsList.length
    },
    currentData() {
      let start = (this.page - 1) * this.pageSize;
      let end = this.page * this.pageSize;
      return this.swiperList.slice(start, end)
    },
    ...mapGetters({
      loading: 'listLoading',
    })
  },
  methods: {
    resetPage(){
      this.page=1;
    },
    showBigImg(e){
      this.showViewImg=true
      this.showImg=e;
    },
    addSwiper() {
      this.showEditForm = true
      this.isEdit = false
      this.isLook = false
      this.data = {
        Title: '',
        Link: '',
        Type: 1,
        ImgUrl: '',
        CategoryID: this.filters.category,
      }
    },
    handleImageAdded: function(file, Editor, cursorLocation) {
      var formData = new FormData();
      formData.append('image', file)
      axios({
        url: this.$store.getters._APIurl + '/api/Upload/ImageUpload',
        method: 'POST',
        data: formData
      })
        .then((result) => {
          let url = result.data.Content[0]
          Editor.insertEmbed(cursorLocation, 'image', url);
        })
        .catch((err) => {
          this.$message.error(err)
        })
    },
    handleImageSuccess(file, fileList) {
      if (file.Content) {
        this.data.ImgUrl = file.Content[0]
        this.$message.success('题图上传成功！')
      }
    },
    submit() {
      if (!this.data.Title) {
        this.$message.error('标题不能为空！')
        return
      }
      if (!this.data.Link) {
        this.$message.error('链接不能为空！')
        return
      }
      if (!this.data.ImgUrl) {
        this.$message.error('图片不能为空！')
        return
      }
    

      this.$sysAPI.addNews(this.data).then(() => {
        this.$message.success('添加成功')
        this.getData()
        this.$refs.upImg.clearFiles()
        this.showEditForm = false
      }).catch(err => {
        this.$message.error(err.msg)
      }) 
    },
    getData() {
      let para = {
        category: this.filters.category,
        currentPage: this.page,
        pagesize: this.pageSize,
        IsDelete: this.filters.isDelete
      }
      this.$API.getSwiperList(para).then((res) => {
        this.swiperList=res
        this.resetPage()
      }).catch()
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    handleLook(val) {
      this.data = val
      this.data.CategoryID = this.filters.category
      this.showEditForm = true
      this.isEdit = true
      this.isLook = true
    },
    handleEdit(val) {
      this.data = val
      this.data.CategoryID = this.filters.category
      this.showEditForm = true
      this.isEdit = true
      this.isLook = false
    },
    handleDeleteNews: function(id) {
      this.$confirm('确认下架该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          ID: id
        }
        this.$sysAPI.deleteNews(para).then(() => {
          this.$message({
            message: '下架成功',
            type: 'success',
          })
          this.getData()
        }).catch((err) => {
          this.$message({
            message: '下架失败了哦!',
            type: 'error',
          })
        })
      })
    },
    handleUnDeleteNews: function(id) {
      this.$confirm('确认上架该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        let para = {
          ID: id
        }
        this.$sysAPI.unDeleteNews(para).then(() => {
          this.$message({
            message: '上架成功',
            type: 'success',
          })
          this.getData()
        }).catch((err) => {
          console.error('fff>>>>', err);
          this.$message({
            message: '上架失败了哦!',
            type: 'error',
          })
        })
      })
    },
  },
  mounted() {
    this.getData()
  },
  watch: {
    "$route": "getData",
    data:function(val){
      if(this.data.Link.indexOf('http://')!=-1){
        this.data.Link=this.data.Link.replace('http://','')
      }
    }
  },
};

</script>

<style scoped>
  .viewImg{
    height:40px;
  }
  #imgDialog img{
    width: 100%;
  }
</style>
