import React, { useState, useEffect, useReducer } from 'react';
import './style.css';

const initialState = { userData: { page: 1, data: [] }, totalPage: 0 };

const reducerFunction = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        userData: { ...state.userData, page: state.userData.page + 1 },
      };
    case 'decrement':
      return {
        ...state,
        userData: { ...state.userData, page: state.userData.page - 1 },
      };
    case 'setData':
      return {
        ...state,
        userData: { ...state.userData, data: action.data },
        totalPage: action.totalPage,
      };
    default:
      return state;
  }
};

export default function App() {
  // const [data, setData] = useState({ page: 1, data: [] });
  // const [totalPage, setTotalPage] = useState(0);
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${state.userData.page}`)
      .then((res) => res.json())
      .then((res1) => {
        // setData((prev) => ({ ...prev, data: res1.data }));
        // setTotalPage(res1.total_pages);
        dispatch({
          type: 'setData',
          data: res1.data,
          totalPage: res1.total_pages,
        });
      });
  }, [state.userData.page]);

  // const onButtonClick = (state) => {
  //   setData((prev) => ({
  //     ...prev,
  //     page: state === 'Prev' ? prev.page - 1 : prev.page + 1,
  //   }));
  // };

  return (
    <div>
      <h1>Below is the list of users</h1>
      {state.userData.data.length > 0 &&
        state.userData.data.map((val) => (
          <div key={`${val.email}${val.id}`}>
            <span>{`${val.first_name} ${val.last_name}`}</span>
          </div>
        ))}
      <footer>
        <button
          disabled={state.userData.page === 1}
          //onClick={() => onButtonClick('Prev')}
          onClick={() => dispatch({ type: 'decrement' })}
        >
          Prev
        </button>
        <button
          disabled={state.userData.page >= state.totalPage}
          //onClick={() => onButtonClick('Next')}
          onClick={() => dispatch({ type: 'increment' })}
        >
          Next
        </button>
      </footer>
    </div>
  );
}
