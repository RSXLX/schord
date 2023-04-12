<template>
  <h1 style="text-align: center;">讨论区</h1>

  <div class="discussion-container">
    <!-- Messages container -->
    <div class="messages-container">
      <div ref="messages" class="messages">
    <!-- Display messages here -->
    <div v-for="message in messages.slice().reverse()" :key="message.id" class="message" :class="{ 'own-message': message.userId === userId }">
      <div class="message-box">
        <div class="message-info">
          <div class="message-id">{{ message.username }}</div>
          <div class="timestamp">{{ formatTimestamp(message.createTime) }}</div>
        </div>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
  </div>
  </div>
    </div>
    <!-- Input and send button -->
    <div class="input-container">
    <el-input
      v-model="newMessage"
      placeholder="输入讨论内容"
      class="input"
      @keydown.enter="sendMessage"
    ></el-input>
    <el-button @click="sendMessage" class="send-button">发送</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElMessage } from 'element-plus';
import { HttpManager, ApiResponse } from '@/api';
import { getDiscussTime } from '@/utils';
import { useStore } from 'vuex';
import { mapGetters } from 'vuex';
export default defineComponent({
  computed: {
    ...mapGetters(['userId', 'username', 'userMapping']),
  },
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  async mounted() {
    await this.fetchDiscussions();
  },

  methods: {
    //定位到最新消息的地方
    scrollToBottom() {
    this.$nextTick(() => {
      const container = this.$refs.messages as HTMLElement;
      container.scrollTop = container.scrollHeight;
    });
  },
    async fetchDiscussions() {
      const response = await HttpManager.getAllDiscussion();
      if ((response as ApiResponse).code === 200) {
        const discussions = (response as ApiResponse).data;

        for (let discussion of discussions) {
          const userResponse = (await HttpManager.getUserOfId(discussion.userId)) as ResponseBody;
          discussion.username = userResponse.data[0].username;
          this.$store.commit('updateUserMapping', {
            userId: discussion.userId,
            username: discussion.username,
          });
        }
        this.messages = discussions;
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) {
        ElMessage.warning('请输入信息');
        return;
      }
      const discussion = {
        content: this.newMessage,
        userId: this.userId,
        createTime: Date.now(),
      };
      try {
        const response = await HttpManager.addDiscussion(discussion);
        if ((response as ApiResponse).code === 200) {
          ElMessage.success('发送成功');
          this.newMessage = '';
          await this.fetchDiscussions();
        } else {
          throw new Error();
        }
      } catch (error) {
        ElMessage.error('发送失败，请先登录');
      }
    },

    formatTimestamp(timestamp) {
      return getDiscussTime(timestamp);
    },
  },
});
</script>



<style scoped>
.discussion-container {
display: flex;
flex-direction: column;
justify-content: center;
height: 100%;
width: 100%; /* 添加此处 */
}
.messages-container {
flex: 1;
height: 0;
overflow-y: scroll;
padding: 1em;
}
.messages {
height: auto;
max-height: 400px;
overflow-y: auto;
}
.message {
margin-bottom: 1em;
}
.message-box {
background-color: #e5f7d8;
border-radius: 4px;
padding: 1em;
display: inline-block;
}
.message-info {
display: flex;
justify-content: space-between;
margin-bottom: 0.5em;
}
.message-id {
font-weight: bold;
}
.timestamp {
font-size: 0.8em;
color: #888;
}
.message-content {
white-space: pre-wrap;
}
.input-container {
display: flex;
align-items: center;
padding: 1em;
}
.input {
flex: 1;
}
.send-button {
margin-left: 1em;
}
.message.own-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.message.own-message .message-box {
  background-color: #d4e7ff; /* 可根据需要更改自己消息的背景颜色 */
  border-radius: 5px;
}
.message.own-message .message-info .message-id {
  text-align: right;
}
</style>
