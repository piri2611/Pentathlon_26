interface NavbarProps {
  activePage: 'bazar' | 'display' | 'coding' | null;
  onNavigate: (page: 'bazar' | 'display' | 'coding') => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navbar = ({ activePage, onNavigate, isLoggedIn = false, onLogout }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1729] border-b border-white/10">
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo Section - Fixed at left */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg sm:text-xl md:text-xl">P</span>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">Pentathlon</span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden sm:flex items-center gap-6 md:gap-12 absolute left-1/2 transform -translate-x-1/2">
            {!isLoggedIn && (
              <button
                onClick={() => onNavigate('bazar')}
                className={`text-sm md:text-lg font-medium transition-all duration-300 pb-2 border-b-2 outline-none focus:outline-none focus:ring-0 ${
                  activePage === 'bazar'
                    ? 'text-cyan-400 border-cyan-400'
                    : 'text-gray-300 hover:text-white border-b-2 border-transparent'
                }`}
              >
                Bazar
              </button>
            )}

            {!isLoggedIn && <div className="w-px h-6 bg-white/20"></div>}

            {!isLoggedIn && (
              <button
                onClick={() => onNavigate('coding')}
                className={`text-sm md:text-lg font-medium transition-all duration-300 pb-2 border-b-2 outline-none focus:outline-none focus:ring-0 ${
                  activePage === 'coding'
                    ? 'text-cyan-400 border-cyan-400'
                    : 'text-gray-300 hover:text-white border-b-2 border-transparent'
                }`}
              >
                Coding
              </button>
            )}

            {isLoggedIn && <div className="w-px h-6 bg-white/20"></div>}

            {isLoggedIn && (
              <button
                onClick={() => onNavigate('display')}
                className={`text-sm md:text-lg font-medium transition-all duration-300 pb-2 border-b-2 outline-none focus:outline-none focus:ring-0 ${
                  activePage === 'display'
                    ? 'text-cyan-400 border-cyan-400'
                    : 'text-gray-300 hover:text-white border-b-2 border-transparent'
                }`}
              >
                Display
              </button>
            )}
          </div>

          {/* Right Side - Logout Button */}
          {isLoggedIn && onLogout && (
            <button
              onClick={onLogout}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm md:text-base bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 hover:border-red-500 transition-all font-medium"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
