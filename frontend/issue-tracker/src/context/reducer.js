// const storedUser = JSON.parse(localStorage.getItem("user"));

// export const initialState = {
//   user: getUserfromLocalStorage ? getUserfromLocalStorage : null,
// };

const getFromLS = (item) => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(item);
  }
  return null;
};
const setToLS = (item, value) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(item, value);
  }
};

export const getInitialState = () => {
  const item = JSON.parse(getFromLS("user"));

  return item
    ? {
        user: item,
      }
    : {
        user: null,
      };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      setToLS(
        "user",
        JSON.stringify({
          accessToken: action.user.accessToken,
          name: action.user.name,
        })
      );
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
