import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import Card from './Card';
import {getCategories} from './apiCore';



const Shop = () => {

    const [categories, setCategories] = useState();
    const [error, setError] = useState(false);

        // load categories 
        const init = () => {
            getCategories().then(data => {
                if (data.error) {
                   setError(data.error)
                } else {
                   setCategories(data)
                    }
            });
        };

        useEffect(() => {
            init();
        }, []);

    return (
        <Layout
            title="WHERE ART COMES TO LIFE"
            description="Search and find ART of your choice"
            className="container-fluid" >
  
         <div className='row'>
    <div className='col-4'>
     <h4>Coming soon..</h4>
    </div>
             
        
         
</div>

        </Layout>
    );

};



export default Shop;