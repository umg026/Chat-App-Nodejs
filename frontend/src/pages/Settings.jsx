import { THEME } from '../constant/theme';
import { useAuthStore } from '../store/useAuth';
import { useThemeStore } from '../store/useTheme';
import {Link} from 'react-router-dom'


function Settings() {
  const { theme, setTheme } = useThemeStore()
  const {authUser} = useAuthStore()
  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex justify-between gap-1">
          <div>
            <h2 className="text-lg font-semibold">Settings</h2>
            <p className="text-sm text-base-content/70">Edit your profile and Choose a theme for your chat interface </p>
          </div>
          <div>
            <Link to="/" className='btn '>Back</Link>
          </div>
        </div>
        {/* profile */}
        <div className='mt-5 mb-5 bg-gray-100 p-5 rounded-md'>
          <img
              src={authUser.profilePic || "/avatar.png"}
              alt={authUser.fullname}
              className="w-28 h-28 mx-auto rounded-full mt-4"
            />
          <div className='font-mono text-xl'>
            Your Name 
          </div>
          <p className='text-lg'>
          {authUser.fullname}
          </p>
          <hr />
          <div className='font-mono mt-5 text-xl'>
            Your Email 
          </div>
          <p className='text-lg'> 
          {authUser.email}
          </p>
          <hr />
          <br /><br /><br /><br />
        </div>
        {/* THEME */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEME.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Settings
