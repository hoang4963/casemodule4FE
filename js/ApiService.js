const instance = axios.create({
    baseURL: 'http://localhost:8080/',
})

instance.interceptors.request.use((config) => {

    config.headers.authorization = localStorage.getItem("token")

    return config
})

instance.interceptors.response.use((response) => response.data)



window.ApiService = instance