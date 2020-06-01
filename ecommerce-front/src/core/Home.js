import React, {useState, useEffect} from 'react';
import Layout from './Layout';
import {getProducts} from './apiCore';
import Card from './Card';

const Home = () => {
   const [productsBySell, setProductsBySell] = useState([]);
   const [productsByArrival, setProductsByArrival] = useState([]);
   const [error, setError] = useState(false);

   const loadProductsBySell = () => {
       getProducts('sold').then(data => {
           if (data.error) {
               setError(data.error);
           } else {
               setProductsBySell(data);
           }
       });
   };

   const loadProductsByArrival = () => {
       getProducts('createdAt').then(data => {
           console.log(data);
           if (data.error) {
               setError(data.error);
           } else {
               setProductsByArrival(data);
           }
       });
   };

   useEffect(() => {
       loadProductsByArrival();
       loadProductsBySell();
   }, []);

   return (
      <Layout
          title="Sarikoff Art & Design"
          description="Modern and Contemporary Art Studio"
          className="container-fluid" >


          <h3 className="mb-4 ">Shop for art you'll love</h3>
          <div className="row mb-5  ">
              {productsByArrival.map((product, i) => (
                      <Card key={i} product={product} />       
              ))}
          </div>

          <h3 className="mb-4" >Most viewed</h3>
          <div className="row mb-5">
              {productsBySell.map((product, i) => (
                      <Card key={i}  product={product} />
              ))}
          </div>
      </Layout>
  );
};

export default Home;