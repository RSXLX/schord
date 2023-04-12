export default ({
    state: {
      songInfo: {
        id: null,
        pic: null,
        index: null,
        name: null,
        lyric: null,
        songTitle: null,
        singerName: null,
      },
    },
  
    getters: {
      songInfo: (state) => state.songInfo,
    },
  
    mutations: {
      SET_SONG_INFO: (state, payload) => {
        state.songInfo = payload;
      },
    },
  
    actions: {},
  });