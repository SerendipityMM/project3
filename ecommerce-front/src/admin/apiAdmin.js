import {API} from '../config';

 // Category create
  export const createCategory = (userId, token, category) => {
    
   return fetch(`${API}/category/create/${userId}`, {
       method: 'POST',
       headers: {
          Accept: 'applicaion/json',
          "Content-Type": 'application/json',
          Authorization:`Bearer ${token}`
       },
       body: JSON.stringify(category)         
    })
    .then(response => {
       return response.json()
    })
    .catch(err => {
       console.log(err)

    });

 };


//Product create
export const createProduct = (userId, token, product) => {
    
   return fetch(`${API}/product/create/${userId}`, {
       method: 'POST',
       headers: {
          Accept: 'applicaion/json',
          Authorization:`Bearer ${token}`
       },
       body: product       
    })
    .then(response => {
       return response.json()
    })
    .catch(err => {
       console.log(err)

    });
 };

 //Sign in
 export const signin  = user => {
    
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
           Accept: 'applicaion/json',
           "Content-Type": 'application/json',
        },
        body: JSON.stringify(user)         
     })
     .then(response => {
        return response.json()
     })
     .catch(err => {
        console.log(err)
 
     });
 
  };
 
 //authentication & save info to local storage
 export const authenticate = (data, next) => {
    if(typeof window !== 'undefined') {
       localStorage.setItem('jwt', JSON.stringify(data))
       next();
    }

 };

 // Sign out
export const signout = (next) => {
   if(typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
      next();
      return fetch(`${API}/signout`,  {
         method: 'GET',

      })
      .then(response => {
         console.log("signout", response);
      })  
      .catch(err => console.log(err));
   }
};

export const isAuthenticated = () => {
   if(typeof window == 'undefined') {
      return false
   }
   if(localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'));
   } else {
      return false
   }
};