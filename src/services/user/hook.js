import { useState, useEffect } from 'react';
import { userService, githubProfile } from './userService';

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

    const [users, setUsers] = useState({
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
            data: responseFromServer.posts,
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
            data: responseFromServer.user,
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

      userService
        .getUsers()
        .then((responseFromServer) => {
          setUsers((currentState) => ({
            ...currentState,
            data: responseFromServer.users,
            loading: false,
          }));
        })
        .catch((err) => {
          setUsers((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, []);

    return {
      posts: posts.data,
      user: user.data,
      users: users.data,
    };
  },
};

export const useGetUserGithubById = {
  getGithubProfile(id) {
    const [userGithub, setUserGithub] = useState({
      data: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      githubProfile
        .getGithubProfile(id)
        .then((responseFromServer) => {
          setUserGithub((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
          }));
        })
        .catch((err) => {
          setUserGithub((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, [id]);

    return {
      githubUser: userGithub.data?.githubUser,
    };
  },
};
