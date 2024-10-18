import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'


const Home = () => {
  return (
    <div>
   <CategoryList/>   
   <BannerProduct/>   
   <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"}/>   
   <HorizontalCardProduct category={"Watches"} heading={"Superb Watches"}/>   
   <VerticalCardProduct category={"Mobiles"} heading={"Fastest's Mobiles"}/>
   <VerticalCardProduct category={"Televisions"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Speakers"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Mouse"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Camera"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Earphones"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Refrigeator"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Trimmers"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Trimmers"} heading={"Branded Televisions"}/>
   <VerticalCardProduct category={"Printers"} heading={"Branded Televisions"}/>
    </div>
  )
}

export default Home
