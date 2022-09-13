<template>
  <article class="comment-form">
    <img src="../assets/image-amyrobson.png" alt="User Avatar" class="comment-form__image" />
    <textarea
      name=""
      id=""
      cols="30"
      rows="5"
      placeholder="Add comment..."
      class="comment-form__input"
    />
    <button class="comment-form__btn">Send</button>
  </article>
</template>

<script>
export default {
  name: 'CommentForm',
};
</script>
