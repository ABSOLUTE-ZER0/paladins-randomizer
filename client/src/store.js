import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const initiaState = {};

const middleware = [thunk];

let store = createStore(
  rootReducer,
  initiaState,
  compose(
    applyMiddleware(...middleware))
);

if (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) {
  store = createStore(
    rootReducer,
    initiaState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

export default store;
