import React, { useState } from 'react'
import axios from 'axios';

const Image = () => {
    const [userName, setUserName] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userName);
        formData.append('image', file[0]); // Append the image

        try {
            // Send the form data to the backend
            await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("File uploaded successfully!");
        } catch (error) {
            console.error('Error uploading the file', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center mt-5'>
                <input 
                    type="text" 
                    name="username" 
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
                    Submit
                </button>
            </form>
        </>
    );
}

export default Image;
