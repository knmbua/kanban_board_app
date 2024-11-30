import axios from 'axios';

const retrieveUsers = async () => {
  try {
    const res = await axios.get('/api/users');

    if(res.status !== 200) {
      throw new Error('invalid user API response, check network tab!');
    }
    
    return res.data;

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

export { retrieveUsers };
