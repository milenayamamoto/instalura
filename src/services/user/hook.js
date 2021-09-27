import { useState, useEffect } from 'react';
import { userService } from './userService';

export const useUserService = {
  getProfilePage() {
    const [response, setResponse] = useState({
      data: null,
      loading: true,
      error: null,
    });

    useEffect(() => {
      userService
        .getProfilePage()
        .then((responseFromServer) => {
          setResponse((currentState) => ({
            ...currentState,
            data: responseFromServer,
            loading: false,
          }));
        })
        .catch((err) => {
          setResponse((currentState) => ({
            ...currentState,
            data: null,
            loading: false,
            error: err.message,
          }));
        });
    }, []);

    return response;
  },
};
