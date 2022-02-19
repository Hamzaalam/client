import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export  const fetchAllList  = async ()  => {  
  try {
    const response = await axios.get('/get-all');
    return response.data;
  } 
  catch (error) {
    console.log(error)
  }
}

export  const createList  = async (req:any)  => {  
  try {
    const response = await axios.post('/create', req);
    return response.data;
  } 
  catch (error) {
    console.log(error)
  }
}

export  const updateList  = async (req:any, listId:string)  => {  
  try {
    const response = await axios.put(`/list/${listId}`,req);
    return response.data;
  } 
  catch (error) {
    console.log(error)
  }
}

export  const DeleteList  = async (listId:string)  => {  
  try {
    const response = await axios.delete(`/list/${listId}`);
    return response.data;
  } 
  catch (error) {
    console.log(error)
  }
}




