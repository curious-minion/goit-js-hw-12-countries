// export default fetchCountries(searchQuery), возвращающей промис с массивом стран, результат запроса к API.

export default function fetchCountries(searchQuery) {
    const url = `https://restcountries.com/v3.1/name/${searchQuery}`;

    return fetch(url)
        .then(response => {return response.json()})
        .catch(error => {
            console.log('', error)
        });
}
