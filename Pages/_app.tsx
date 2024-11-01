import Layout from "@/components/Layout";
import "../styles/globals.css"
import {useState, useEffect} from 'react'
import type { AppProps } from "next/app"



function MyApp({ Component, pageProps} : AppProps) {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    },[])
    return (
        <Layout>
            
            {isMounted &&  <Component {...pageProps} />}
        </Layout>
    )
}
export default MyApp;