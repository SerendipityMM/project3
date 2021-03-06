import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Layout from '../core/Layout';
import {signup} from '../auth';

 
const Signup = () => {

   const [values, setValues] = useState({
       name:'',
       email:'',
       password:'',
       error:'',
       success: false
   });

   const { name, email, password, success, error } = values;

   const handleChange = name => event => {
         setValues({ ...values, error: false, [name]: event.target.value });
   };
   
   // submit button 
   const clickSubmit = event => {
      event.preventDefault();
      setValues({...values, error: false});
      signup({name, email, password }).then(data => {
         if(data.error) {
            setValues({...values, error: data.error, success: false});  
         } else {
            setValues({
               ...values,
               name: '',
               email:'',
               password:'',
               error:'',
               success: true
         
            });
         }
      });  
  };

  // SignUp form Functionality
   const signupForm = () => (
      <form>

         <div className="form-group">
           <label className="text-muted">Name</label>
           <input onChange={handleChange('name')} type="text"  className="form-control" 
            value ={name}/>
         </div>
         
         <div className="form-group">
           <label className="text-muted">Email</label>
           <input onChange={handleChange('email')} type="email"  className="form-control"
           value ={email} />
         </div>
         
         <div className="form-group">
           <label className="text-muted">Password</label>
           <input  onChange={handleChange('password')} type="password" className="form-control" 
           value ={password}/>
         </div>
         

         <button onClick={clickSubmit} className="btn btn-dark">Submit</button>
      </form>
   );

   const showError = () => ( 
   <div className="alert aler-danger" style= {{display: error ? '' : 'none'}}> 
   {error}
   </div>
);
     


   const showSuccess = () => ( <div className="alert aler-info" style= {{display: success ? '' : 'none'}}> 
   New account is created. Please <Link to="/signin">Signin</Link>
   </div>
);
   
   


   return (
      <Layout title='SignUp Page' description='Sarikoff Art &amp; Design'
      className='container col-md-8 offset-md-2'
      >
      {showSuccess()}
      {showError()}
      {signupForm()}
    
      </Layout>
   );
};
export default Signup;