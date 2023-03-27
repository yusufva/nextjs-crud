"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = (
    {params,}:{params:{id:string}}
)=> {
    
    const id = Number(params.id)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e:any)=>{
        e.preventDefault()
        setIsLoading(true)

        await fetch("/api/post",{
            method:"PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,content,id
            })
        }).then((res)=>{

        }).catch((err)=>{

        })
        setIsLoading(false)
        router.push('/')
    }

    useEffect(()=>{
        getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getData =async () => {
        const res = await fetch("/api/post/"+id)
        const json = await res.json()
        
        if(!json){
            router.push('/404')
            return
        }

        setTitle(json.post.title)
        setContent(json.post.content)
    }

    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Masukkan Judul' value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Konten' value={content} onChange={(e)=>setContent(e.target.value)} className='w-full border p-2 rounded-md' />
            <button disabled={isLoading}>{isLoading ? "Loading...": "Update"}</button>
        </form>
    )
}

export default Page
