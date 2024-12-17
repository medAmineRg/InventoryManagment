import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchStockSession,
  setUpStock,
  checkSessionCount,
  checkSessionCountService,
} from "../service/StockService";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUpdateStock = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    getToken();
  }, []);

  const getProducts = useQuery({
    queryKey: ["products", token],
    queryFn: fetchProducts,
    enabled: !!token,
  });

  const fetchSessions = useQuery({
    queryKey: ["stock-session", token],
    queryFn: fetchStockSession,
    enabled: !!token,
  });

  const updateStock = useMutation({
    mutationFn: ({ token, countData }) => setUpStock({ token, countData }),
    onSuccess: async (data) => {
      console.log(data);
      if (data.status === 200) {
        setError(null);
        setSuccess(data);
      } else if (data.status >= 400 || data.status <= 409) {
        setError(data.data);
      } else {
        setSuccess(data);
        setError(null);
      }
    },
    onError: (error) => {
      setError(
        JSON.stringify(error.response.data) || "An unexpected error occurred"
      );
    },
  });

  const checkSessionCount = useMutation({
    mutationFn: ({ token, id, data }) =>
      checkSessionCountService({ token, id, data }),
    onSuccess: async (data) => {
      if (data.status === 200) {
        console.log("data success", data);
        setError(null);
        setSuccess(data);
      } else if (data.status >= 400 || data.status <= 409) {
        setError(data.data);
      } else {
        setSuccess(data);
        setError(null);
      }
    },
    onError: (error) => {
      console.log("data error", data);
      setError(
        JSON.stringify(error.response.data) || "An unexpected error occurred"
      );
    },
  });

  return {
    updateStock: updateStock.mutate,
    updateStockIsLoading: updateStock.isPending,
    error: updateStock.error?.message || error,
    products: getProducts.data?.products || [],
    productsLoading: getProducts.isPending,
    fetchProducts: getProducts.refetch,
    setError,
    success,
    setSuccess,
    // stock session
    sessions: fetchSessions.data?.session || [],
    checkSessionCount: checkSessionCount.mutate,
    errorSession: checkSessionCount.error?.message || error,
  };
};

export default useUpdateStock;
