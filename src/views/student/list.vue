<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级ID">
					<el-input v-model="filters.classId" placeholder="班级ID"></el-input>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="$router.push('/student/list?classId='+filters.classId)">查询</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="currentData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="Meid" label="ID" sortable>
				</el-table-column>
				<el-table-column prop="TrueName" label="名字" sortable>
				</el-table-column>
				<el-table-column prop="StudentID" label="学号" sortable>
				</el-table-column>
				<el-table-column prop="Sex" label="性别" sortable>
				</el-table-column>
				<el-table-column prop="userImg" align="center" label="头像">
					<template scope="scope">
						<el-popover
							ref="popover2"
							placement="bottom"
							title="图片预览"
							width="200"
							trigger="click">
							<img :src="scope.row.userImg">
						</el-popover>
						<el-button size="small" v-popover:popover2>头像</el-button>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click.native="$router.push('/student/info?studentId='+scope.row.Meid)">
							详情
						</el-button>
						<el-button type="danger" size="small" 
							@click.native="handleDeleteStudent(scope.row.Meid)">
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
		name:'teacherList',
		data() {
			return {
				page: 1,
				pageSize: 10,
				pageSizes: [10, 20, 30, 50],
				filters: {
					classId: '1',
				},
			}
		},
		computed: {
			total(){
				return this.$store.getters.studentList.length
			},
			currentData(){
				let start = (this.page - 1) * this.pageSize;
				let end = this.page * this.pageSize;
				if (!this.$store.getters.studentList.length) {
					return this.getData();
				}
				return this.$store.getters.studentList.slice(start,end)
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getData() {
				if(this.$route.query.classId){
					this.filters.classId=this.$route.query.classId
				}
				let para = {
					cid: this.filters.classId,
				}
				this.$store.dispatch('getStudentList',para);
			},
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			handleDeleteStudent: function (Meid) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					let para = {
						Meid:Meid
					}
					this.$studentAPI.deleteStudent(para).then(()=>{
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
