import React from 'react'
import { FcSalesPerformance } from "react-icons/fc";


const CardItem = () => {
  return (
    <>
      <div className="carditem">
        <div className="img-fluid">
            <img src="" alt="" />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            
            <div className='bg-gray-300 rounded p-2'>
                <h3> <span className='font-bold text-xl'>Sales</span> | Today </h3> 
                
                <div className='flex items-center py-2'>
                    <FcSalesPerformance className='w-10 h-10 rounded-full bg-gray-300' />  
                    <div className='ml-2'>
                        <h3 className='font-bold text-lg'>145</h3>
                        <p>12% increase</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-300 rounded p-2'>
                <h3> <span className='font-bold text-xl'>Sales</span> | Today </h3> 
                
                <div className='flex items-center py-2'>
                    <FcSalesPerformance className='w-10 h-10 rounded-full bg-gray-300' />  
                    <div className='ml-2'>
                        <h3 className='font-bold text-lg'>145</h3>
                        <p>12% increase</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-300 rounded p-2'>
                <h3> <span className='font-bold text-xl'>Sales</span> | Today </h3> 
                
                <div className='flex items-center py-2'>
                    <FcSalesPerformance className='w-10 h-10 rounded-full bg-gray-300' />  
                    <div className='ml-2'>
                        <h3 className='font-bold text-lg'>145</h3>
                        <p>12% increase</p>
                    </div>
                </div>
            </div>
            <div className='bg-gray-300 rounded p-2'>
                <h3> <span className='font-bold text-xl'>Sales</span> | Today </h3> 
                
                <div className='flex items-center py-2'>
                    <FcSalesPerformance className='w-10 h-10 rounded-full bg-gray-300' />  
                    <div className='ml-2'>
                        <h3 className='font-bold text-lg'>145</h3>
                        <p>12% increase</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default CardItem
