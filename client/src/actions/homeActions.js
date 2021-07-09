import {
  LOAD_CHAMPIONS,
  CHAMPIONS_LOADED,
  CHAMPIONS_LOADING_FAIL,
  LOAD_RANDOMIZER,
  RANDOMIZER_LOADED,
  RANDOMIZER_LOADING_FAIL,
} from "../actions/types";

import API from "../api";

export const getChampions = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CHAMPIONS,
    });

    const res = await API.get("/api/getall");
    if (res.data.errors) {
      dispatch({
        type: CHAMPIONS_LOADING_FAIL,
      });
      return res.data;
    }

    dispatch({
      type: CHAMPIONS_LOADED,
      payload: res.data,
    });

    if(!localStorage.getItem("championList")){
      localStorage.setItem("championList", JSON.stringify(res.data))
      localStorage.setItem("ignoreList", JSON.stringify([]))
    }

    return res.data;
  } catch (error) {
    dispatch({
      type: CHAMPIONS_LOADING_FAIL,
    });
  }
};


export const randomize = (championsIgnore) => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_RANDOMIZER,
    });

    const res = await API.post("/api/randomizer", championsIgnore={championsIgnore});
    if (res.data.errors) {
      dispatch({
        type: RANDOMIZER_LOADING_FAIL,
      });
      return res.data;
    }

    dispatch({
      type: RANDOMIZER_LOADED,
      payload: res.data,
    });

    console.log(res.data);


    return res.data;
  } catch (error) {
    dispatch({
      type: RANDOMIZER_LOADING_FAIL,
    });
  }
};