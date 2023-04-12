<template>
  <div class="content">
    <el-table highlight-current-row :data="dataList" @row-click="goPlayerPage">
      <el-table-column prop="songName" label="歌曲" />
      <el-table-column prop="singerName" label="歌手" />
      <el-table-column prop="introduction" label="专辑" />
      <!-- Add a new column for the collection button -->
      <el-table-column label="收藏">
        <template #default="scope">
          <el-icon
  class="collection-icon"

  @click.stop="toggleCollection(scope.row)"
>
  <StarFilled />
</el-icon>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts">
interface ResponseBody {
  data: any;
  message: string;
  type: string;
  id : number;
}

import { defineComponent, getCurrentInstance, toRefs, computed, reactive ,ref,onMounted } from "vue";
import { useStore } from "vuex";
import mixin from "@/mixins/mixin";
import { HttpManager } from "@/api";
import { Icon } from "@/enums";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { StarFilled } from "@element-plus/icons-vue";
export default defineComponent({
  
  components: {
    StarFilled
  },
  
  props: {
    songList: Array,
    show: {
      default: false
    }
  },
  emits: ["changeData"],
  setup(props) {
    const { getSongTitle, getSingerName, checkStatus } = mixin();
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const router = useRouter();

    const { songList } = toRefs(props);

    const iconList = reactive({
      dislike: Icon.Dislike,
      like: Icon.Like,
    });




//收藏实现
async function toggleCollection(row) {
  // Check if the song is already in the collection
  const collectionStatus = (await HttpManager.isCollection({
    userId: userId.value,
    type: 0,
    songId: row.id,
  })) as ResponseBody;

  if (collectionStatus.data) {
    // Song is in the collection, so delete it
    const result = await HttpManager.deleteCollection(userId.value, row.id) as ResponseBody;
    ElMessage({
      message: result.message,
      type: result.type as any,
    });

    if (result.data === false) proxy.$emit("changeData", result.data);


  } else {
    // Song is not in the collection, so add it
    const result = await HttpManager.setCollection({
      userId: userId.value,
      type: 0,
      songId: row.id,
    }) as ResponseBody;

    ElMessage({
      message: result.message,
      type: result.type as any,
    });


  }
}





    const songUrl = computed(() => store.getters.songUrl);
    const singerName = computed(() => store.getters.singerName);
    const songTitle = computed(() => store.getters.songTitle);
    const dataList = computed(() => {
      const list = [];
      songList.value.forEach((item: any, index) => {
        item["songName"] = getSongTitle(item.name);
        item["singerName"] = getSingerName(item.name);
        item["index"] = index;
        list.push(item);
      });
      return list;
    });

function goPlayerPage(row) {
  

  router.push({ query:{
    id: row.id,
    pic: row.pic,
    index: row.index,
    name: row.name,
    lyric: row.lyric,
    songTitle: row.songTitle,
    singerName: row.singerName
  },path: `/lyric/${row.id}` });
}



    const userId = computed(() => store.getters.userId);

    async function deleteCollection({ id }) {
      if (!checkStatus()) return;

      const result = (await HttpManager.deleteCollection(userId.value, id)) as ResponseBody;
      (proxy as any).$message({
        message: result.message,
        type: result.type,
      });

      if (result.data === false) proxy.$emit("changeData", result.data);
    }

    return {
      dataList,
      iconList,
      songUrl,
      singerName,
      songTitle,
      goPlayerPage,
      deleteCollection,
      toggleCollection, 
    };
  },
});
</script>


<style lang="scss" scoped>
@import "@/assets/css/var.scss";
@import "@/assets/css/global.scss";

.content {
  background-color: $color-white;
  border-radius: $border-radius-songlist;
  padding: 10px;
}

.content:deep(.el-table__row.current-row) {
  color: $color-black;
  font-weight: bold;
}
.collection-icon {
  cursor: pointer;
  color: black; /* You can change the color to your preferred color */
}
.collection-icon.active {
  color: yellow;
}
.content:deep(.el-table__row) {
  cursor: pointer;
}

.icon {
  @include icon(1.2em, $color-black);
}
</style>