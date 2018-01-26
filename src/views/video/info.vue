<template>
  <div>
    <el-table :data="tableData" style="width: 100%;margin-top:20px;">
      <el-table-column prop="CreateTime" label="上传时间" align="center" width="200">
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
            <el-button type="danger" @click.native="handleDeleteVideo()">删除</el-button>
            <el-button type="primary" @click.native="$router.back()">返回视频列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-table>
    <div class="video">
      <div class="prism-player" id="J_prismPlayer"></div>  
    </div>
    
  </div>
</template>


<script>


export default {
  data(){
    return{
      videoAuth:'',
      player:null,
      info:{}
    }
  },
  computed:{
    tableData(){
      let array=[]
      array.push(this.info)
      return array
    }
  },
  methods:{
    getVideoAuth(){
      this.$API.getVideoAuth({videoId:this.info.VideoId}).then(res=>{
        this.videoAuth=res
        this.initPlayer()
      })
    },
    //删除视频
    handleDeleteVideo(){
      this.$confirm('确认删除该视频吗?', '提示', {
				type: 'warning'
			}).then(() => {
				this.$API.deleteVideo({videoid:this.info.AliyunCateID}).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					}).catch((err) => {
						this.$message({
							message: err.msg,
							type: 'error',
						})
					})
        this.$router.back
				})
			})
    },
    //初始化播放器
    initPlayer() {
      if (this.player) {
        this.player = null
      }
      this.player = new prismplayer({
        id: 'J_prismPlayer',
        width: '100%',
        height: '614px',
        autoplay: false,
        useH5Prism: true,
        vid: this.info.VideoId,
        playauth: this.videoAuth,
      })
    },
    getQuery(){
      if( this.$route.query.info){
        // this.$store.commit('setVideoInfo',this.$route.query.info)
        // console.log(this.$store.state.videoInfo)
        this.info= this.$route.query.info
      }
    }
  },
  created(){
    this.getQuery()
    this.getVideoAuth()
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


