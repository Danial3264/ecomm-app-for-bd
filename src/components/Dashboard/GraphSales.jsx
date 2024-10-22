import React from 'react'
import Chart from './Chart'
import RecentSales from './RecentSales'



const GraphSales = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-4'>
      <Chart />
      <RecentSales />
    </div>
  )
}

export default GraphSales
