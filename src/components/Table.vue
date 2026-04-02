<script lang="ts" setup>
defineProps<{
  data?: unknown[];
}>();
</script>

<template>
  <el-table :data="data" style="width: 100%" border>
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
</template>
