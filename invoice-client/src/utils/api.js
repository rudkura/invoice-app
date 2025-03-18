const API_URL = "http://localhost:8080"

export const apiGet = (url, params) => {
    const requestOptions = {
        method: "GET",
    };
    const filteredParams = Object.fromEntries(Object.entries(params || {}).filter(([_, value]) => value != null));

    const apiUrl = `${url}?${new URLSearchParams(filteredParams)}`;

    return fetchData(apiUrl, requestOptions)
};

const fetchData = (url, requestOptions) => {
    const apiUrl = `${API_URL}${url}`;

    return fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            if (requestOptions.method !== 'DELETE') {
                return response.json();
            }
        })
        .catch((error) => {
            throw error;
        });
};