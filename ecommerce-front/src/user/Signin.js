import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import {signin, authenticate, isAuthenticated } from '../auth';


 
const Signin = () => {
   const [values, setValues] = useState({
       email:'mims@abv.bg',
       password:'aaaaa1',
       error:'',
       loading: false,
       redirectToReferrer: false
   });

   const { email, password, loading, error, redirectToReferrer } = values;
   const {user} = isAuthenticated();

   const handleChange = name => event => {
         setValues({ ...values, error: false, [name]: event.target.value });
   };
   
   // submit button 
   const clickSubmit = event => {
      event.preventDefault();
      setValues({...values, error: false, loading:true });
      signin({email, password }).then(data => {
         if(data.error) {
            setValues({...values, error: data.error, loading: false});  
         } else {
           authenticate(data, () => {
            setValues({
               ...values,
               redirectToReferrer: true
            });
          });
         }
      });  
    };

  // SignUp form Functionality
   const signupForm = () => (
      <form>

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
     


   const showLoading = () => 
          loading && (
     <div className='alert alert-info'> 
                 <h2>Loading...</h2>
    </div>
);

   const redirectUser = () => {
      if(redirectToReferrer) {
         if(user && user.role === 1) {
            return <Redirect to="/admin/dashboard" />;
         } else {
            return <Redirect to="/user/dashboard" />;
         }
      }
   };

   return (
      <Layout title='Signin Page' description='Sarikoff Art &amp; Design'
      className='container col-md-8 offset-md-2'
      >
      {showLoading()}
      {showError()}
      {signupForm()}
      {redirectUser()}
    
      </Layout>
   );
};
export default Signin;