import {
  LOAD_CHAMPIONS,
  CHAMPIONS_LOADED,
  CHAMPIONS_LOADING_FAIL,
  LOAD_RANDOMIZER,
  RANDOMIZER_LOADED,
  RANDOMIZER_LOADING_FAIL,
} from "../actions/types";

const initialState = {
  champions: null,
  loading: false,
  random: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CHAMPIONS:
      return {
        ...state,
        champions: null,
        loading: true,
      };
    case CHAMPIONS_LOADED:
      return {
        ...state,
        champions: action.payload,
        loading: false,
      };
    case CHAMPIONS_LOADING_FAIL:
      return {
        ...state,
        champions: null,
        loading: false,
      };

    case LOAD_RANDOMIZER:
      return {
        ...state,
        random: null,
        loading: true,
      };
    case RANDOMIZER_LOADED:
      return {
        ...state,
        random: action.payload,
        loading: false,
      };
    case RANDOMIZER_LOADING_FAIL:
      return {
        ...state,
        random: null,
        loading: false,
      };
    default:
      return state;
  }
};
