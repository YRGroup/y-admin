<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级ID">
					<el-input v-model="filters.cid" placeholder="班级ID:" style="width:50px;"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.cid" placeholder="请选择">
						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>
	
				<el-form-item label="数据类型">
					<el-radio-group v-model="filters.type" @change="getData">
						<el-radio-button label="0">全部</el-radio-button>
						<el-radio-button label="1">动态</el-radio-button>
						<el-radio-button label="2">新闻</el-radio-button>
						<el-radio-button label="3">通知</el-radio-button>
						<el-radio-button label="4">作业</el-radio-button>
					</el-radio-group>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" v-on:click="$router.push('/post/list?id='+filters.cid)">查询</el-button>
				</el-form-item>
				<el-form-item fixed="right">
					<el-button type="success" @click="handleAddPost">新增</el-button>
				</el-form-item>
	
			</el-form>
		</el-col>
	
		<!--列表-->
		<template>
			<el-table :data="currentData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" sortable>
				</el-table-column>
				<el-table-column prop="auther" label="作者" sortable>
				</el-table-column>
				<el-table-column prop="category" label="类别" sortable>
				</el-table-column>
				<el-table-column prop="date" label="时间" min-width="100" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" min-width="200" :show-overflow-tooltip="true" sortable>
				</el-table-column>
				<el-table-column prop="albums" label="配图">
					<template scope="scope">
						<el-button type="primary" size="small" v-if="scope.row.albums.length" @click="handleAlbums(scope.row.albums)">
							配图 {{scope.row.albums.length}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="comment" label="评论">
					<template scope="scope">
						<el-button type="primary" size="small" v-if="scope.row.comment.length" @click="handleComment(scope.row.comment)">
							评论 {{scope.row.comment.length}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="like" label="点赞" sortable>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template scope="scope">
						<el-button type="danger" size="small" @click="handleDeletePost(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
	
		<el-col :span="24" class="toolbar">
			<el-pagination layout="sizes, total, prev, pager, next" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	
		<el-dialog title="新增动态" v-model="addPostVisible" :close-on-click-modal="false">
			<el-form :model="addPostData" label-width="80px" :rules="addPostRules" ref="addPostDom">
				<el-form-item label="作者" prop="auther">
					<el-input v-model="addPostData.auther"></el-input>
				</el-form-item>
				<el-form-item label="类别" prop="type">
					<el-select v-model="addPostData.type">
						<el-option label="动态" value="1"></el-option>
						<el-option label="新闻" value="2"></el-option>
						<el-option label="通知" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容" prop="content">
					<el-input v-model="addPostData.content" type="textarea" :autosize="{ minRows: 4}"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addPostVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addPostSubmit">提交</el-button>
			</div>
		</el-dialog>
	
		<el-dialog title="查看配图" v-model="albumsVisible" :close-on-click-modal="false">
			<el-row :gutter="20">
				<el-col :span="6" v-for="i in albums" :key="i">
					<div class="pic">
						<img :src="$server+i">
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple"></div>
				</el-col>
			</el-row>
		</el-dialog>
	
		<el-dialog title="查看评论" v-model="commentVisible" :close-on-click-modal="false">
			<el-table :data="comment" highlight-current-row>
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="TrueName" label="作者" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" sortable>
				</el-table-column>
				<el-table-column prop="addTime" label="时间" sortable>
				</el-table-column>
				<el-table-column fixed="right" label="操作" align="center">
					<template scope="scope">
						<el-button type="danger" size="small" @click="handleDeleteComment(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-dialog>
	
	</section>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	name: 'postList',
	data() {
		return {
			page: 1,
			pageSize: 10,
			pageSizes: [10, 20, 30, 50],
			filters: {
				cid: '2',
				type: 0
			},
			addPostVisible: false,
			addPostRules: {
				auther: [
					{ required: true, message: '请输入作者ID', trigger: 'blur' }
				],
				type: [
					{ required: true, message: '请选择类别', trigger: 'blur' }
				],
				content: [
					{ required: true, message: '请输入内容', trigger: 'blur' }
				],
			},
			addPostData: {},
			albumsVisible: false,
			albums: [],
			commentVisible: false,
			comment: [],
		}
	},
	computed: {
		data() {
			if (!this.$store.getters.postList.length) {
				return this.getData();
			}
			return this.$store.getters.postList;
		},
		classList() {
			return this.$store.getters.classList
		},
		total() {
			return this.$store.getters.postList.length
		},
		currentData() {
			let start = (this.page - 1) * this.pageSize;
			let end = this.page * this.pageSize;
			if (!this.$store.getters.postList.length) {
				return this.getData();
			}
			return this.$store.getters.postList.slice(start, end)
		},
		dynamicType() {
			switch (this.filtersType) {
				case '全部':
					return 0
					break;
				case '动态':
					return 1
					break;
				case '新闻':
					return 2
					break;
				case '通知':
					return 3
					break;
				case '作业':
					return 4
					break;
				default:
					return 0
					break;
			}
		},
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		show(val) {
			console.log(val)
		},
		changeClass(n) {

		},
		getData() {
			if (this.$route.query.id) {
				console.log('route.query:')
				console.log(this.$route.query)
				this.filters.cid = this.$route.query.id
			}
			let para = {
				cid: this.filters.cid,
				pagesize: this.pageSize,
				currentPage: this.page,
				type: this.dynamicType
			};
			this.$store.dispatch('getPostList', para);
		},
		handleSizeChange(val) {
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.page = val;
		},
		handleAlbums (val) {
			this.albumsVisible = true
			this.albums = val
		},
		handleComment (val) {
			this.commentVisible = true
			this.comment = val
		},
		handleDeleteComment (cid) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					cid: cid
				}
				this.$postAPI.deleteNewsComment(para).then(() => {
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
		},
		handleDeletePost (did) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					did: did
				}
				this.$postAPI.deletePost(para).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					this.getData()
				}).catch((err) => {
					console.error('fff>>>>', err);
					this.$message({
						message: '删除失败了哦!',
						type: 'error',
					})
				})
			})
		},
		handleAddPost () {
			this.addPostVisible = true;
			this.addPostData = {
				auther: '',
				type: '1',
				content: '',
			};
		},
		addPostSubmit: function () {
			this.$refs.addPostDom.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						//NProgress.start();
						this.addPostData.cid = this.filters.cid
						this.$postAPI.addPost(this.addPostData).then(() => {
							//NProgress.done();
							this.$refs['addPostDom'].resetFields();
							this.addPostVisible = false;
							this.getData()
						});
					});
				}
			});
		},
	},
	mounted() {

	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped>

</style>
