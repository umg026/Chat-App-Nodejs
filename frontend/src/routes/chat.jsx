import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Chat() {
    const [chat, setChat] = useState([])

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get('https://dummyjson.com/users');
                setChat(data.users);
                console.log(data);
                
            } catch (error) {
                console.log("error", error)
            }
        }
        fetch()
    }, [])
    return (
        <div>
            { chat.length !== 0 ? chat.map((item,index) => {
                return (
                    <div key={index}>{item.firstName}</div>
                )
            })
                : <div>No data Found</div>
            }
        </div>
    )
}
