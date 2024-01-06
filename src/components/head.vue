<template>
  <!--    搜索-->
  <div class="search">
    <div class="search_right">
<!--      <el-input-->
<!--          v-model="input2"-->
<!--          class="w-50 m-2"-->
<!--          placeholder="Type something"-->
<!--          :prefix-icon="Search"-->
<!--          size="large"-->

<!--      />-->


    </div>
  </div>
  <!--    导航-->
<!--  <div class="nav">-->
<!--    <div style="margin: 0 auto;">-->
<!--    <el-link class="link" href="http://www.88zh.top/">首页</el-link>-->
<!--    <el-link class="link" :underline="false" @click="goCategory(item.id)" v-for="item in cateData.value" :key="item.id">{{item.name}}</el-link>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup>
import {getCurrentInstance, reactive, ref} from 'vue'
import {Search} from '@element-plus/icons-vue'
import SearchInput from "@/components/SearchInput.vue";


const input2 = ref('')
let cateData = reactive([]);

</script>

<style scoped>
.search {
  height: 80px;
  background: #f3f3f3;
}

.search_right {
  margin: 0 auto;
  padding: 20px 0;
  width: 800px;
}

.nav {
  height: 60px;
  background: #f3f3f3;
}

.link {
  margin: 0 20px;
  height: 60px;
}

/deep/ .el-input__inner {
  background-color: #d8dce0;

}

/deep/ .el-input__wrapper {
  background-color: #d8dce0;

}
</style>