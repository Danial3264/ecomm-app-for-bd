import React, { useState } from 'react';
import axios from 'axios';

const Update = ({ existingData }) => {
    const [userName, setUserName] = useState(existingData ? existingData.username : '');
    const [file, setFile] = useState(null);
    const [id, setId] = useState(existingData ? existingData.id : null); // Use existing id if present

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('image', file ? file[0] : null); // Append the image if selected
        formData.append('id', id); // Append the id for updating

        try {
            const response = await axios.post('/update', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Data updated successfully!");
        } catch (error) {
            console.error('Error updating the data', error);
            alert('Error updating the data: ' + error.message);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-5'>
                <input 
                    type="text" 
                    name="username" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                    className='border-slate-300 bg-gray-300 mt-2 w-96 rounded p-2'
                    placeholder="Enter your username"
                />

                <input 
                    type="file" 
                    name="image" 
                    onChange={(e) => setFile(e.target.files)}
                    className="files mt-2 w-96"
                />
                
                <button type="submit" className="rounded text-center bg-green-700 text-white hover:bg-red-700 p-2">
                    Update
                </button>
            </form>
        </>
    );
}

export default Update;
