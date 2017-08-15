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
						<el-radio-button :label="4">管理员</el-radio-button>
					</el-radio-group>
				</el-form-item>
	
				<el-form-item>
					<el-button type="warning" @click="showAddAccount = true">添加账号</el-button>
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
	
		<el-dialog title="添加账号" v-model="showAddAccount" :close-on-click-modal="false">
			<el-form label-width="80px">
				<el-form-item label="身份">
					<el-radio-group v-model="addAccountData_role">
						<el-radio-button :label="1" disabled >学生</el-radio-button>
						<el-radio-button :label="2" disabled >家长</el-radio-button>
						<el-radio-button :label="3" disabled >老师</el-radio-button>
						<el-radio-button :label="4">班主任</el-radio-button>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<el-form label-width="80px" :inline="true" v-for="(i,index) in addAccountData" :key="index">
				<el-form-item label="手机号">
					<el-input v-model="i.MobilePhone "></el-input>
				</el-form-item>
				<el-form-item label="姓名">
					<el-input v-model="i.truename"></el-input>
				</el-form-item>
				<el-form-item>
					<el-select v-model="i.ClassID" placeholder="请选择班级">
						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="text" :plain="true" @click.native="addAccountData.splice(index,1)">
						X
					</el-button>
				</el-form-item>
			</el-form>
			<el-form label-width="80px">
				<el-form-item>
					<el-button @click.native="addAccountData.push({MobilePhone : '',truename: '',ClassID :''})" type="text">添加一行</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="showAddAccount = false">取消</el-button>
				<el-button type="primary" @click.native="addAccountSubmit">提交</el-button>
			</div>
		</el-dialog>
	
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
			showAddAccount: false,
			addAccountData_role: 0,
			addAccountData: [{MobilePhone : '',truename: '',ClassID :''}]
		}
	},
	computed: {
		classList() {
			return this.$store.getters.classList
		},
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
			switch (val.Role) {
				case 3:
					this.$router.push('/teacher/info?teacherId=' + val.Meid)
					break
				case 2:
					this.$router.push('/parent/info?parentId=' + val.Meid)
					break
				case 1:
					this.$router.push('/student/info?studentId=' + val.Meid)
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
		addAccountSubmit() {
			if (this.addAccountData_role === 0) {
				this.$message.error('请选择身份类别')
			}else if(this.addAccountData.length<1){
				this.$message.error('至少添加一行')
			} else {
				this.addAccountData.forEach(o => {
					o.role = 1
					if(o.MobilePhone ==''||o.truename==''){
						this.$message.error('资料不完整')
						return
					}
				})
				this.$sysAPI.addTeacherAccount(this.addAccountData).then(res=>{
					this.$message.success('添加成功')
					this.showAddAccount=false
					this.getData()
				}).catch(err=>{
					this.$message.error(err.msg)
				})
			}
		}
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
