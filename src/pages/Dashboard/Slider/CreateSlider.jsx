import axios from 'axios';
import React, { useState } from 'react'


const CreateSlider = ({onSliderCreated}) => {
  const [formData, setFormdata] = useState({
    slider_hook: '',
    slider_story: '',
    slider_buttonText: '',

  });
  const [file, setFile] = useState(null); // Separate state for the file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the file in separate state
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for file upload
    const data = new FormData();
    data.append('slider_hook', formData.slider_hook);
    data.append('slider_story', formData.slider_story);
    data.append('slider_buttonText', formData.slider_buttonText);
    data.append('image', file); // Add the file to FormData

    axios.post('/create-slider', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        console.log('slider created successfully:', response.data);
  
        // Call the onSliderCreated function to update the menu
        if (onSliderCreated) {
          onSliderCreated();  // Call the function to switch to 'viewslider'
        }
      })
      .catch(error => {
        console.error('There was an error creating the slider:', error);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New slider</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* slider Name */}
        <div>
          <label className="block text-gray-700">slider Hook</label>
          <input
            type="text"
            name="slider_hook"
            value={formData.slider_hook}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter slider name"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">slider Story</label>
          <input
            type="text"
            name="slider_story"
            value={formData.slider_story}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter slider name"
            required
          />
        </div>


        <div>
          <label className="block text-gray-700">slider Button Text</label>
          <input
            type="text"
            name="slider_buttonText"
            value={formData.slider_buttonText}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter slider name"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700">slider Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Create slider
          </button>
        </div>
      </form>
    </div>
  );
};


export default CreateSlider
