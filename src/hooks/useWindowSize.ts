import { useCallback, useEffect, useRef, useReducer } from 'react';

const SET_HEIGHT = 'SET_HEIGHT';
const SET_WIDTH = 'SET_WIDTH';

type SetHeightAction = {
  type: typeof SET_HEIGHT;
  payload: number;
};

type SetWidthAction = {
  type: typeof SET_WIDTH;
  payload: number;
};

type Action = SetHeightAction | SetWidthAction;

type State = {
  aspect: number;
  devicePixelRatio: number;
  height: number;
  width: number;
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_HEIGHT':
      return { ...state, aspect: state.width / action.payload, height: action.payload };
    case 'SET_WIDTH':
      return { ...state, aspect: action.payload / state.height, width: action.payload };
    default:
      return state;
  }
};

const setHeight = (height: number): SetHeightAction => ({
  type: SET_HEIGHT,
  payload: height,
});

const setWidth = (width: number): SetWidthAction => ({
  type: SET_WIDTH,
  payload: width,
});

const useWindowSize = (debouncer = 50): State => {
  const [{ aspect, devicePixelRatio, height, width }, dispatch] = useReducer(reducer, {
    aspect: window.innerWidth / window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const debounce = useRef(0);

  const handleResize = useCallback(() => {
    const currentHeight = window.innerHeight;
    const currentWidth = window.innerWidth;

    window.clearTimeout(debounce.current);

    debounce.current = window.setTimeout(() => {
      if (currentWidth !== width) {
        dispatch(setWidth(currentWidth));
      }
      if (currentHeight !== height) {
        dispatch(setHeight(currentHeight));
      }
    }, debouncer);
  }, [debouncer, height, width]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return {
    aspect,
    devicePixelRatio,
    height,
    width,
  };
};

export default useWindowSize;
