import axios from 'axios';
import auth0Client from './Auth'

export default props => {
    const question = (axios.post(`http://localhost:8081/`,{title:'title',description:'description'},{
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      })).data;
    const response = (axios.post(`http://localhost:8081/answer/1`,{answer:'here the first answer'},{
        headers: { 'Authorization': `Bearer ${auth0Client.getIdToken()}` }
      })).data;
      console.log('jwt token',auth0Client.getIdToken());
    return "";
};
