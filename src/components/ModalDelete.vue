<template>
  <div class="modal" @click.stop="$emit('show-modal')">
    <div class="modal__card">
      <h4 class="modal__header">Delete Comment</h4>
      <p class="modal__body">
        Are you sure want to delete this comment? This will remove the comment and can't de undone.
      </p>
      <button class="modal__cancel-btn" @click.stop="$emit('show-modal')">No, cancel</button>
      <button class="modal__confirm-btn" @click.stop="$emit('delete-comment')">Yes, delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalDelete',
  emits: ['show-modal', 'delete-comment'],
};
</script>
