<template>
  <article class="comments">
    <div class="comments__header">
      <img src="../assets/image-amyrobson.png" alt="User Avatar" class="comments__header-image" />
      <h5 class="comments__name">amyrobson</h5>
      <p class="comments__badge">you</p>
      <p class="comments__date">1 month ago</p>
    </div>
    <div class="comments__body">
      <span class="comments__body-mention">@namehere</span> Impressive! Though it seems the drag
      feature could be improved. But overall it looks incredible. You've nailed the design and the
      responsiveness at various breakpoints works really well.
    </div>
    <div class="comments__voting">
      <button class="vote-btn">+</button
      ><input type="text" name="" id="" value="12" class="input__vote" /><button class="vote-btn">
        -
      </button>
    </div>
    <div class="comments__actions">
      <!-- <div>
        <button class="actions-btn actions-btn--reply">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-reply.svg" alt="Reply Icon"
          /></span>
          Reply
        </button>
      </div> -->
      <div>
        <button class="actions-btn actions-btn--delete">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-delete.svg" alt="Delete Icon"
          /></span>
          Delete
        </button>
        <button class="actions-btn actions-btn--edit">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-edit.svg" alt="Edit Icon"
          /></span>
          Edit
        </button>
      </div>
    </div>
  </article>
  <article class="replies">
    <article class="comments">
      <div class="comments__header">
        <img src="../assets/image-amyrobson.png" alt="User Avatar" class="comments__header-image" />
        <h5 class="comments__name">amyrobson</h5>
        <p class="comments__badge">you</p>
        <p class="comments__date">1 month ago</p>
      </div>
      <div class="comments__body">
        <span class="comments__body-mention">@namehere</span> Impressive! Though it seems the drag
        feature could be improved. But overall it looks incredible. You've nailed the design and the
        responsiveness at various breakpoints works really well.
      </div>
      <div class="comments__voting">
        <button class="vote-btn">+</button
        ><input type="text" name="" id="" value="12" class="input__vote" /><button class="vote-btn">
          -
        </button>
      </div>
      <div class="comments__actions">
        <!-- <div>
        <button class="actions-btn actions-btn--reply">
          <span class="actions-btn__icon"
            ><img src="../assets/icon-reply.svg" alt="Reply Icon"
          /></span>
          Reply
        </button>
      </div> -->
        <div>
          <button class="actions-btn actions-btn--delete">
            <span class="actions-btn__icon"
              ><img src="../assets/icon-delete.svg" alt="Delete Icon"
            /></span>
            Delete
          </button>
          <button class="actions-btn actions-btn--edit">
            <span class="actions-btn__icon"
              ><img src="../assets/icon-edit.svg" alt="Edit Icon"
            /></span>
            Edit
          </button>
        </div>
      </div>
    </article>
  </article>
</template>

<script>
export default {
  name: 'CommentBox',
};
</script>
