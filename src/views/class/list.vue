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
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="data" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="cid" label="ID" width="60" sortable>
				</el-table-column>
				<el-table-column prop="Name" label="名称" sortable>
				</el-table-column>
				<el-table-column prop="StudentCount" label="学生数量" sortable>
				</el-table-column>
				<el-table-column prop="TeacherCount" label="教师数量" sortable>
				</el-table-column>
				<el-table-column prop="HeadImgurl" label="班级logo" sortable>
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				filters: {
					id: '',
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
			...mapGetters({
				loading: 'listLoading',
			})
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			getData() {
				let para = {};
				this.$store.dispatch('getClassList',para);
			},
		},
	};

</script>

<style scoped>

</style>
