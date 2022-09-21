import { createStore } from 'vuex';
import axios from 'axios';

const onVoting = ({ voting }, upvoted = false) => {
  switch (voting) {
    case 1:
      return upvoted ? -1 : -2;
    case -1:
      return upvoted ? 2 : 1;
    default:
      return upvoted ? 1 : -1;
  }
};

const Store = createStore({
  state() {
    return {
      comments: [],
      currentUser: [],
    };
  },
  getters: {
    getAllComments({ comments }) {
      return comments;
    },
    getCurrentUser({ currentUser }) {
      return currentUser;
    },
  },
  mutations: {
    setComments(state, payload) {
      state.comments = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch('initComments');
    },
    initComments: async ({ commit, dispatch }) => {
      try {
        const {
          data: { currentUser, comments },
        } = await axios.get('./data.json');
        commit('setComments', comments);
        commit('setCurrentUser', currentUser);
        dispatch('loadAllComments');
        dispatch('loadCurrentUser');
      } catch (error) {
        console.error(error);
      }
    },
    loadAllComments: async ({ state, commit }) => {
      let comments = await JSON.parse(localStorage.getItem('comments'));

      if (comments) {
        commit('setComments', comments);
        return;
      }
      localStorage.setItem('comments', JSON.stringify(state.comments));
    },
    storeComments({ dispatch }, comment) {
      localStorage.setItem('comments', JSON.stringify(comment));
      dispatch('loadAllComments');
    },
    addComment: async ({ dispatch }, { commentId, comment }) => {
      let comments = await JSON.parse(localStorage.getItem('comments'));
      const id = comments.map(comment => comment.id);

      if (commentId) {
        const commentsIndex = comments.findIndex(comment => comment.id === commentId);
        const replies = comments[commentsIndex].replies;
        if (!replies.length) {
          comments[commentsIndex].replies.push({ id: 1, ...comment });
          dispatch('storeComments', comments);
          return;
        }
        let replyId = replies[replies.length - 1].id;
        comments[commentsIndex].replies.push({ id: (replyId += 1), ...comment });
        dispatch('storeComments', comments);
        return;
      }
      comments.push({ id: (id.length += 1), ...comment });
      dispatch('storeComments', comments);
    },
    updateComment: async ({ dispatch }, { commentId, replyId, editComment }) => {
      let comments = await JSON.parse(localStorage.getItem('comments'));
      const commentsIndex = comments.findIndex(comment => comment.id === commentId);
      if (replyId) {
        const repliesIndex = comments[commentsIndex].replies.findIndex(
          reply => reply.id === replyId
        );
        comments[commentsIndex].replies[repliesIndex].content = editComment;
        dispatch('storeComments', comments);
        return;
      }
      comments[commentsIndex].content = editComment;
      dispatch('storeComments', comments);
    },
    deleteComment: async ({ dispatch }, { commentId, replyId }) => {
      let comments = await JSON.parse(localStorage.getItem('comments'));
      const commentsIndex = comments.findIndex(comment => comment.id === commentId);
      if (replyId) {
        const repliesIndex = comments[commentsIndex].replies.findIndex(
          reply => reply.id === replyId
        );
        comments[commentsIndex].replies.splice(repliesIndex, 1);
        dispatch('storeComments', comments);
        return;
      }
      comments.splice(commentsIndex, 1);
      dispatch('storeComments', comments);
    },
    setVote: async ({ dispatch }, { commentId, replyId, upvoted = false }) => {
      let comments = await JSON.parse(localStorage.getItem('comments'));
      const comment = comments.find(comment => comment.id === commentId);

      if (replyId) {
        const replies = comment.replies.find(reply => reply.id === replyId);
        replies.score += onVoting(replies, upvoted);
        replies.voting += onVoting(replies, upvoted);
        dispatch('storeComments', comments);
        return;
      }
      comment.score += onVoting(comment, upvoted);
      comment.voting += onVoting(comment, upvoted);
      dispatch('storeComments', comments);
    },
    loadCurrentUser: async ({ state, commit }) => {
      let currentUser = await JSON.parse(localStorage.getItem('currentUser'));

      if (currentUser) {
        commit('setCurrentUser', currentUser);
        return;
      }
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
  },
});

export default Store;
