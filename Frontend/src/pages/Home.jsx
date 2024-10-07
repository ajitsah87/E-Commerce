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
   <HorizontalCardProduct category={"Televisions"} heading={"Branded Televisions"}/>   
   <VerticalCardProduct category={"Mobiles"} heading={"Fastest's Mobiles"}/>
    </div>
  )
}

export default Home
