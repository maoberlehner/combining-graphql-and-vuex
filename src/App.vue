<template>
  <div id="app">
    <h2>The one book</h2>
    <strong>{{ book.title }}</strong> by {{ book.author }}
    <p>{{ book.description }}</p>

    <h2>All the books</h2>
    <ul v-for="book in bookList" :key="book.id">
      <li>
        <strong>{{ book.title }}</strong> by {{ book.author }}
        <p>{{ book.description }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['book', 'bookList']),
  },
  beforeCreate() {
    this.$store.dispatch('fetchBook', 1);
    this.$store.dispatch('fetchBookList');
  },
};
</script>
