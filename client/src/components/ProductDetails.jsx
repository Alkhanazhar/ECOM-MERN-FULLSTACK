import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BackEndUrl } from '../utils/Utils';

const ProductDetails = () => {
  const [product,setProduct]=useState({})
  const params=useParams()
  const getProduct=async()=>{
    try {
      const {data}=await axios.get(`${BackEndUrl}/products/${params.slug}`)
      setProduct(data.product);
    } catch (error) {
      console.error(error.message)
    }
  }
  useEffect(()=>{
    getProduct()
  },[])
  return (
    <div className="p-2">
      <div className="card__title text-capitalize">
        <h1>{product.name}</h1>
      </div>
      <div className="card__body">
        <div className="half">
          <div className="featured_text">
            <p className="sub bg-danger w-25 text-light text-center p-2">{product.quantity} qty left</p>
            <h3 className="price">$ {product.price}</h3>
          </div>
          <div className="image">
            <img src={product.photo} alt={product.name} />
          </div>
        </div>
        <div className="half">
          <div className="description">
            <p>{product.description}</p>
          </div>
          <span className="stock"></span>
          <div className="reviews">
            <span>(64 reviews)</span>
          </div>
        </div>
      </div>
      <div className="card__footer">
        <div className="recommend">
          <p>Recommended by</p>
          <h3>Andrew Palmer</h3>
        </div>
        <div className="action">
          <button type="button" className="btn btn-group-lg btn-danger">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails
