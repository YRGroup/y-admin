<template>
	<section>
	
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>添加新闻</span>
			</div>
			<el-form label-width="80px">
				<el-form-item label="类型">
					<el-radio-group v-model="data.CategoryID">
						<el-radio :label="1">新闻</el-radio>
						<el-radio :label="2">资料</el-radio>
						<el-radio :label="3">轮播图</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="data.Title"></el-input>
				</el-form-item>
				<el-form-item label="内容" v-show="data.CategoryID!=3">
					<vue-editor v-model="data.Content" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="data.Describtion"></el-input>
				</el-form-item>
			</el-form>
			<el-form label-width="80px">
				<el-form-item label="附件" v-show="data.CategoryID==2">
					<el-upload class="uploadAttach" :action="$store.getters._APIurl+'/api/Upload/FileUpload'" :on-remove="handleAttachRemove" :on-success="handleAttachSuccess">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">文件尺寸不超过3Mb</div>
					</el-upload>
				</el-form-item>
				 <el-form-item label="相册" v-show="data.CategoryID==3">
					<el-upload class="uploadAlbum" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :on-success="handleAlbumSuccess">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item> 
			</el-form>
			<el-form label-width="80px" :inline="true">
				<el-form-item label="属性">
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.IsHot">IsHot</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.IsRed">IsRed</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.IsSlide">IsSlide</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.IsSys">IsSys</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.IsTop">IsTop</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="data.CanRely">CanRely</el-checkbox>
				</el-form-item>
				<el-form-item label="状态">
					<el-input v-model="data.Status" style="width:70px" type="number"></el-input>
				</el-form-item>
				<el-form-item label="排序">
					<el-input v-model="data.SortID" style="width:70px" type="number"></el-input>
				</el-form-item>
			</el-form>
			
			<el-col :span="24" class="toolbar" style="text-align:center;">
				<el-button type="primary" @click="submit">确认发布</el-button>
			</el-col>
		</el-card>
	
	</section>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import axios from 'axios'

export default {
	components:{VueEditor},
	data() {
		return {
			data: {
				Title:'',
				Content:'',
				Describtion:'',
				CategoryID:1,
				Status:1,
				SortID:1,
				Albums:[],
				Attachs:[],
			},
			attachList: [],
			albumsList: [],
		}
	},
	computed: {
	},
	methods: {
		getData() {
			if(this.$route.query.id){
				
			}
		},
		handleImageAdded: function(file, Editor, cursorLocation) {
			var formData = new FormData();
			formData.append('image', file)
			axios({
				url: this.$store.getters._APIurl+'/api/Upload/ImageUpload',
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
		handleAttachRemove(file,filelist){
			if (file.response.Content) {
				let a = this.data.Attachs.findIndex(o=>{
					return o.FilePath==file.response.Content[0]
				})
				this.data.Attachs.splice(a,1)
				this.$message.warning('附件删除成功！')
			}
		},
		handleAttachSuccess(file, fileList) {
			if (file.Content) {
				let j={}
				j.FilePath=file.Content[0]
				this.data.Attachs.push(j)
				this.$message.success('附件上传成功！')
			}
		},
		handleAlbumRemove(file,filelist){
			if (file.response.Content) {
				let a = this.data.Albums.findIndex(o=>{
					return o.FilePath==file.response.Content[0]
				})
				this.data.Albums.splice(a,1)
				this.$message.warning('图片删除成功！')
			}
		},
		handleAlbumSuccess(file, fileList) {
			if (file.Content) {
				let o={}
				o.OriginalPath=file.Content[0]
				this.data.Albums.push(o)
				this.$message.success('图片上传成功！')
			}
		},
		submit() {
			this.$sysAPI.addNews(this.data).then(() => {
				this.$message.success('添加校园新闻成功！')
				let para = {
					category:this.data.CategoryID,
					currentPage:1,
					pagesize:10,
				}
				this.$store.dispatch('getNewsList',para);
				this.$router.push('/news/list')
			}).catch(err => {
				this.$message.error(err.msg)
			})
		}
	},
	mounted() {
		this.getData()
	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped>

</style>
