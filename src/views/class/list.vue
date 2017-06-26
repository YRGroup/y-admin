<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.id" placeholder="班级ID"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getData">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAddClass">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="currentData" fixed 
				highlight-current-row v-loading="loading" 
				style="width: 100%;"
			>
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="cid" label="ID" width="70" sortable>
				</el-table-column>
				<el-table-column prop="Name" label="名称" sortable>
				</el-table-column>
				<el-table-column prop="HeadImgurl" label="班级logo" sortable :show-overflow-tooltip="true">
				</el-table-column>
				<el-table-column prop="StudentCount" label="学生" align="center" sortable>
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click="$router.push('/student/list?id='+scope.row.cid)">
							学生  {{scope.row.StudentCount}}
						</el-button>	
					</template>	
				</el-table-column>
				<el-table-column prop="TeacherCount" label="教师" align="center" sortable>
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click="$router.push('/teacher/list?id='+scope.row.cid)">
							教师  {{scope.row.TeacherCount}}
						</el-button>	
					</template>	
				</el-table-column>
				<el-table-column prop="cid" label="动态" align="center" sortable>
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click="$router.push('/post/list?id='+scope.row.cid)">
							动态
						</el-button>	
					</template>	
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="160" align="center">
					<template scope="scope" >
						<el-button type="warning" size="small" 
							@click="handleEditClass(scope.row)"
						>编辑</el-button>
						<el-button type="danger" size="small" 
							@click="handleDeleteClass(scope.row.cid)"
						>删除</el-button>
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

		<el-dialog title="编辑" v-model="editClassVisible" :close-on-click-modal="false">
			<el-form :model="editClassData" label-width="80px" ref="editClassDom">
				<el-form-item label="班级Id" prop="cid">
					<el-input v-model="editClassData.cid" :disabled="true"></el-input>
				</el-form-item>
				<el-form-item label="班级名" prop="Name">
					<el-input v-model="editClassData.Name"></el-input>
				</el-form-item>
				<el-form-item label="班级logo" prop="HeadImgurl">
					<el-input v-model="editClassData.HeadImgurl"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editClassVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editClassSubmit">提交</el-button>
			</div>
		</el-dialog>

		<el-dialog title="新增" v-model="addClassVisible" :close-on-click-modal="false">
			<el-form :model="addClassData" label-width="80px" :rules="addClassRules" ref="addClassDom">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addClassData.name"></el-input>
				</el-form-item>
				<el-form-item label="班级logo" prop="HeadImgurl">
					<el-input v-model="addClassData.HeadImgurl"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addClassVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addClassSubmit">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				page: 1,
				pageSize: 10,
				pageSizes: [10, 20, 30, 50],
				filters: {
					id: '',
				},
				editClassVisible: false,
				editClassData: {
					cid: '',
					Name:'',
					HeadImgurl: '',
				},
				addClassVisible: false,
				addClassRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				addClassData: {
					Name: '',
					HeadImgurl: '',
				},
			}
		},
		computed: {
			data() {
				if (!this.$store.getters.classList.length) {
					return this.getData();
				}
				return this.$store.getters.classList;
			},
			total(){
				return this.$store.getters.classList.length
			},
			currentData(){
				let start = (this.page - 1) * this.pageSize;
				let end = this.page * this.pageSize;
				if (!this.$store.getters.classList.length) {
					return this.getData();
				}
				return this.$store.getters.classList.slice(start,end)
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getData() {
				this.$store.dispatch('getClassList');
			},
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			handleEditClass: function (row) {
				this.editClassVisible = true;
				this.editClassData = Object.assign({}, row);
			},
			handleAddClass: function () {
				this.addClassVisible = true;
				this.addClassData = {
					Name: '',
					HeadImgurl: '',
				};
			},
			handleDeleteClass: function (cid) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					let para = {
						cid:cid
					}
					this.$classAPI.deleteClass(para).then(()=>{
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
			editClassSubmit: function () {
				this.$refs.editClassDom.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							this.$classAPI.editClassInfo(this.editClassData).then(() => {
								//NProgress.done();
								this.$refs['editClassDom'].resetFields();
								this.editClassVisible = false;
								this.getData()
							});
						});
					}
				});
			},
			addClassSubmit: function () {
				this.$refs.addClassDom.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							this.$classAPI.addClass(this.addClassData).then(() => {
								//NProgress.done();
								this.$refs['addClassDom'].resetFields();
								this.addClassVisible = false;
							});
						});
					}
				});
			},
		},
		mounted(){
			
		}
	};

</script>

<style scoped>

</style>
