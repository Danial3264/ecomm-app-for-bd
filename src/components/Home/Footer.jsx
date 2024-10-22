import React, { useEffect, useState } from 'react'
import Logo from './Hero/Logo';
import axios from 'axios';

const Footer = () => {

  const [categories, setCategories] = useState([])

  console.log(categories)

  useEffect(() => {

    axios.get('/categories')
      .then(response => {
        setCategories(response.data); 
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []); 

  return (
    <>
      <div className='grid grid-cols-1 text-center md:grid-cols-3 md:text-start lg:text-start lg:grid-cols-5  bg-gray-200 p-20 mt-6 space-x-3 space-y-3'>
        <div><Logo /></div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold text-lg'>Products</p>
          {categories.map((category)=>(
            <a href={`/shop/?category=${category.id}`}>{category.category_name}</a>
          ))}
        </div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold'>Company</p>
          <a href="/termsofservice">Terms of Service</a>
          <a href="/privacypolicy">Privacy Policy</a>
          <a href="/contact">Who we are</a>
        </div>
        <div className='flex flex-col space-y-3'>
          <p className='font-bold'>Customer Service</p>
          <a href="/contact">Contact</a>
          <a href="/shipping">Shipping</a>
          <a href="/returns">Returns</a>
        </div>
        <div className='w-full colspan-2 space-y-3'>
          <p className='font-bold'>Sign up for our newsletter</p>
          <input className='p-3 w-full rounded' type="text" name="" id="" />
          <button className='bg-red-700 hover:bg-red-500 p-3 rounded-lg text-white font-bold'>Sign Up for Better Deals</button>

        </div>
      </div>
    </>
  )
}

export default Footer
