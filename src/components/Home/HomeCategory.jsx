import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const HomeCategory = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,       
    autoplaySpeed: 3000, 
    responsive: [
      {
        breakpoint: 768, // Screen width <= 768px (tablet and mobile)
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          slidesToScroll: 1,
        }
      }
    ]
  };
  
  const [categories, setCategories] = useState([]);  // State to store fetched categories
  const [loading, setLoading] = useState(true);  // State to manage loading

  useEffect(() => {
    // Fetch categories from the server
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);  // Update categories state with fetched data
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setLoading(false);
      });
  }, []);  // Empty dependency array means this effect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>;  // Display loading state while categories are being fetched
  }

  return (
    <div className="container slider-container mx-auto p-4">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category.id}>  {/* Each category gets its own slide */}
            <a href={`/shop?category=${category.id}`} className='block'>
              <div className='border p-2 text-center flex flex-col justify-center items-center bg-gray-100 m-2'>
                <img src={`../../assets/images/${category.category_image}`} alt={category.category_name} className='h-full w-full object-cover object-center hover:opacity-75' />
                <p className='font-bold text-2xl mt-2'>{category.category_name}</p>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomeCategory;
