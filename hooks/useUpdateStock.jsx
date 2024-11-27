import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts, postProducts } from "../service/productService";
import { useState } from "react";

const useUpdateStock = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const getProducts = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const updateStock = useMutation({
    mutationFn: postProducts,
    onSuccess: async (data) => {
      console.log(data);
      if (data.status === 200) {
        setError(null);
        setSuccess(data);
      } else if (data.status === 400) {
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
  };
};

export default useUpdateStock;
