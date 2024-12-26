import { useState } from 'react'
import { useAuthStore } from '../store/useAuth'
import { useChatStore } from '../store/useChatStore'
import { X } from 'lucide-react'

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore()
    const { onlineUsers } = useAuthStore()
    const [showProfile, setShowProfile] = useState(false)


    return (
        <>
        <div className="p-2.5 border-b border-base-300" onClick={()=>setShowProfile(true)}>
            <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullname} />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullname}</h3>
                        <p className="text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
        {showProfile && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowProfile(false)} // Close modal on overlay click
                >
                    <div
                        className="bg-white w-1/2 h-1/2 rounded-lg p-4 relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
                    >
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => setShowProfile(false)}
                        >
                            <X />
                        </button>
                        <div className="text-center">
                            <img
                                src={selectedUser.profilePic || "/avatar.png"}
                                alt={selectedUser.fullname}
                                className="w-28 h-28 mx-auto rounded-full mt-4"
                            />
                            <div className="text-xl mt-2">{selectedUser.fullname}</div>
                            <p className="text-sm"> {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ChatHeader