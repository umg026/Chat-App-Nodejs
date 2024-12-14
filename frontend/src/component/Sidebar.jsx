import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuth';

export default function Sidebar() {

  const { isUsersLoading, selectedUser, users, getUsers, setSelectedUser, messages, unreadMessages } = useChatStore()
  // console.log("messages", messages);

  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isUsersLoading) return <div>Loading....</div>

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
          {/* <span className="text-xs text-zinc-500">({onlineUsers.length !== 0 ? (onlineUsers.length - 1) : "0"} online</span> */}
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3">
        {Array.isArray(users) && users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              ${unreadMessages[user._id] ? "bg-yellow-200" : ""}  // Highlight user with unread messages
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                rounded-full ring-2 ring-zinc-900"
                />
              )}
              {unreadMessages[user._id] && (
                <span className="absolute top-0 right-0 size-3 bg-red-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  )
}
