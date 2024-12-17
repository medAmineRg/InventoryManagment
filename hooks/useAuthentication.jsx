import { useMutation } from "@tanstack/react-query";
import { signin, signup } from "../service/authenticationApi";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthentication = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const signIn = useMutation({
    mutationFn: signin,
    onSuccess: async (data) => {
      if (data) {
        try {
          await AsyncStorage.setItem("token", data);
          setIsSuccess(true);
          setError(null);
        } catch (e) {
          console.error("Failed to save the token to storage", e);
          setError("An unexpected error occurred");
        }
      } else {
        setIsSuccess(false);
        setError("An unexpected error occurred");
      }
    },
    onError: (error) => {
      setIsSuccess(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 409
      ) {
        setError(
          JSON.stringify(error.response.data) || "Invalid email or password"
        );
      } else {
        setError("An unexpected error occurred");
      }
    },
  });

  const signUp = useMutation({
    mutationFn: signup,
    onSuccess: async (data) => {
      if (data) {
        setIsSuccess(true);
        setError(null);
      } else {
        setIsSuccess(false);
        setError("An unexpected error occurred");
      }
    },
    onError: (error) => {
      setIsSuccess(false);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 409
      ) {
        setError(
          JSON.stringify(error.response.data) || "Invalid email or password"
        );
      } else {
        setError("An unexpected error occurred");
      }
    },
  });

  return {
    signUp: signUp.mutate,
    signUpIsLoading: signUp.isPending,
    signIn: signIn.mutate,
    isLoading: signIn.isPending,
    isSuccess,
    error,
  };
};

export default useAuthentication;
