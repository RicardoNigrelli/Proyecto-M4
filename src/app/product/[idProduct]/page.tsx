import DetailProduct from '@/components/Product'
import React from 'react'


function page({ params }: { params: { idProduct: string }}) {
  return (
    <div>
      <DetailProduct params={{ idProduct: params.idProduct }} />

    </div>
  )
}

export default page