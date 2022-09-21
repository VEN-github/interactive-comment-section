<template>
  <main class="main">
    <div class="container">
      <TransitionGroup name="list" tag="div">
        <div v-for="comment in comments" :key="comment.id">
          <CommentBox
            :comment="comment"
            :currentUser="currentUser"
            @add-comment="addComment({ commentId: comment.id, content: $event })"
            @update-comment="updateComment({ commentId: comment.id }, $event)"
            @show-modal="displayModal({ commentId: comment.id })"
            @increment-vote="incrementVote({ commentId: comment.id })"
            @decrement-vote="decrementVote({ commentId: comment.id })"
          >
            <template #replies="{ replies }">
              <TransitionGroup name="list" tag="div">
                <div v-for="reply in replies" :key="reply.id">
                  <CommentBox
                    :comment="reply"
                    :currentUser="currentUser"
                    @add-comment="addComment({ commentId: comment.id, content: $event })"
                    @update-comment="
                      updateComment({ commentId: comment.id, replyId: reply.id }, $event)
                    "
                    @show-modal="displayModal({ commentId: comment.id, replyId: reply.id })"
                    @increment-vote="incrementVote({ commentId: comment.id, replyId: reply.id })"
                    @decrement-vote="decrementVote({ commentId: comment.id, replyId: reply.id })"
                  />
                </div>
              </TransitionGroup>
            </template>
          </CommentBox>
        </div>
      </TransitionGroup>
      <CommentForm
        :currentUser="currentUser"
        btnName="Send"
        @add-comment="addComment({ content: $event })"
      />
      <teleport to="#modal-root">
        <ModalDelete
          v-show="showModal"
          @show-modal="toggleModal({ commentId: deletedCommentId, replyId: deletedReplyId })"
          @delete-comment="deleteComment({ commentId: deletedCommentId, replyId: deletedReplyId })"
        />
      </teleport>
    </div>
  </main>
</template>

<script>
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import CommentBox from './components/CommentBox.vue';
import CommentForm from './components/CommentForm.vue';
import ModalDelete from './components/ModalDelete.vue';
export default {
  name: 'App',
  components: {
    CommentBox,
    CommentForm,
    ModalDelete,
  },
  data() {
    return {
      showModal: false,
      deletedCommentId: null,
      deletedReplyId: null,
    };
  },
  computed: {
    comments() {
      return this.$store.getters.getAllComments;
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
    imageWebp() {
      return this.currentUser?.image?.webp;
    },
    imagePng() {
      return this.currentUser?.image?.png;
    },
    createdAt() {
      dayjs.extend(utc);
      return dayjs.utc().local().format();
    },
  },
  created() {
    this.$store.dispatch('init');
  },
  methods: {
    addComment({ commentId = null, content: { content, replyingTo } }) {
      if (!content) {
        alert('Please input a comment.');
        return;
      }
      const {
        createdAt,
        imagePng,
        imageWebp,
        currentUser: { username },
      } = this;
      let comment = {};
      if (!commentId) {
        comment = {
          content: content,
          createdAt: createdAt,
          score: 0,
          voting: 0,
          user: {
            image: {
              png: imagePng,
              webp: imageWebp,
            },
            username: username,
          },
          replies: [],
        };
        this.$store.dispatch('addComment', { commentId, comment });
        return;
      }
      const finalContent = content.split(',');
      comment = {
        content: finalContent[finalContent.length - 1],
        createdAt: createdAt,
        score: 0,
        voting: 0,
        replyingTo: replyingTo,
        user: {
          image: {
            png: imagePng,
            webp: imageWebp,
          },
          username: username,
        },
      };
      this.$store.dispatch('addComment', { commentId, comment });
    },
    updateComment({ commentId, replyId = null }, editComment) {
      if (!editComment) {
        alert('Please input a comment.');
        return;
      }
      this.$store.dispatch('updateComment', { commentId, replyId, editComment });
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    displayModal({ commentId, replyId }) {
      this.deletedCommentId = commentId;
      this.deletedReplyId = replyId;
      this.toggleModal();
    },
    deleteComment({ commentId, replyId }) {
      this.$store.dispatch('deleteComment', { commentId, replyId });
      this.toggleModal();
    },
    incrementVote({ commentId, replyId = null }) {
      this.$store.dispatch('setVote', {
        commentId,
        replyId,
        upvoted: true,
      });
    },
    decrementVote({ commentId, replyId = null }) {
      this.$store.dispatch('setVote', {
        commentId,
        replyId,
      });
    },
  },
};
</script>
