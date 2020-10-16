import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://api.github.com`,
});

async function request(options) {
  try {
    let params = {
      url: options.url,
      method: options.method,
      params: options.params,
    };
    const response = await axiosInstance(params);
    return response.data;
  } catch (error) {
    return error;
  }
}

export function searchRepos(term, page = 1) {
  return request({
    method: "GET",
    url: `/search/repositories?q=${term}&per_page=${20}&page=${page}`,
  });
}

export function searchUsers(term, page = 1) {
  return request({
    method: "GET",
    url: `/search/users?q=${term}&per_page=${20}&page=${page}`,
  });
}

export function getUserRepos(url) {
  return request({
    method: "GET",
    url: `${url}?per_page=${20}&page=${1}`,
  });
}
