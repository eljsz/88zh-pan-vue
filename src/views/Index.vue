<template>
  <div>
    <Head></Head>
    <div>
      <el-card class="box-card" v-for="(item,index) in IndexCategory.value" :key="item.id">
        <template #header>
          <div class="card-header">
            <span @click="goCategory(item.id)">{{ item.name }}</span>
            <el-button class="button" text>最近更新</el-button>
          </div>
        </template>
        <el-scrollbar height="250px">
          <div v-for="item1 in IndexCategory.value[index].articles" :key="o">
            <el-link class="text item" @click="goArticle(item1.url)">{{ item1.title }}</el-link>
          </div>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
  <div style="clear:both">
  <Link />
  <Footer />
  </div>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import {getCurrentInstance, onMounted, reactive, watch} from "vue";
// import Link from "@/components/link.vue";

const {proxy} = getCurrentInstance();
const route = useRoute()


watch(route, (newValue, oldValue) => {
  getIndexData();
})

var IndexCategory = reactive([]);
onMounted(() => {
  getIndexData();
  document.title = '88整合库-今日资源更新,最近更新,排行榜聚合网站'
})
// let cid = ;//菜单id
//获取首页数据
const getIndexData = (() => {
  // let cid = route.params.cid || 0
  proxy.$axios
      .get("/article/getIndexArticle")
      .then((res) => {
        //请求成功
        IndexCategory.value = res.data
      })
})

//跳转文章详情页
const goArticle = (url) => {
  window.open(url)
}

//跳转分类页
const goCategory = (cid) => {
  window.open("/category/" + cid)
}

</script>

<style scoped>
html, body {
  margin: 0; /*若不设置，默认为8px*/
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  /*flex: 1;*/
  float: left;
  margin: 30px 30px;
  width: 29%;
}

.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.el-link {
  margin-left: 18px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>