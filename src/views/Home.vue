<script setup lang="ts">
import { ref } from 'vue';
import Table from '../components/Table.vue';

const pageName = ref<string>('2');
const unusedVar = 'This variable is declared but never used';

pageName.value = 'hello';
const tableData = ref<unknown[]>([]);
tableData.value = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
];
</script>

<template>
  <div class="home">
    <h1>首页</h1>
    <Table :data="tableData" />
    <router-link to="/waterfall">{{ unusedVar }}</router-link>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 50px 20px;
}

.home h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #42b883;
}

.home p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.home a {
  display: inline-block;
  padding: 12px 30px;
  background: linear-gradient(135deg, #42b883, #35495e);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.home a:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(66, 184, 131, 0.4);
}
</style>
