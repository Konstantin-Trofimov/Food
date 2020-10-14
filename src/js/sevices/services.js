//? Фн постит данные на сервер, используя fetch и ворзвращает приобразванные данные.

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    });

    return await res.json(); //! Object -> JSON
};

//? Фн отправляет fetch запрос на сервер и возвращает приобразованные данные. 

const getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json(); //! Object -> JSON
};

export {
    postData,
    getResource
};