

<template>
  <div class="common-layout">
    <el-container>
      <el-main>Main</el-main>
      <el-aside width="200px" style="background-color: blue">Aside</el-aside>
    </el-container>
  </div>
</template>


<script setup>

</script>

<style scoped>
.left {
  float: left;
  height: 100vh;
  width: 100px;
  background-color: rgb(194, 123, 123);
}


.right {
  width: 200px;
  height: 100vh;
  background-color: rgb(69, 69, 92);
  float: right;
}


.main {
  margin-left: 120px;
  margin-right: 220px;
  height: 100vh;
  background-color: rgb(95, 214, 95);
}
</style>