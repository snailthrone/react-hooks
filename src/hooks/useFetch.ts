import { useEffect, useReducer } from 'react';

type Data<T> = T | null;

const SET_DATA = 'SET_DATA';
const SET_ERROR = 'SET_ERROR';
const SET_LOADING = 'SET_LOADING';

type SetDataAction<T> = {
  type: typeof SET_DATA;
  payload: Data<T>;
};

type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: boolean;
};

type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: boolean;
};

type Action<T> = SetDataAction<T> | SetErrorAction | SetLoadingAction;

type State<T> = {
  data: Data<T>;
  error: boolean;
  loading: boolean;
};

const createReducer = <T>() => (state: State<T>, action: Action<Data<T>>): State<T> => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload, error: false, loading: false };
    case 'SET_ERROR':
      return {
        ...state,
        data: action.payload ? null : state.data,
        error: action.payload,
        loading: false,
      };
    case 'SET_LOADING':
      return { ...state, error: false, loading: action.payload };
    default:
      return state;
  }
};

const setData = <T>(payload: Data<T>): SetDataAction<T> => ({
  type: SET_DATA,
  payload,
});

const setError = (payload: boolean): SetErrorAction => ({
  type: SET_ERROR,
  payload,
});

const setLoading = (payload: boolean): SetLoadingAction => ({
  type: SET_LOADING,
  payload,
});

const intialState = {
  data: null,
  error: false,
  loading: false,
};

const useFetch = <T>(query: string): State<T> => {
  const fetchReducer = createReducer<T>();
  const [state, dispatch] = useReducer(fetchReducer, intialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const response = await fetch(query);
        const responseData = await response.json();
        dispatch(setData(responseData));
      } catch (e) {
        console.error(e.message);
        dispatch(setError(true));
      }
    };
    fetchData();
  }, [query]);

  return state;
};

export default useFetch;
