export default {
  state: {
    userId: "", // ID
    username: "", // 名字
    userPic: "", // 图片
    userMapping: {}, // 添加一个新的state来存储用户映射关系
  },
  getters: {
    userId: (state) => state.userId,
    username: (state) => state.username,
    userPic: (state) => state.userPic,
    userMapping: (state) => state.userMapping, // 添加一个新的getter
  },
  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId;
    },
    setUsername: (state, username) => {
      state.username = username;
    },
    setUserPic: (state, userPic) => {
      state.userPic = userPic;
    },
    updateUserMapping: (state, { userId, username }) => {
      // 添加一个新的mutation用于更新用户映射关系
      state.userMapping = { ...state.userMapping, [userId]: username };
    },
  },
};
