function successResponseInterceptor(response) {
  return response;
}

function errorResponseInterceptor(error) {
  return Promise.reject(error);
}

export { successResponseInterceptor, errorResponseInterceptor };
