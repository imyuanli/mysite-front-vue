
<template>
  <div>
    <div class="lb-tree" v-for="(item, index) in list" :key="index">
      <div>
        {{ item.label
        }}<span class="lb-fenge" v-if="item.children && item.children.length"
          >></span
        >
        <span
          @click="add(item, index, list)"
          v-if="
            (!item.children || !item.children.length) &&
            index === list.length - 1
          "
          >新增</span
        >
        <span
          v-if="
            (!item.children || !item.children.length) &&
            index === list.length - 1
          "
          @click="del(item, index, list)"
          >删除</span
        >
      </div>
      <tree-menus :list="item.children"></tree-menus>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  props: {
    list: Array,
  },
  data() {
    return {};
  },
  methods: {
    add(item, index, list) {
      console.log(item, index, list);
    },
    del(item, index, list) {
      console.log(item, index, list);
    },
  },
};
</script>
 <style>
.lb-tree {
  display: flex;
  align-items: center;
}
.lb-fenge {
  padding: 0 10px;
}
</style>
