<template>
  <div>
    <Head></Head>

    <div class="content">
      <el-container>
        <el-main>
          <div class="cate_left">
            <el-table v-loading="loading" :data="article.value" style="width: 100%" size="large" @row-click="goArticle">
              <el-table-column prop="createTime" width="200"/>
              <el-table-column prop="title" width="1000"/>
              <el-table-column width="50">
                <el-icon>
                  <Promotion/>
                </el-icon>
              </el-table-column>

            </el-table>
          </div>
        </el-main>
        <el-aside width="300px">
          <div class="cate_right">
            <div class="cate_name">软件分类</div>
            <div class="cate_box">
              <el-scrollbar height="500px">
                <el-table :data="twoCateData.value" style="width: 100%" size="large" @row-click="goCategory">
                  <el-table-column width="70"/>
                  <el-table-column prop="name" width="170"/>
                </el-table>
              </el-scrollbar>
            </div>
          </div>
        </el-aside>
      </el-container>
    </div>
    <div class="cate_page">
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          :current-page="pageNum"
          @current-change="pageChange"
      />
    </div>

  </div>
  <Footer></Footer>
</template>
<script setup>
import {getCurrentInstance, onMounted, reactive, ref, watch} from "vue";
import {useRouter, useRoute} from 'vue-router'

const route = useRoute()
const router = useRouter()
const {proxy} = getCurrentInstance();


onMounted(() => {
  getCategory();
  getArticle();
})

// 监听当前路由
watch(
    () => router.currentRoute.value,
    (newValue) => {
      getArticle()
      console.log(twoCateData)
      twoCateData.value.forEach(item => {
        if (item.id == route.params.cid) {
          document.title = '88整合库-' + item.name + '-今日资源更新,最近更新,排行榜聚合网站'
        }
      })


    },
    // { immediate: true }
)

/**
 * 获取二级分类
 * @type {UnwrapNestedRefs<*[]>}
 */
let twoCateData = reactive([]);
const getCategory = (() => {
  proxy.$axios
      .get("/category/getCategory", {type: 2})
      .then((res) => {
        //请求成功
        twoCateData.value = res.data
      })
})


/**
 * 根据分类id获取文章
 * @type {UnwrapNestedRefs<*[]>}
 */
// 当前页
let pageNum = ref(1)
// 每页显示限制
let pageSize = ref(30)
// 总条数
let totalCount = ref(0)
const pageChange = (p) => {
  pageNum.value = p
  // 发起接口请求数据 , 请求参数中使用 currentPage.value 作为查询当前页码
  getArticle();

}

const loading = ref(false)

let article = reactive([]);
const getArticle = (() => {
  proxy.$axios
      .get("/article/getCategoryArticle",
          {
            cid: route.params.cid,
            pageNum: pageNum.value,
            pageSize: pageSize.value
          })
      .then((res) => {
        //请求成功
        loading.value = true;
        article.value = res.data.list
        totalCount.value = res.data.total
        loading.value = false;
      })
})

//跳转文章页
const goArticle = ((row) => {
  window.open(row.url)
})

//跳转分类页
const goCategory = ((row) => {
  router.push({
    name: 'category',
    params: {
      cid: row.id,
    },
  })
})

</script>

<style scoped>

.content {
  background-color: #f7f8fa;
  margin: 0 auto;
  margin-top: 20px;
  overflow: hidden;
  padding: 0 20px;
}

.cate_left {
  float: left;
  margin: 0 15px;
}

.cate_right {
  width: 250px;
  float: left;
  margin: 0 15px;
}

.cate_name {
  line-height: 50px;
  text-align: center;
  height: 50px;

}

.cate_box {
  /*background-color: aqua;*/
}

.cate_page {
  height: 40px;
  padding: 30px 500px;
  background-color: #f7f8fa;
}


</style>