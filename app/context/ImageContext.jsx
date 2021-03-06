import React, { useReducer } from "react";
import axios from "axios";

import picsum from "../api/picsum";
import parseLinkHeader from "../utils/parseLinkHeader";

export default ImageContext = React.createContext();

const initialState = {
  images: [],
  loading: false,
  next: null,
  error: null,
  next: null,
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "GET_IMAGE_REQUEST":
      return { ...state, loading: true };
    case "GET_IMAGE_SUCCESS":
      return {
        ...state,
        images: [...state.images, ...payload],
        loading: false,
      };
    case "SET_NEXT_PAGE_URL":
      return { ...state, next: payload };
    case "GET_IMAGE_FAILURE":
      return { ...state, error: payload, loading: false };
    default:
      return state;
  }
};

export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    getImages: async () => {
      dispatch({ type: "GET_IMAGE_REQUEST" });
      try {
        let response = await picsum.get();
        dispatch({
          type: "GET_IMAGE_SUCCESS",
          payload: response.data,
        });
        const links = parseLinkHeader(response.headers["link"]);
        if (links.next) {
          dispatch({ type: "SET_NEXT_PAGE_URL", payload: links.next });
        }
      } catch (error) {
        dispatch({
          type: "GET_IMAGE_FAILURE",
          payload: error,
        });
      }
    },
    getMoreImages: async (nextLink) => {
      dispatch({ type: "GET_IMAGE_REQUEST" });
      try {
        let response = await axios.get(nextLink);
        dispatch({ type: "GET_IMAGE_SUCCESS", payload: response.data });
        const links = parseLinkHeader(response.headers["link"]);
        if (links.next) {
          dispatch({ type: "SET_NEXT_PAGE_URL", payload: links.next });
        }
      } catch (error) {
        dispatch({
          type: "GET_IMAGE_FAILURE",
          payload: error,
        });
      }
    },
  };

  return (
    <ImageContext.Provider value={{ state, dispatch: actions }}>
      {children}
    </ImageContext.Provider>
  );
};
