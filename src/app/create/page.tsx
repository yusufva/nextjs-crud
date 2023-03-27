"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e:any)=>{
        e.preventDefault()

        setIsLoading(true)

        const rest = await fetch("/api/post",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,content
            })
        }).then((res)=>{

        }).catch((e)=>{

        })

        setIsLoading(false)

        router.push('/')
    }
    return (
        <form className='w-[500px] mx-auto pt-20 flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Masukkan Judul' value={title} onChange={(e)=>setTitle(e.target.value)} className='w-full border p-2 rounded-md' />
            <input type="text" placeholder='Masukkan Konten' value={content} onChange={(e)=>setContent(e.target.value)} className='w-full border p-2 rounded-md' />
            <button disabled={isLoading}>{isLoading ? "Loading...": "Submit"}</button>
        </form>
    )
}
