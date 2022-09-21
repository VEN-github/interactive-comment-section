<template>
  <article class="comment-form">
    <img :src="imageWebp" :alt="currentUser.username" class="comment-form__image" />
    <textarea
      cols="30"
      rows="5"
      :placeholder="placeholder"
      class="comment-form__input"
      ref="commentInput"
      v-model.trim="content"
    />
    <button class="comment-form__btn" @click="onAddComment">{{ btnName }}</button>
  </article>
</template>

<script>
export default {
  name: 'CommentForm',
  props: {
    currentUser: Object,
    showReply: Boolean,
    replyingTo: String,
    btnName: String,
  },
  data() {
    return {
      content: null,
    };
  },
  computed: {
    imageWebp() {
      return this.currentUser?.image?.webp;
    },
    placeholder() {
      return this.showReply ? 'Add reply' : 'Add a comment...';
    },
  },
  watch: {
    showReply: {
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            this.content = `@${this.replyingTo},`;
            this.$refs.commentInput.focus();
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    onAddComment() {
      this.$emit('add-comment', { content: this.content, replyingTo: this.replyingTo });
      this.content = null;
    },
  },
  emmits: ['add-comment'],
};
</script>
