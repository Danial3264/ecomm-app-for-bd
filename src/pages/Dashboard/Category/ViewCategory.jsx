import axios from 'axios';
import React, { useEffect, useState } from 'react'


const ViewCategory = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('/categories')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, [categories]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios.delete(`/categories/${id}`) // Assuming your backend API follows REST conventions
            .then(response => {
                console.log("Category deleted successfully:", response.data);
                // Update the state to reflect the deleted category
                const filteredCategories = categories.filter((category) => category.id !== id);
                setCategories(filteredCategories);
            })
            .catch(error => {
                console.error("There was an error deleting the category!", error);
            });
        }
    };
    
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>

        <table className="table-auto w-full border-collapse">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Category Image</th>
                    <th className="border px-4 py-2">Category Name</th>
                    <th className="border px-4 py-2">Shipping Cost</th>
                    <th className="border px-4 py-2">Actions</th>
                </tr>
            </thead>
      

        {categories.map((category)=>(
            
                
                <tbody key={category.id}>
                <tr className="hover:bg-gray-100 text-center">
                    <td className="border px-4 py-2">
                        
                        {category.category_image ? (
                        <img
                            src={`/assets/images/${category.category_image}`} // Adjust this path to where your images are stored
                            alt={category.category_image}
                            className="w-16 h-16 object-cover"
                            />
                        ) : (
                            'No image'
                        )}
                    </td>
                    <td className="border px-4 py-2">{category.category_name}</td>
                    <td className="border px-4 py-2">{category.category_shippingCost}</td>
                    <td className="border px-4 py-2"> 
                    <button
                        onClick={() => handleDelete(category.id)} // Corrected to use orderId
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

export default ViewCategory
