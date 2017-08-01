<template>
	<section>

		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="类别">
					<el-radio-group v-model="filters.category" @change="getData">
						<el-radio-button :label="1">新闻</el-radio-button>
						<el-radio-button :label="2">资料</el-radio-button>
						<el-radio-button :label="3">轮播图</el-radio-button>
					</el-radio-group>
				</el-form-item>
				<el-form-item style="float:right">
					<el-button type="success" @click="$router.push('/news/add')">添加新闻</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="currentData" highlight-current-row v-loading="loading" style="width: 100%;">

				<el-table-column prop="SortID" label="SortID">
				</el-table-column>
				<el-table-column prop="Title" label="标题">
				</el-table-column>
				<el-table-column prop="content" label="内容">
				</el-table-column>
				<el-table-column prop="Describtion" label="描述">
				</el-table-column>
				<el-table-column prop="IsHot" label="IsHot">
					<template scope="scope">
						<span>{{scope.row.IsHot.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="IsRed" label="IsRed">
					<template scope="scope">
						<span>{{scope.row.IsRed.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="IsSlide" label="IsSlide">
					<template scope="scope">
						<span>{{scope.row.IsSlide.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="IsSys" label="IsSys">
					<template scope="scope">
						<span>{{scope.row.IsSys.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="IsTop" label="IsTop">
					<template scope="scope">
						<span>{{scope.row.IsTop.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Status" label="Status">
				</el-table-column>
				<el-table-column prop="CanRely" label="CanRely">
					<template scope="scope">
						<span>{{scope.row.CanRely.toString()}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="Attach" label="附件">
					<template scope="scope">
						<el-button type="info" size="small">{{scope.row.Attachs.length}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="Albums" label="相册">
					<template scope="scope">
						<el-button type="info" size="small">{{scope.row.Albums.length}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="Comment" label="评论" align="center">
					<template scope="scope">
						<el-button type="info" size="small">{{scope.row.Comments.length}}</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="AddTime" label="时间">
				</el-table-column>
				
				<el-table-column fixed="right" label="操作" width="150" align="center">
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click.native="handleEdit(scope.row)">
							编辑
						</el-button>
						<el-button type="danger" size="small" 
							@click.native="handleDeleteuser(scope.row.Meid)">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<el-col :span="24" class="toolbar">
			<el-pagination
				layout="sizes, total, prev, pager, next"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:page-sizes="pageSizes"
				:total="total"
				style="float:right;">
			</el-pagination>
		</el-col>

	</section>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		name:'newsList',
		data() {
			return {
				page: 1,
				pageSize: 10,
				pageSizes: [10, 20, 30, 50],
				filters: {
					category: 1,
				},
			}
		},
		computed: {
			total(){
				return this.$store.getters.allNewsList.length
			},
			currentData(){
				let start = (this.page - 1) * this.pageSize;
				let end = this.page * this.pageSize;
				if (!this.$store.getters.allNewsList.length) {
					return this.getData();
				}
				return this.$store.getters.allNewsList.slice(start,end)
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getData() {
				let para = {
					category:this.filters.category,
					currentPage:this.page,
					pagesize:this.pageSize,
				}
				this.$store.dispatch('getNewsList',para);
			},
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			handleEdit(val){
				this.$store.commit('currentEditData',val)
				this.$router.push('/news/edit')
			},
			handleDeleteuser: function (Meid) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					let para = {
						Meid:Meid
					}
					this.$message({
						message: Meid,
						type: 'success',
					})
					// this.$teacherAPI.deleteTeacher(para).then(()=>{
					// 	this.$message({
					// 		message: '删除成功',
					// 		type: 'success',
					// 	})
					// 	this.getData()
					// }).catch((err) => {
					// 	console.error('fff>>>>', err);
					// 	this.$message({
					// 		message: '删除失败了哦!',
					// 		type: 'error',
					// 	})
					// })
				})
			},
		},
		mounted(){
		},
		watch:{
			"$route": "getData"
		},
	};

</script>

<style scoped>

</style>
