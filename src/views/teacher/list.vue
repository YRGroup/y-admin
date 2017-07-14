<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级ID">
					<el-input v-model="filters.classId" placeholder="班级ID"></el-input>
				</el-form-item>
	
				<el-form-item>
					<el-button type="primary" @click="$router.push('/teacher/list?classId='+filters.classId)">查询</el-button>
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
				<el-table-column prop="Mobilephone" label="手机" sortable>
				</el-table-column>
				<el-table-column prop="TrueName" label="名字" sortable>
				</el-table-column>
				<el-table-column prop="Sex" label="性别" sortable>
				</el-table-column>
				<el-table-column prop="Course" label="科目" sortable>
				</el-table-column>
				<el-table-column prop="Headimgurl" align="center" label="头像">
					<template scope="scope">
						<el-popover ref="popover2" placement="bottom" title="图片预览" width="200" trigger="click">
							<img :src="scope.row.Headimgurl">
						</el-popover>
						<el-button size="small" v-popover:popover2>头像</el-button>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" @click.native="$router.push('/teacher/info?teacherId='+scope.row.Meid)">
							详情
						</el-button>
						<el-button type="warning" size="small" @click.native="handleEditTeacher(scope.row)">
							编辑
						</el-button>
						<el-button type="danger" size="small" @click.native="handleDeleteTeacher(scope.row.Meid)">
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
	
		<el-dialog title="编辑教师信息" v-model="editTeacherVisible" :close-on-click-modal="false">
			<el-form :model="editTeacherData" label-width="80px" ref="editTeacherDom">
				<el-form-item label="教师Id">
					<el-input v-model="editTeacherData.Meid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="editTeacherData.TrueName"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-input v-model="editTeacherData.Sex"></el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input v-model="editTeacherData.SelfDiscription"></el-input>
				</el-form-item>
				<el-form-item label="头像">
					<el-input v-model="editTeacherData.Headimgurl"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editTeacherVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editTeacherSubmit">提交</el-button>
			</div>
		</el-dialog>
	
	</section>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'teacherList',
	data() {
		return {
			page: 1,
			pageSize: 10,
			pageSizes: [10, 20, 30, 50],
			filters: {
				classId: '1',
			},
			editTeacherVisible: false,
			editTeacherData: {
				Meid: '',
				TrueName: '',
				Sex: '',
				SelfDiscription: '',
				Headimgurl: '',
			},
		}
	},
	computed: {
		total() {
			return this.$store.getters.teacherList.length
		},
		currentData() {
			let start = (this.page - 1) * this.pageSize;
			let end = this.page * this.pageSize;
			if (!this.$store.getters.teacherList.length) {
				return this.getData();
			}
			return this.$store.getters.teacherList.slice(start, end)
		},
		data() {
			if (!this.$store.getters.teacherList.length) {
				return this.getData();
			}
			return this.$store.getters.teacherList;
		},
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		getData() {
			if (this.$route.query.classId) {
				this.filters.classId = this.$route.query.classId
			}
			let para = {
				cid: this.filters.classId,
				count: 0
			}
			this.$store.dispatch('getTeacherList', para);
		},
		handleSizeChange(val) {
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.page = val;
		},
		handleEditTeacher: function (row) {
			this.editTeacherVisible = true
			this.editTeacherData = Object.assign({}, row)
		},
		handleDeleteTeacher: function (Meid) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					Meid: Meid
				}
				this.$teacherAPI.deleteTeacher(para).then(() => {
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
		editTeacherSubmit: function () {
			this.$refs.editTeacherDom.validate((valid) => {
				if (valid) {
					this.$confirm('确认提交吗？', '提示', {}).then(() => {
						//NProgress.start();
						this.$teacherAPI.editTeacher(this.addTeacherData).then(() => {
							//NProgress.done();
							this.$refs['editTeacherDom'].resetFields();
							this.editTeacherVisible = false;
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
