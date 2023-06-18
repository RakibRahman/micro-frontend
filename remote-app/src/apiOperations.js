import axios from "axios";

export const getProducts = async (page = 0, limit = 10) => {
  const result = await axios.get(
    `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${limit}`
  );
  const data = result.data;
  return data;
};
