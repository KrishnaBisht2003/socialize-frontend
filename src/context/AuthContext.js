import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  // user: {
  //   "_id": "64f6b914e339f5603df69cb5",
  //   "username": "jane",
  //   "email": "jane@gmial.com",
  //   "profilePicture": "person/1.jpeg",
  //   "coverPicture": "",
  //   "followers": [
  //     "64f6aed7511d118425ede4e2",
  //     "64f6ade0dff5939a2f75798f"
  //   ],
  //   "following": [
  //     "64f6ade0dff5939a2f75798f"
  //   ],
  //   "isAdmin": false,
  //   "createdAt": "2023-09-05T05:13:56.951Z",
  //   "updatedAt": "2023-09-06T18:44:24.452Z",
  //   "__v": 0,
  //   "desc": "hey its my updated description"
  // },
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  //   useEffect(()=>{
  //     localStorage.setItem("user", JSON.stringify(state.user))
  //   },[state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
