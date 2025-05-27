import React, { useState } from 'react'
import axios  from 'axios';


export default function useCategories() {
    const[catData, setCatData] = useState()
    let [loading, setLoading] = useState(true)
    async function getCategories() {
        try{
            const res = await axios.get("https://work-hive-project.vercel.app/api/v1/categories")
            console.log(res.data);
            setCatData(res.data)   
            setLoading(false)         
        }catch(err){
            console.log(err);
        }
    }
  return {getCategories, catData, loading}
}
