<template>
	<section>
		<!--工具条-->
	
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级">
					<el-select v-model="selected" placeholder="全部">
						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="$router.push('/student/list?classId='+selected +'&p=0&key=')">查询</el-button>
				</el-form-item>
	
				<el-form-item label="学生姓名/学号">
					<el-input v-model="searchInput" placeholder="请输入学生姓名或者学号"></el-input>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="$router.push('/student/list?classId=0&p=0&key='+searchInput)">查询</el-button>
				</el-form-item>
	
			</el-form>
		</el-col>
	
		<!--列表-->
		<template>
			<el-table :data="studentList" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" label="序号" type="index" width="70">
				</el-table-column>
				<el-table-column prop="Headimgurl" align="center" label="头像">
					<template scope="scope">
						<img :src="scope.row.Headimgurl" width="50" height="50">
					</template>
				</el-table-column>
	
				<el-table-column prop="TrueName" label="名字" sortable>
				</el-table-column>
				<el-table-column prop="StudentID" label="学号" sortable>
				</el-table-column>
				<el-table-column prop="Sex" label="性别" sortable>
				</el-table-column>
				<el-table-column prop="ClassName" label="班级">
				</el-table-column>
				<el-table-column prop="Status" label="状态">
					<template scope="scope">
						<div>
							<span v-show="scope.row.Status==0" style="color:grey">未提交</span>
							<span v-show="scope.row.Status==1" style="color:green">正常</span>
							<span v-show="scope.row.Status==2" style="color:yellow">等待审核</span>
							<span v-show="scope.row.Status==3" style="color:red">审核失败</span>
						</div>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" @click.native="$router.push('/student/info?studentId='+scope.row.Meid)">
							详情
						</el-button>
						<el-button type="danger" size="small" @click.native="handleDeleteStudent(scope.row.Meid)">
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
	name: 'studentList',
	data() {
		return {
			page: 1,
			pageSize: 10,
			pageSizes: [10],
			filters: {
				cid: this.$route.query.classId || '0',
				key: this.$route.query.key || '',
				p: this.$route.query.p || '0',
			},
			selected: 0,
			classList: [{ Name: '全部', cid: 0 }],
			searchInput: '',
			studentList: [],
			total: 0,
		}
	},
	computed: {
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		getData() {
			this.filters.cid = this.$route.query.classId || '0';
			this.filters.key = this.$route.query.key || '';
			this.filters.p = this.$route.query.p || '0';
			this.getNowData();
		},
		getNowData() {
			let start = (this.filters.p - 1) * this.pageSize;
			let end = this.filters.p * this.pageSize;

			console.log(this.filters.cid + 'aaa' + this.filters.key);
			this.$studentAPI.getStudentList(this.filters).then(
				res => {
					this.total = res.Total;
					this.studentList = res.ModelList
				}
			)
		},
		getClassList() {
			this.$classAPI.getClassList().then(res => {
				this.classList = res;
				// this.classList.splice(0, 0, { Name: '全部', cid: 0 });
			});
		},
		handleSizeChange(val) {
			this.filters.p = val;
			this.pageSize = val;
			this.getNowData();
		},
		handleCurrentChange(val) {
			this.filters.p = val;
			this.page = val;
			this.getNowData();
		},
		handleDeleteStudent: function (Meid) {
			this.$confirm('确认删除该学生吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					Meid: Meid
				}
				this.$studentAPI.deleteStudent(para).then(() => {
					this.$message({
						message: '删除成功',
						type: 'success',
					})
					this.getData()
				}).catch((err) => {
					console.error('fff>>>>', err);
					this.$message({
						message: err.msg,
						type: 'error',
					})
				})
			})
		},
	},
	mounted() {
		this.getClassList();
		this.getData();
	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped>

</style>
