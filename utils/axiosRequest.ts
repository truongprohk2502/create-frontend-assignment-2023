import axios, { AxiosRequestConfig, AxiosError } from "axios";

const axiosRequest = async (config: AxiosRequestConfig) => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      ...config,
      baseURL: process.env.PUBLIC_NEXT_BASE_URL,
    };
    const response = await axios(axiosConfig);
    return response.data;
  } catch (err: any) {
    console.warn(err);
    throw new AxiosError(
      err?.response?.data?.errorDetails || "",
      err?.response?.status || 500
    );
  }
};

export default axiosRequest;
