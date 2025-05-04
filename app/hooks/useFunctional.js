
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const navToggler = () => {
    console.log("Hello world, hook called!");
    return;
}

export const fetchApiData = () => {
    
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try
            {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setData(response.data || []);
            }
            catch(error)
            {
                console.log(`Error fetching data : ${error.message}`);
            }
        }
        fetchData();
    },[]);

    return data;

}