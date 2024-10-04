const SERVER_BASE_URL = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${SERVER_BASE_URL}/api/signup`,
    method: "post",
  },
  signIn:{
    url: `${SERVER_BASE_URL}/api/signin`,
    method: "post",
  },
  current_user:{
    url: `${SERVER_BASE_URL}/api/user-details`,
    method: "get",
  },
  logout_user:{
    url: `${SERVER_BASE_URL}/api/userLogout`,
    method: "get",
  },
  alluser:{
    url: `${SERVER_BASE_URL}/api/all-user`,
    method: "get",
  },
  updateUser:{
    url: `${SERVER_BASE_URL}/api/update-user`,
    method: "post",
  },
  uploadProduct:{
    url: `${SERVER_BASE_URL}/api/upload-product`,
    method: "post",
  },
  allProduct:{
    url: `${SERVER_BASE_URL}/api/get-product`,
    method: "get",
  },
  updateProduct:{
    url: `${SERVER_BASE_URL}/api/update-product`,
    method: "post",
  },
  categoryProduct:{
    url: `${SERVER_BASE_URL}/api/get-categoryProduct`,
    method: "get",
  },
};
export default SummaryApi;
