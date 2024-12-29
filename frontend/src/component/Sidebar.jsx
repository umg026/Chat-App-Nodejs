import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Plus } from 'lucide-react';
import { useAuthStore } from '../store/useAuth';

export default function Sidebar() {
  const { isUsersLoading, selectedUser,getUserForSideBar,sidebarUsers, users,addUsersForSidebar, getUsers, setSelectedUser, unreadMessages } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [isAddChat, setIsAddChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const selectedValues = [];
  const {authUser} = useAuthStore()
  

  const filtredUsers = users.filter(user => !selectedValues.includes(user._id) && sidebarUsers.includes(user._id))
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(()=>{
    getUserForSideBar();
  },[])

  const displayedUsers = users.filter(user => sidebarUsers.includes(user._id))

  const handleSuggestionClick = (id, userId) => {
    selectedValues.push(id);
    setInputValue("");    
    addUsersForSidebar(selectedValues, userId);
    setIsAddChat(false);
  };

  if (isUsersLoading) return <div>Loading....</div>;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div
          className="flex items-center gap-2 btn"
          onClick={() => setIsAddChat(true)}
        >
          <Plus className="size-6" />
          <span className="font-medium hidden lg:block">Add Chat</span>
        </div>
      </div>

      {isAddChat && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 w-[80%] h-screen mt-5 mb-5 rounded-lg shadow-lg relative">
            <h3 className="text-lg font-bold">Add Chat</h3>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search or Add User"
              className="border mt-4 border-gray-300 rounded-md p-2 w-full"
            />
            {
              inputValue && (
                <div className="bg-white border border-gray-300 rounded shadow-md">
                  {filtredUsers
                    .filter((item) =>
                      item.fullname.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((suggestion, index) => (
                      <div
                        key={index}
                        onClick={() =>{
                          handleSuggestionClick(suggestion._id, authUser._id)
                          }}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                      >
                        {suggestion.fullname}
                      </div>
                    ))}
                </div>
              )
            }
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsAddChat(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-y-auto w-full py-3">
        {Array.isArray(displayedUsers) &&
          displayedUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors 
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
              ${unreadMessages[user._id] ? "bg-yellow-200" : ""}`}
            >
              <div className="relative mx-auto lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
                )}
                {unreadMessages[user._id] && (
                  <span className="absolute top-0 right-0 size-3 bg-red-500 rounded-full ring-2 ring-zinc-900" />
                )}
              </div>

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
  );
}
