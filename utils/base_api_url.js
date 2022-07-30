
const getApiBaseUrl = () => {
  let BASE_URL;
  if (process.env.NODE_ENV === 'development') {
    BASE_URL='http://127.0.0.1:8000/api'
  }
  else {
    BASE_URL='http://8.136.80.201/api'
  }
  return BASE_URL
}


export default getApiBaseUrl;
