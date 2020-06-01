import React from 'react';
import {Link} from 'react-router-dom';
import ShowImage from './ShowImage';

const Card   = ({product}) => {
    return (
        
        <div className='col-2 '>
         <div className='card '>
          <div className='card-header bg-dark text-white'>{product.name}</div>
           <div className='card-body'>
               <ShowImage item={product} url="product" />
    <p>{product.description}</p>
    <p>${product.price}</p>
    <Link to='/'>
       <button className='btn btn-dark btn-sm mt-2 mb-2'>View </button>
    </Link>
       <button className='btn btn-outline-dark btn-sm mt-2 mb-2'> Add  </button>


           </div>
          </div>
        </div> 
    );
};

export default Card;
