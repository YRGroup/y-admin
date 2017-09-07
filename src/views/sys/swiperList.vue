<template>
	<section>
	
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="类别">
					<el-radio-group v-model="filters.category" @change="getData">
						<el-radio-button :label="3">轮播图</el-radio-button>
						<el-radio-button :label="0">回收站</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item style="float:right">
					<el-button type="success" @click="startAddNews">
						<span>添加轮播图</span>
					</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	
		<!--列表-->
		<template>
			<el-table :data="currentData" highlight-current-row v-loading="loading" style="width: 100%;" border>
				<el-table-column prop="Title" label="ID">
				</el-table-column>
				<el-table-column prop="Type" label="类别">
				</el-table-column>
				<el-table-column prop="Title" label="标题" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Link" label="链接" show-overflow-tooltip>
				</el-table-column>
				<el-table-column prop="Albums" label="图片">
					<template scope="scope">
						<el-button type="info" size="small">{{scope.row.Albums.length}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="时间" align="center"  width="200">
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="220" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" @click.native="handleEdit(scope.row)">
							编辑
						</el-button>
						<el-button type="warning" size="small" @click.native="handleDeleteNews(scope.row.ID)">
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
	
		<el-dialog :visible.sync="showEditForm" title="轮播图" size="small">
			<el-form label-width="80px">
				<el-form-item label="类型">
					<el-radio-group v-model="data.Type">
						<el-radio :label="1">站内链接</el-radio>
						<el-radio :label="2">站外链接</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="data.Title" :disabled="isLook"></el-input>
				</el-form-item>
				<el-form-item label="站内链接" v-show="data.Type==1">
					<el-input v-model="data.Link"></el-input>
				</el-form-item>
				<el-form-item label="站外链接" v-show="data.Type==2">
					<el-input v-model="data.Url"></el-input>
				</el-form-item>
				<el-form-item label="题图">
					<el-upload class="uploadAlbum" :action="$store.getters._APIurl+'/api/Upload/ImageUpload'" :on-success="handleImageSuccess">
						<span><el-button size="small" type="primary">点击上传</el-button></span>
						<span slot="tip" class="el-upload__tip"><span style="color:red"> 尺寸200*120</span> 只能上传jpg/png文件，且不超过500kb</span>
					</el-upload>
				</el-form-item>
			</el-form>
	
			<span slot="footer" class="dialog-footer">
				<el-button @click="showEditForm = false">取 消</el-button>
				<el-button type="primary" @click="submit">确认发布</el-button>
			</span>
	
		</el-dialog>
	
		<el-dialog title="查看评论" v-model="commentVisible" :close-on-click-modal="false">
			<el-table :data="comment" highlight-current-row>
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="UserName" label="作者" sortable>
				</el-table-column>
				<el-table-column prop="Content" label="内容" sortable>
				</el-table-column>
				<el-table-column prop="AddTime" label="时间" sortable>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template scope="scope">
						<el-button type="danger" size="small" @click="handleDeleteComment(scope.row.ID)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
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
				Link:'',
				Url:'',
				Type: 1,
				ImgUrl:''
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
				category: 1,
			},
		}
	},
	computed: {
		total() {
			return this.$store.getters.allNewsList.length
		},
		currentData() {
			let start = (this.page - 1) * this.pageSize;
			let end = this.page * this.pageSize;
			return this.$store.getters.allNewsList.slice(start, end)
		},
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		startAddNews() {
			this.showEditForm = true
			this.isEdit = false
			this.isLook = false
			this.data = {
				Title: '',
				Link:'',
				Url:'',
				Type: 1,
				ImgUrl:''
			}
		},
		handleImageAdded: function (file, Editor, cursorLocation) {
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
		handleAttachRemove(file, filelist) {
			if (file.response.Content) {
				let a = this.data.Attachs.findIndex(o => {
					return o.FilePath == file.response.Content[0]
				})
				this.data.Attachs.splice(a, 1)
				this.$message.warning('附件删除成功！')
			}
		},
		handleAttachSuccess(file, fileList) {
			if (file.Content) {
				let j = {}
				j.FilePath = file.Content[0]
				j.FileName = fileList.name
				this.data.Attachs.push(j)
				this.$message.success('附件上传成功！')
			}
		},
		handleAlbumRemove(file, filelist) {
			if (file.response.Content) {
				let a = this.data.Albums.findIndex(o => {
					return o.FilePath == file.response.Content[0]
				})
				this.data.Albums.splice(a, 1)
				this.$message.warning('图片删除成功！')
			}
		},
		handleAlbumSuccess(file, fileList) {
			if (file.Content) {
				let o = {}
				o.OriginalPath = file.Content[0]
				this.data.Albums.push(o)
				this.$message.success('图片上传成功！')
			}
		},
		handleImageSuccess(file, fileList) {
			if (file.Content) {
				this.data.ImgUrl = file.Content[0]
				this.$message.success('题图上传成功！')
			}
		},
		submit() {
			if (this.data.Title == '') {
				this.$message.error('标题不能为空！')
			} else if (this.data.Content == '') {
				this.$message.error('内容不能为空！')
			} else if (this.data.Describtion == '') {
				this.$message.error('摘要不能为空！')
			} else {
				this.$sysAPI.addNews(this.data).then(() => {
					this.$message.success('添加校园新闻成功！')
					let para = {
						category: this.data.CategoryID,
						currentPage: 1,
						pagesize: 10,
					}
					this.$store.dispatch('getNewsList', para);
					this.showEditForm = false
				}).catch(err => {
					this.$message.error(err.msg)
				})
			}

		},
		getData() {
			let para = {
				category: this.filters.category,
				currentPage: this.page,
				pagesize: this.pageSize,
				IsDelete: this.filters.category == 0
			}
			this.$store.dispatch('getNewsList', para);
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
		handleDeleteNews: function (id) {
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
					console.error('fff>>>>', err);
					this.$message({
						message: '下架失败了哦!',
						type: 'error',
					})
				})
			})
		},
		handleUnDeleteNews: function (id) {
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
		handleComment(val) {
			this.commentVisible = true
			this.comment = val
		},
		handleDeleteComment(id) {
			this.$confirm('确认删除该评论吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					ID: id
				}
				this.$sysAPI.deleteNewsComment(para).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					this.commentVisible = false
					this.getData()
				}).catch((err) => {
					console.error('fff>>>>', err);
					this.$message({
						message: '删除失败了哦!',
						type: 'error',
					})
				})
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
