<template>
  <div>
    <el-input
        :value="value"
        @input="$emit('input', $event)"
        v-bind="$attrs"
        size="large"
        @keyup.native.enter="handleEnter"
    >
<!--      <i slot="prefix"><img :src="CommonImg.search" alt=""></i>-->
      <i slot="suffix" v-if="empty" class="el-icon-close" @click="handleClear"></i>
      <el-button slot="append" v-if="hasBtn"  type="primary" @click="$emit('enter',value)">搜索</el-button>
    </el-input>
  </div>
</template>

<script>
// import {CommonImg} from '@/assets'
export default {
  name:"SearchInput",
  props:{
    value: [String, Number],
    hasBtn:Boolean
  },
  data(){
    return {
      // CommonImg,
      hovering: false,
      focused: false,
      empty:false,
    }
  },
  watch:{
    value(newValue){
      if(newValue !== ''){
        this.empty = true;
      }else{
        this.empty = false;
      }
    },
  },
  methods:{
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
    },
    handleEnter(){
      // 这里可以包一个防抖 handleEnter:debounce(function(){ ... })
      if(this.value === '') return;
      this.$emit('enter',this.value)
    },
    handleClear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
  },
}
</script>
<style lang="less" scoped>
//...样式自定义
</style>
