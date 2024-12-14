import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../component/NoChatSelected'
import ChatContainer from '../component/ChatContainer'
import Sidebar from '../component/Sidebar'
import { useEffect, useState } from 'react'
import { AlignLeft } from 'lucide-react'

function Home() {
  const { selectedUser } = useChatStore()
  const [isSidebar, setIsSidebar] = useState(true)

  useEffect(() => {
    if (selectedUser) {
      setIsSidebar(false);
    }
  }, [selectedUser])

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 680;
      if (width) {
        setIsSidebar(false);
      } else {
        setIsSidebar(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <div onClick={() => setIsSidebar(!isSidebar)} className='mt-4 pl-2 pt-1' >
              <AlignLeft />
            </div>
            {isSidebar && <Sidebar />}
            {!selectedUser ? <NoChatSelected /> : <ChatContainer  />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
