<template>
  <div class="song-container">
    <el-image class="song-pic" fit="contain" :src="attachImageUrl(songPic)" />
    <ul class="song-info">

  <li>{{ name }}</li>
    
</ul>
  </div>
  <div class="container">
    <div class="lyric-container">
      <div class="transpose-buttons">
  <button @click="transposeLyrics(-1)">降半调</button>
  <button @click="transposeLyrics(1)">升半调</button>
</div>
<div class="song-lyric">
  <transition-group name="lyric-fade">
    <!--有歌词-->
    <pre v-if="lyricArr.length" key="has-lyric" class="has-lyric">
      <template v-for="(item, index) in lyricArr" :key="index">
        {{ item[1] }}<br />
      </template>
    </pre>
    <!--没歌词-->
    <div v-else class="no-lyric" key="no-lyric">
      <span>暂无歌词</span>
    </div>
  </transition-group>
</div>

      <comment :playId="songId" :type="0"></comment>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch, TransitionGroup } from "vue";
import { useStore } from "vuex";
import Comment from "@/components/Comment.vue";
import { parseLyric } from "@/utils";
import { HttpManager } from "@/api";
import { transposeLyrics } from "@/utils/transposeLyrics";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Comment,
  },
  setup() {


    const useroute = useRoute();
    
    const usequery = useroute.query;
    const songId = ref(parseInt(usequery.id as string, 10));

    const store = useStore();
    const transpose = (semitones) => {
      if (lyricArr.value.length !== 0) {
        const transposedLyrics = transposeLyrics(lyricArr.value, semitones);
        lyricArr.value = transposedLyrics;
      }
    };
    const lyricArr = ref([]); // 当前歌曲的歌词

    watch(
      () => usequery.lyric,
      () => {
        if (usequery.lyric) {
          lyricArr.value = parseLyric(usequery.lyric);
        } else {
          lyricArr.value = [];
        }
      },
      { immediate: true }
    );

    // 获取歌曲图片
    const songPic = ref(usequery.pic);

    return {
      transposeLyrics: transpose,
      TransitionGroup,
      songPic,
      lyricArr,
      songId,
      lyric: store.getters.lyric,
      songTitle: store.getters.songTitle,
      singerName: store.getters.singerName,
      name: usequery.name,
      attachImageUrl: HttpManager.attachImageUrl,
    };
  },
});
</script>



<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.song-container {
  position: fixed;
  top: 120px;
  left: 50px;
  display: flex;
  flex-direction: column;

  .song-pic {
    height: 300px;
    width: 300px;
    border: 4px solid white;
    border-radius: 12px;
  }

  .song-info {
    width: 300px;
    li {
      width: 100%;
      line-height: 40px;
      font-size: 18px;
      padding-left: 10%;
    }
  }
}

.lyric-container {
  font-family: $font-family;
  .song-lyric {
    position: relative;
    min-height: 600px;
    padding: 30px 0;
    overflow: auto;
    border-radius: 12px;
    background-color: $color-light-grey;
    display: flex; // 添加 display: flex
    justify-content: center; // 添加居中对齐
  }
  .has-lyric {
    position: absolute;
    transition: all 1s;
    text-align: left; // 添加文本左对齐
    width: fit-content; // 添加宽度自适应内容
  }
  .has-lyric li {
    width: 100%;
    height: 50px; // 增加行高
    font-size: 16px; // 调整字体大小
    line-height: 50px;
  }
  .no-lyric {
    position: absolute;
    margin: 100px 0;

    span {
      font-size: 18px;
      text-align: center;
    }
  }
}


.lyric-fade-enter,
.lyric-fade-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

.lyric-fade-enter-active,
.lyric-fade-leave-active {
  transition: all 0.3s ease;
}

@media screen and (min-width: $sm) {
  .container {
    padding-top: 30px;
  }
  .lyric-container {
    margin: 0 150px 0px 400px;
  }
}

@media screen and (max-width: $sm) {
  .container {
    padding: 20px;
  }
  .song-container {
    display: none;
  }
}
.transpose-buttons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #95d2f6;
  background-color: #fff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #95d2f6;
  transition: background-color 0.3s;

  &:hover {
    background-color: #95d2f6;
    color: #fff;
  }
}
.lyrics {
  font-size: 14px;
}
</style>
