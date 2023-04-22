import Layout from "@/components/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default  function(){
    const [productInfo,setProductInfo]=useState(null)
    const routre=useRouter()
    const id =routre.query.id
    useEffect(()=>{
        if(!id){
            return
        }
         axios.get('/api/products?id='+id).then(response=>{
                setProductInfo(response.data)
            })
        
    },[id])
    // console.log(productInfo)
    const goBack=()=>{
        routre.push('/Products')
    }
    const deleteItem=()=>{
         axios.delete('/api/products?id='+id)
         goBack()
    }
    return(
        <Layout>
            <div className="mt-5">
        <h1 className="flex justify-center text-xl ">Do you really want to delete "{productInfo?.pname}" ?</h1>
        <div className="flex justify-center gap-4 mt-6 btn-delete">
            <button className="bg-red-600 "onClick={deleteItem} >Yes</button>
            <button className="bg-gray-500 " onClick={goBack}>No</button>
        </div>
        </div>
    </Layout>
    )
    }