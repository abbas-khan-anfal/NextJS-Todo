
// you can use hook like below, but here it doesn't need in my app, so that's why i just show that how we can use hook.



// 
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export const useNavToggler = () => {
//     console.log("Hello world, hook called!");
//     return;
// }

// export const useFetchApiData = () => {
    
//     const [data, setData] = useState([]);
//     useEffect(() => {
//         const fetchData = async () => {
//             try
//             {
//                 const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
//                 setData(response.data || []);
//             }
//             catch(error)
//             {
//                 console.log(`Error fetching data : ${error.message}`);
//             }
//         }
//         fetchData();
//     },[]);

//     return data;

// }