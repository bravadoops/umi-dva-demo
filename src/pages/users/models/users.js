import * as usersService from '../services/users';
import { create } from 'domain';

export default {
  namespace: 'users',
  state: {
    list: [],
    total: null,
    page: null,
  },
  // reducer, save change
  reducers: {
    save(state, { payload: { data: list, total, page } }) {
      // 拓展操作符...进行数组合并
      return { ...state, list, total, page };
    },
  },
  // async: fetch data
  effects: {
    *fetch({ payload: { page = 1 } }, { call, put }) {
      const { data, headers } = yield call(usersService.fetch, { page });
      yield put({
        type: 'save',
        // ? : data and total 
        payload: {
          data,
          total: parseInt(headers['x-total-count'], 10),
          page: parseInt(page, 10),
        },
      });
    },
    *remove({ payload: id }, { call, put, select}) {
      // difference: userService.remove(id)
      // 删除功能可以实现 但是页面不会刷新
      yield call(usersService.remove, id);
      // difference:
      // payload: page: 解构的时候用 {payload: page}
      // payload: {page}: 解构的时候用 {payload: {page}}
      // 传递object用{} 传递id等纯值不用{}
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    *patch({ payload: { id, values } }, { call, put, select }) {
      yield call(usersService.patch, id, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page } });
    },
    // append for creating
    *create({ payload: values }, { call, put, select}) {
      yield call(usersService.create, values);
      const page = yield select(state => state.users.page);
      yield put({ type: 'fetch', payload: { page }});
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users' || pathname === '/users/') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};
