import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function useProviders() {
  let { idC, idP } = useParams();
  const [providers, setProviders] = useState();
  const [catName, setCatName] = useState();
  const [onePro, setOnePro] = useState()
  const [review, setReview] = useState()
  let [loading, setLoading] = useState(true)
  async function getServiceProviders() {
    try {
      const res = await axios.get(
        `https://work-hive-project.vercel.app/api/v1/categories/${idC}/service-providers`
      );
      console.log(res.data.data);
      setProviders(res.data.data);
      setCatName(res?.data?.data[0]?.category.name);
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  }
  async function getOneProvider() {
    try{
      const res = await axios.get(`https://work-hive-project.vercel.app/api/v1/categories/${idC}/service-providers/${idP}`)
      // console.log(res.data);
      setOnePro(res.data)
      setLoading(false)
    }catch(err){
      console.log(err);
    }
    
  }
  async function getProvidersReview(){
    try{
      const res = await axios.get(`https://work-hive-project.vercel.app/api/v1/reviews/provider/${idP}`)
      setReview(res.data)
      setLoading(false)
    }catch(err){
      console.log(err);
      
    }
  }
  return {getServiceProviders, catName, providers, getOneProvider, onePro, review, getProvidersReview, loading};
}
