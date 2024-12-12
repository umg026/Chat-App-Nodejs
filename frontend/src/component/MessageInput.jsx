import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Send } from 'lucide-react'

export default function  MessageInput() {
    const [text, setText] = useState("")
    const {sendMessage} = useChatStore()

    const handelSendMessage = async(e)=>{
        e.preventDefault()

        if(!text.trim()) return;
        // console.log("message",text.trim());
        
        try {
            await sendMessage({text : text.trim()})
            setText("");
        }
         catch (error) {
            console.log("failed to send message", error); 
        }
    }
  return (
    <div className="p-4 w-full">
      <form onSubmit={handelSendMessage} className="flex items-center gap-2 align-bottom">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}
