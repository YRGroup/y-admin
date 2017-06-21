<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="教师ID">
					<el-input v-model="filters.id" placeholder="教师ID"></el-input>
				</el-form-item>

				<el-form-item label="数据类型">
					<el-radio-group v-model="filtersType" @change="getDynamicList">
						<el-radio-button label="全部"></el-radio-button>
						<el-radio-button label="动态"></el-radio-button>
						<el-radio-button label="新闻"></el-radio-button>
						<el-radio-button label="通知"></el-radio-button>
						<el-radio-button label="作业"></el-radio-button>
					</el-radio-group>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" v-on:click="getDynamicList">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="dynamicList" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="id" label="ID" sortable>
				</el-table-column>
				<el-table-column prop="auther" label="作者" sortable>
				</el-table-column>
				<el-table-column prop="category" label="类别" sortable>
				</el-table-column>
				<el-table-column prop="date" label="时间" sortable>
				</el-table-column>
				<el-table-column prop="content" label="内容" min-width="200" sortable>
				</el-table-column>
				<el-table-column prop="albums.length" label="配图" sortable>
				</el-table-column>
				<el-table-column prop="comment.length" label="评论" sortable>
				</el-table-column>
				<el-table-column prop="like" label="点赞" sortable>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="150">
					<template scope="scope" >
						<el-button type="warning" size="small" @click="handleEdit(scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm">
				<el-form-item label="班级Id" prop="cid">
					<el-input v-model="editForm.cid" :disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级名" prop="Name">
					<el-input v-model="editForm.Name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="班级logo" prop="HeadImgurl">
					<el-input v-model="editForm.HeadImgurl" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit">提交</el-button>
			</div>
		</el-dialog>

		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit">提交</el-button>
			</div>
		</el-dialog>

	</section>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				filters: {
					id: '',
					type:0
				},
				filtersType:'',
				editFormVisible: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				editForm: {
					cid: '',
					Name:'',
					HeadImgurl: '',
				},
				addFormVisible: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: '',
				}
			}
		},
		computed: {
			dynamicList() {
				if (!this.$store.getters.dynamicList.length) {
					return this.getDynamicList();
				}
				return this.$store.getters.dynamicList;
			},
			dynamicType(){
				switch(this.filtersType){
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
			getData() {
				let para = {
					cid: this.filters.id||16,
					count:0,					
					type: this.dynamicType
				};
				this.$store.dispatch('getDynamicList',para);
			},
			handleEdit: function (row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					cid: '',
					Name:'',
					HeadImgurl: '',
				};
			},
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							let para = {
								cid : this.editForm.cid,
								Name : this.editForm.Name,
								HeadImgurl : this.editForm.HeadImgurl,
							}
							this.$classAPI.editClassInfo(para).then(() => {
								//NProgress.done();
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getData()
							});
						});
					}
				});
			},
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							//NProgress.start();
							let para = Object.assign({}, this.addForm, {
								all: {
									page: this.page,
									name: this.filters.name,
								},
							});
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							this.$store.dispatch('addUser', para).then(() => {
								//NProgress.done();
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
							});
						});
					}
				});
			},
		},
	};

</script>

<style scoped>

</style>
