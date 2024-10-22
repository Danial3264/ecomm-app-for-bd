import axios from 'axios';
import React, { useEffect, useState } from 'react'


const ViewSlider = () => {

    const [slider, setSlider] = useState([]);

    useEffect(() => {
        axios.get('/slider')
            .then(response => {
              setSlider(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the Slider!", error);
            });
    }, [slider]);

    const handleDelete = (id) => {

        console.log(id)
        if (window.confirm("Are you sure you want to delete this slide?")) {
            axios.delete(`/slider/${id}`) // Assuming your backend API follows REST conventions
            .then(response => {
                console.log("slide deleted successfully:", response.data);
                // Update the state to reflect the deleted slide
                const filteredSlider = slider.filter((slide) => slide.id !== id);
                setSlider(filteredSlider);
            })
            .catch(error => {
                console.error("There was an error deleting the slide!", error);
            });
        }
    };
    
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Slider</h2>

        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Slider Image</th>
                    <th className="border px-4 py-2">Slider Hook</th>
                    <th className="border px-4 py-2">Slider Story</th>
                    <th className="border px-4 py-2">Button Text</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
      

            {slider.map((slide)=>(
            
                
                <tbody>
                <tr className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">
                        
                        {slide.slider_image ? (
                        <img
                            src={`/assets/images/${slide.slider_image}`} // Adjust this path to where your images are stored
                            alt={slide.slider_hook}
                            className="w-16 h-16 object-cover"
                            />
                        ) : (
                            'No image'
                        )}
                    </td>
                    <td className="border px-4 py-2">{slide.slider_hook}</td>
                    <td className="border px-4 py-2">{slide.slider_story}</td>
                    <td className="border px-4 py-2">{slide.slider_buttonText}</td>
                    <td className="border px-4 py-2"> 
                    <button
                        onClick={() => handleDelete(slide.id)} // Corrected to use orderId
                        className="text-red-500 hover:underline"
                    >
                        Delete
                    </button>
                    </td>
                </tr>
            
                </tbody>
            

        ))}
    </table> 
  </div>
  )
}

export default ViewSlider
