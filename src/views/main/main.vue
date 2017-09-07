<template>
	<section class="chart-container">
		<el-row>
			<el-col :span="12">
				<div id="chartBar" style="width:100%; height:400px;"></div>
			</el-col>
			<el-col :span="12">
				<div id="chartColumn" style="width:100%; height:400px;"></div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<div id="chartLine" style="width:100%; height:400px;"></div>
			</el-col>
			<el-col :span="12">
				<div id="chartPie" style="width:100%; height:400px;"></div>
			</el-col>
		</el-row>
	</section>
</template>

<script>
import echarts from 'echarts';

export default {
	data() {
		return {
			chartColumn: null,
			chartBar: null,
			chartLine: null,
			chartPie: null,
		}
	},
	mounted() {
		var _this = this;

		//基于准备好的dom，初始化echarts实例
		this.chartColumn = echarts.init(document.getElementById('chartColumn'));
		this.chartBar = echarts.init(document.getElementById('chartBar'));
		this.chartLine = echarts.init(document.getElementById('chartLine'));
		this.chartPie = echarts.init(document.getElementById('chartPie'));

		this.chartColumn.setOption({
			title: {
				text: '用户信息'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {  
					type: 'shadow'   
				}
			},
			legend: {
				data: ['已激活', '未激活']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value'
			},
			yAxis: {
				type: 'category',
				data: ['老师', '家长', '学生']
			},
			series: [
				{
					name: '已激活',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [320, 302, 301]
				},
				{
					name: '未激活',
					type: 'bar',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'insideRight'
						}
					},
					data: [120, 132, 101]
				},
			]
		});

		this.chartBar.setOption({
			title: {
				text: '学校信息',
				subtext: '数据来自网络',
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow',
				}
			},
			legend: {
				data: ['已激活', '未激活'],
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			yAxis: {
				type: 'value',
			},
			xAxis: {
				type: 'category',
				data: ['学校1', '学校2', '学校3', '学校4', '学校5', '学校6'],
			},
			series: [
				{
					name: '已激活',
					type: 'bar',
					stack: '总用户',
					data: [300, 354, 141, 155, 240, 320],
				},
				{
					name: '未激活',
					type: 'bar',
					stack: '总用户',
					data: [500, 600, 500, 300, 400, 700],
				}
			],
		});

		this.chartLine.setOption({
			title: {
				text: '用户活跃度',
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: ['新增用户', '已激活用户', '总用户'],
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true,
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['3月', '4月', '5月', '6月', '7月', '8月', '9月'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '新增用户',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210],
				},
				{
					name: '已激活用户',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310],
				},
				{
					name: '总用户',
					type: 'line',
					stack: '总量',
					data: [820, 932, 901, 934, 1290, 1330, 1320],
				},
			],
		});

		this.chartPie.setOption({
			title: {
				text: '访问来源',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			legend: {
				data: ['微信', '网页', '搜索引擎', '直接打开','APP'],
			},
			series: [
				{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [
						{ value: 335, name: '微信' },
						{ value: 310, name: '网页' },
						{ value: 234, name: '搜索引擎' },
						{ value: 135, name: '直接打开' },
						{ value: 1548, name: 'APP' },
					],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)',
						}
					}
				}
			],
		});
	}
}
</script>
