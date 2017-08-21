<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item label="班级">
					<el-select v-model="selected"  placeholder="请选择">
						<el-option v-for="i in classList" :key="i.cid" :label="i.Name" :value="i.cid">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="$router.push('/parent/list?classId='+selected)">查询</el-button>
				</el-form-item>
				
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="currentData" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column fixed="left" type="index" width="60">
				</el-table-column>
				<el-table-column prop="ParentMeid" label="ID" sortable>
				</el-table-column>
				<el-table-column prop="ParentTrueName" label="名字" sortable>
				</el-table-column>
				<el-table-column prop="ParentPhone" label="手机" min-width="100" sortable>
				</el-table-column>
				<el-table-column prop="ParentType" label="身份" sortable>
				</el-table-column>
				<el-table-column prop="ParentHeadimgurl" align="center" label="头像">
					<template scope="scope">
						<el-popover
							ref="popover2"
							placement="bottom"
							title="图片预览"
							width="200"
							trigger="click">
							<img :src="scope.row.ParentHeadimgurl">
						</el-popover>
						<el-button size="small" v-popover:popover2>头像</el-button>
					</template>
				</el-table-column>
				<el-table-column label="学生" sortable>
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click.native="$router.push('/student/info?studentId='+scope.row.StudentMeid)">
							{{scope.row.StudentTrueName}}
						</el-button>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
					<template scope="scope" >
						<el-button type="primary" size="small" 
							@click.native="$router.push('/parent/info?parentId='+scope.row.ParentMeid)">
							详情
						</el-button>
						<el-button type="danger" size="small" 
							@click.native="handleDeleteParent(scope.row.ParentMeid)">
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
				selected :0,
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
				return this.$store.getters.parentList.length
			},
			classList() {
				if (!this.$store.getters.classList.length) {
					return this.$store.dispatch('getClassList')
				}
				return this.$store.getters.classList
			},
			currentData(){
				let start = (this.page - 1) * this.pageSize;
				let end = this.page * this.pageSize;
				if (!this.$store.getters.parentList.length) {
					return this.getData();
				}
				return this.$store.getters.parentList.slice(start,end)
			},
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			getClassList() {
			  this.$classAPI.getClassList().then(res => {
						this.classList = res;
						// this.classList.splice(0,0,{Name:'全部',cid:0});				
				});
			},
			getData() {
				if(this.$route.query.classId){
					this.filters.classId=this.$route.query.classId
				}
				let para = {
					cid: this.filters.classId,
				}
				this.$store.dispatch('getParentList',para);
			},
			handleSizeChange(val) {
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.page = val;
			},
			handleDeleteParent: function (Meid) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(()=>{
					let para = {
						Meid:Meid
					}
					this.$parentAPI.deleteParent(para).then(()=>{
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
			this.getClassList();
		},
		watch:{
			"$route": "getData"
		},
	};

</script>

<style scoped>

</style>
