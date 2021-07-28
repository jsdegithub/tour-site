import store from "../store";

export const applyMiddleware = function (middleware) {
  let next = store.dispatch;
  store.dispatch = middleware(store)(next);
};

/**
 * example:
 * ===============================================
 * let next=store.dispatch;
 * store.dispatch=function dispatchAndLog(action){
 *  console.log('dispatching:', action);
 *  console.log('当前state:', store.getState());
 *  next(action);
 *  console.log('更改后的state:', store.getState());
 * }
 */
