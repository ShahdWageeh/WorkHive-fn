import React, { useEffect, useState } from 'react'
import useProviders from '../../Hooks/useProviders'
import ProviderDetails from '../providerDetails/ProviderDetails'
import ProviderServices from '../provider services/ProviderServices'
import { useParams } from 'react-router-dom'
import { Blocks } from "react-loader-spinner";

export default function ProviderProfile() {
    const {getOneProvider, onePro, review, getProvidersReview} = useProviders()
    const [loading, setLoading] = useState(true)
    const x = useParams()
    
    useEffect(() => {
        async function fetchData() {
            try {
                await Promise.all([
                    getOneProvider(),
                    getProvidersReview()
                ])
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {loading ? (
                <section className="min-h-screen bg-blue-900 bg-opacity-80 flex justify-center items-center">
                    <Blocks
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        visible={true}
                    />
                </section>
            ) : (
                <>
                    <ProviderDetails pro={onePro} rev={review} />
                    <ProviderServices ids={x}/>
                </>
            )}
        </>
    )
}
