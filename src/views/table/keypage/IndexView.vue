<template>
    <th-card>
        <template #title>基本信息</template>
        <template #extra>
            <div class="flex gap-1">
                <el-input placeholder="Approved by" style="width: 200px;" />
                <el-button type="danger">重置</el-button>
            </div>
        </template>
        <el-form :inline="true" class="demo-form-inline" label-width="120px">
            <el-form-item label="Approved by">
                <el-input placeholder="Approved by" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select placeholder="Activity zone" style="width: 200px;">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="11Approved by">
                <el-input placeholder="Approved by" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select placeholder="Activity zone" style="width: 200px;">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="Approved by">
                <el-input placeholder="Approved by" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select placeholder="Activity zone" style="width: 200px;">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="Approved by">
                <el-input placeholder="Approved by" style="width: 200px;" />
            </el-form-item>
            <el-form-item label="Activity zone">
                <el-select placeholder="Activity zone" style="width: 200px;">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
    </th-card>
    <th-card title="基本信息" class="mt-3">
        <template ##extra>
            <div class="flex gap-1">
                <el-input placeholder="Approved by" style="width: 200px;" />
                <el-button type="primary">新增</el-button>
            </div>
        </template>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="xh" label="序列"> </el-table-column>
            <el-table-column prop="name" label="姓名11"> </el-table-column>
            <el-table-column prop="online" label="上线"> </el-table-column>
            <el-table-column prop="date" label="日期"> </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
            <el-table-column fixed="right" label="操作">
                <template #default>
                    <div class=" flex gap-1 w-3">
                        <el-button type="primary" size="small">查看</el-button>
                        <el-button type="primary" size="small">编辑</el-button>
                        <el-button size="small">更多</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="mt-3 mb-3 bg-white w-full h-4">
            <el-pagination class="float-right" background layout="prev, pager, next, jumper" :total="1000"></el-pagination>
        </div>
    </th-card>
    <th-card title="图形分析" class="mt-3">
        <div class="h-96">
            <how-line-chart :option="option"></how-line-chart>
        </div>
    </th-card>
</template>
<script lang="ts" setup>
import { HowLineChart } from "howuse/echarts"
import type { EChartsOption } from 'echarts';
import { baseColor } from '@/utils/chartsHelper';

const tableData = [
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
    {
        xh: "序列",
        name: "姓名11",
        online: "18:04 19:05",
        date: "日期",
        status: "状态",
    },
]

const option: EChartsOption = {
    color: baseColor,
    title: {
    text: 'Stacked Line'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    icon: "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z"
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}
</script>
