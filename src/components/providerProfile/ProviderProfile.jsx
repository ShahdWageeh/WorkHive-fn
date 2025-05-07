import React, { useEffect } from 'react'
import useProviders from '../../Hooks/useProviders'
import ProviderDetails from '../providerDetails/ProviderDetails'
import ProviderServices from '../provider services/ProviderServices'
import { useParams } from 'react-router-dom'

export default function ProviderProfile() {
    const {getOneProvider, onePro, review, getProvidersReview} = useProviders()
    const x = useParams()
    useEffect(()=>{
        getOneProvider()
        getProvidersReview()
    },[])
  return (
    <>
    <ProviderDetails pro={onePro} rev={review} />
    <ProviderServices ids={x}/>
    </>
  )
}
