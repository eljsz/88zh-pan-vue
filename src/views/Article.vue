<template>
  <div>
    <Head></Head>

    <div class="division"></div>

    <div class="content">
      <el-row :gutter="20">
        <!--      <el-container>-->
        <!--        <el-main>-->
        <el-col :span="18">
          <div class="left">
            <div class="title">
              <p class="title_p">{{ articleInfo.data.title }}</p>
              <span class="title_span">{{ articleInfo.data.createTime }}</span>
              <span class="title_span">预览次数:{{ articleInfo.data.visits }}</span>
            </div>
            <div class="article" v-html="articleInfo.data.content">
            </div>
          </div>

        </el-col>
        <!--        </el-main>-->

        <!--        <el-aside width="300px">-->
        <el-col :span="6">
          <div class="right">
            <div class="cate">
              <div class="cate_name">软件分类</div>
              <div class="cate_box">
                <el-scrollbar height="500px">
                  <el-table :data="twoCateData.value" style="width: 100%" size="large">
                    <el-table-column width="90"/>
                    <el-table-column prop="name" width="180"/>
                  </el-table>
                </el-scrollbar>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!--        </el-aside>-->
      <!--      </el-container>-->
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from "@/components/footer.vue";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {useRoute} from "vue-router";

const {proxy} = getCurrentInstance();
const route = useRoute()


onMounted(() => {
  getCategory();
  getArticleInfo();
})

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
 * 获取文章信息
 * @type {UnwrapNestedRefs<*[]>}
 */
let articleInfo = reactive({data: {}});
const getArticleInfo = (() => {
  proxy.$axios
      .get("/article/getArticleInfo", {id: route.params.id})
      .then((res) => {
        //请求成功
        articleInfo.data = res.data
        console.log(articleInfo)
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

.title {
  height: 80px;
  border-bottom: 1px solid rgba(23, 22, 22, 0.95)
}

.title_p {
  font-size: 30px;
  margin: 5px;
  margin-left: 20px;
}

.title_span {
  height: 30px;
  margin: 10px 20px;
  font-size: 10px;
}

.left {
  /*height: 100px;*/
  margin: 0 15px;
}

.right {
  margin: 0 15px;
}

.cate_name {
  line-height: 50px;
  text-align: center;
  height: 50px;

}

.cate_box {
}

.division {
  height: 60px;
}

.article {
  padding: 20px 50px;
  background-color: #ffffff;
}
/*防止图片撑出盒子*/
.article >>> img,p,span {
  width: 80%;
}
.set_img {
  max-width: 70%;
}

</style>