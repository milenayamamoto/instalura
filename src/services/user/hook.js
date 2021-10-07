import { useState, useEffect } from 'react';
import { userService } from './userService';

export const useUserService = {
  getProfilePage() {
    const [posts, setPosts] = useState({
      data: null,
      loading: true,
      error: null,
    });

    const [user, setUser] = useState({
      data: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      userService
        .getProfilePage()
        .then((responseFromServer) => {
          setPosts((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
          }));
        })
        .catch((err) => {
          setPosts((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });

      userService
        .getUser()
        .then((responseFromServer) => {
          setUser((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
          }));
        })
        .catch((err) => {
          setUser((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, []);

    return {
      posts: posts.data?.posts,
      user: user.data?.user,
    };
  },
};
