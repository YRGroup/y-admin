<template>
	<section>
	
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="身份">
					<el-radio-group v-model="filters.role" @change="getData">
						<el-radio-button :label="1">学生</el-radio-button>
						<el-radio-button :label="2">家长</el-radio-button>
						<el-radio-button :label="3">老师</el-radio-button>
					</el-radio-group>
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
				<el-table-column prop="Role" label="身份" sortable>
				</el-table-column>
				<el-table-column prop="Headimgurl" align="center" label="头像">
					<template scope="scope">
						<el-popover ref="popover2" placement="bottom" title="图片预览" width="200" trigger="click">
							<img :src="scope.row.Headimgurl">
						</el-popover>
						<el-button size="small" v-popover:popover2>头像</el-button>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150" align="center">
					<template scope="scope">
						<el-button type="primary" size="small" @click="openUserinfo(scope.row)">
							详情
						</el-button>
						<el-button type="danger" size="small" @click.native="handleDeleteuser(scope.row.Meid)">
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
	name: 'userList',
	data() {
		return {
			page: 1,
			pageSize: 10,
			pageSizes: [10, 20, 30, 50],
			filters: {
				role: 3,
			},
		}
	},
	computed: {
		total() {
			return this.$store.getters.allUserList.length
		},
		currentData() {
			let start = (this.page - 1) * this.pageSize;
			let end = this.page * this.pageSize;
			if (!this.$store.getters.allUserList.length) {
				return this.getData();
			}
			return this.$store.getters.allUserList.slice(start, end)
		},
		...mapGetters({
			loading: 'listLoading',
		})
	},
	methods: {
		getData() {
			let para = {
				role: this.filters.role,
			}
			this.$store.dispatch('getAllUserList', para);
		},
		openUserinfo(val) {
			console.log(val)
			switch(val.Role){
				case 3:
					this.$router.push('/teacher/info?teacherId='+val.Meid)
					break
				case 2:
					this.$router.push('/parent/info?parentId='+val.Meid)
					break
				case 1:
					this.$router.push('/student/info?studentId='+val.Meid)
					break
			}
		},
		handleSizeChange(val) {
			this.pageSize = val;
		},
		handleCurrentChange(val) {
			this.page = val;
		},
		handleDeleteuser: function (Meid) {
			this.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				let para = {
					Meid: Meid
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
	mounted() {
	},
	watch: {
		"$route": "getData"
	},
};

</script>

<style scoped>

</style>
