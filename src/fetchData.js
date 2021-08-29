import React from 'react';

const fetchData = async (url) => {
return await fetch(url)
    .then(response => response.json());
};

export default fetchData;