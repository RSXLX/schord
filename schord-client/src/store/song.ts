export default {
  state: {
    /** 音乐信息 */
    songId: "", // 音乐 ID
    songTitle: "", // 歌名
    songPic: `/img/songPic/tubiao.jpg`, // 歌曲图片
    singerName: "", //  歌手名
    lyric: [], // 处理后的歌词数据
    /** 音乐列表信息 */
    currentPlayList: [], // 当前播放列表
    songDetails: null, // 单个歌单信息
  },
  getters: {

    songId: (state) => state.songId,

    songTitle: (state) => state.songTitle,

    songUrl: (state) => state.songUrl,
    songPic: (state) => state.songPic,
    
    singerName: (state) => state.singerName,
    
    lyric: (state) => state.lyric,
    currentPlayList: (state) => state.currentPlayList,
    songDetails: (state) => state.songDetails,

  },
  mutations: {
    setPlayData(state, data) {
      state.playData = data;
    },

    setSongId: (state, songId) => {
      state.songId = songId;
    },
    setSongTitle: (state, songTitle) => {
      state.songTitle = songTitle;
    },

    setSongPic: (state, songPic) => {
      state.songPic = songPic;
    },
    setSingerName: (state, singerName) => {
      state.singerName = singerName;
    },

    setLyric: (state, lyric) => {
      state.lyric = lyric;
    },
    setCurrentPlayList: (state, currentPlayList) => {
      state.currentPlayList = currentPlayList;
    },
    setSongDetails: (state, songDetails) => {
      state.songDetails = songDetails;
    },
    SET_CURRENT_SONG_INFO: (state, songInfo) => {
      state.songId = songInfo.id;
      state.songTitle = songInfo.songTitle;
      state.songPic = songInfo.songPic;
      state.singerName = songInfo.singerName;
      state.lyric = songInfo.lyric;
    },
  },
  actions: {
    playMusic: ({ commit }, { id,  pic,  songTitle, singerName, lyric, currentSongList }) => {
      commit("setSongId", id);
      commit("setSongPic", pic);
      commit("setSongTitle", songTitle);
      commit("setSingerName", singerName);
      commit("setLyric", lyric);
      commit("setCurrentPlayList", currentSongList);
    },
  },
};
