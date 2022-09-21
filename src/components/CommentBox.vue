<template>
  <article class="comments">
    <div class="comments__header">
      <img :src="image" :alt="commentUsername" class="comments__header-image" />
      <h5 class="comments__name">{{ commentUsername }}</h5>
      <p class="comments__badge" v-if="isYou">you</p>
      <p class="comments__date">{{ createdAt }}</p>
    </div>
    <div class="comments__body">
      <span class="comments__body-mention" v-if="comment.replyingTo && !showEdit"
        >@{{ comment.replyingTo }} &nbsp;</span
      >
      <div v-if="showEdit">
        <textarea
          cols="30"
          rows="5"
          placeholder="Add comment..."
          class="comment-edit__input"
          ref="editInput"
          v-model.trim="editComment"
          @keydown.enter.exact.prevent
          @keydown.enter.exact="onUpdateComment"
        />
        <button class="comment-edit__btn" @click="onUpdateComment">Update</button>
      </div>
      <template v-else>
        {{ comment.content }}
      </template>
    </div>
    <div class="comments__voting">
      <button
        class="vote-btn"
        :class="{ 'vote-btn--disabled': comment.voting === 1 }"
        @click="$emit('increment-vote')"
      >
        +</button
      ><input type="text" class="input__vote" :value="comment.score" /><button
        class="vote-btn"
        :class="{ 'vote-btn--disabled': comment.voting === -1 }"
        @click="$emit('decrement-vote')"
      >
        -
      </button>
    </div>
    <div class="comments__actions">
      <template v-if="isYou">
        <button
          class="actions-btn actions-btn--delete"
          :class="{ 'actions-btn--delete--disabled': showEdit }"
          :disabled="showEdit"
          @click="$emit('show-modal')"
        >
          <span class="actions-btn__icon"
            ><img src="../assets/icon-delete.svg" alt="Delete Icon"
          /></span>
          Delete
        </button>
        <button class="actions-btn actions-btn--edit" @click="toggleEdit">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-edit.svg" alt="Edit Icon"
          /></span>
          Edit
        </button>
      </template>
      <template v-else>
        <button class="actions-btn actions-btn--reply" @click="toggleReply">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-reply.svg" alt="Reply Icon"
          /></span>
          Reply
        </button>
      </template>
    </div>
  </article>
  <CommentForm
    v-if="showReply"
    :currentUser="currentUser"
    :showReply="showReply"
    :replyingTo="replyingTo"
    btnName="Reply"
    @add-comment="onAddComment"
  />
  <article class="replies">
    <slot name="replies" :replies="comment.replies"></slot>
  </article>
</template>

<script>
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import CommentForm from './CommentForm.vue';
export default {
  name: 'CommentBox',
  props: {
    comment: Object,
    currentUser: Object,
  },
  components: {
    CommentForm,
  },
  data() {
    return {
      showReply: false,
      replyingTo: null,
      showEdit: false,
      editComment: null,
    };
  },
  computed: {
    image() {
      return this.comment.user?.image?.webp;
    },
    commentUsername() {
      return this.comment.user?.username;
    },
    isYou() {
      return this.commentUsername === this.currentUser.username;
    },
    createdAt() {
      dayjs.extend(relativeTime);
      return dayjs(this.comment.createdAt).fromNow();
    },
  },
  watch: {
    showEdit(value) {
      if (value) {
        this.$nextTick(() => {
          this.editComment = this.comment.content;
          this.$refs.editInput.focus();
        });
        return;
      }
    },
    showReply(value) {
      if (value) {
        this.replyingTo = this.commentUsername;
      }
    },
  },
  methods: {
    toggleReply() {
      this.showReply = !this.showReply;
    },
    toggleEdit() {
      this.showEdit = !this.showEdit;
    },
    onAddComment(event) {
      this.$emit('add-comment', event);
      this.toggleReply();
    },
    onUpdateComment() {
      this.$emit('update-comment', this.editComment);
      this.toggleEdit();
    },
  },
  emits: ['add-comment', 'update-comment', 'show-modal', 'increment-vote', 'decrement-vote'],
};
</script>
