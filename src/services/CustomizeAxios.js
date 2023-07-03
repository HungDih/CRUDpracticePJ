import axios from "axios";

const instance = axios.create({
  baseURL: "https://reqres.in",
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data ? response.data : { statusCode: response.status };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    let response = {};
    if (error.response) {
      // Request đã được tạo ra và server đã hồi đáp với một mã trạng thái
      // nằm ra ngoài tầm 2xx
      response.data = error.response.data;
      response.status = error.response.status;
      response.headers = error.response.headers;
    } else if (error.request) {
      // Request đã được tạo ra nhưng không nhận được hồi đáp nào
      // Trong trình duyệt, `error.request` là instance của XMLHttpRequest
      // còn trong node.js thì nó là instance của http.ClientRequest
      console.log(error.request);
    } else {
      // Điều gì đó đã xảy ra trong bước thiết lập request rồi gây nên lỗi
      console.log("Lỗi", error.message);
    }
    return response;
  }
);
export default instance;
