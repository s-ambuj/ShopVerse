import React from 'react'
import { useParams } from 'react-router-dom';

const Product = () => {

  const { productID } = useParams();
  console.log(productID);
  return (
    <div>
      
    </div>
  )
}

export default Product
