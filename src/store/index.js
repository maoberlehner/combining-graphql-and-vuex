import Vue from 'vue';
import Vuex from 'vuex';
import gql from 'graphql-tag';

import graphqlClient from '../utils/graphql';

Vue.use(Vuex);

export const mutations = {
  setBook(state, book) {
    // eslint-disable-next-line no-param-reassign
    state.book = book;
  },
  setBookList(state, bookList) {
    // eslint-disable-next-line no-param-reassign
    state.bookList = bookList;
  },
};

export const actions = {
  async fetchBook({ commit }, id) {
    const response = await graphqlClient.query({
      query: gql`
        query Book($bookId: ID!) {
          book(id: $bookId) {
            id
            title
            author
            description
          }
        }
      `,
      variables: { bookId: id },
    });

    commit('setBook', response.data.book);
  },
  async fetchBookList({ commit }) {
    const response = await graphqlClient.query({
      query: gql`
        query BookList {
          bookList {
            id
            title
            author
            description
          }
        }
      `,
    });

    commit('setBookList', response.data.bookList);
  },
};

export const state = {
  book: null,
  bookList: [],
};

export default new Vuex.Store({
  mutations,
  actions,
  state,
});
