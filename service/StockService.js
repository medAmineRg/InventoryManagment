import axiosConf from "./axiosConf";

// fetch products from the API http://localhost:3000/product/basic
const fetchProducts = async ({ queryKey }) => {
  // Extract the token from the queryKey
  const [, token] = queryKey;
  try {
    const response = await axiosConf.get("product/basic-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

// post request to this api http://localhost:3000/stock/set-product-count
const setUpStock = async ({ countData, token }) => {
  console.log(countData, token);
  try {
    const response = await axiosConf.post(
      "/stock/set-product-count",
      countData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { fetchProducts, setUpStock };
