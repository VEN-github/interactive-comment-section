<template>
  <main class="main">
    <div class="container">
      <CommentBox />
      <CommentForm />
    </div>
  </main>
</template>

<script>
import CommentBox from './components/CommentBox.vue';
import CommentForm from './components/CommentForm.vue';
export default {
  name: 'App',
  components: {
    CommentBox,
    CommentForm,
  },
};
</script>
