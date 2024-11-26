import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchProducts, postProducts } from "../service/productService";
import { useState } from "react";

const useUpdateStock = () => {
  const [error, setError] = useState(null);

  const getProducts = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const updateStock = useMutation({
    mutationFn: postProducts,
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
          JSON.stringify(error.response.data) || "An unexpected error occurred"
        );
      } else {
        setError("An unexpected error occurred");
      }
    },
  });

  return {
    updateStock: updateStock.mutate,
    updateStockIsLoading: updateStock.isLoading,
    isSuccess: updateStock.isSuccess, // Use react-query's `isSuccess`
    error: updateStock.error?.message || error, // Combine react-query's error with local error handling
    products: getProducts.data?.products || [],
    productsLoading: getProducts.isLoading,
    fetchProducts: getProducts.refetch,
  };
};

export default useUpdateStock;
