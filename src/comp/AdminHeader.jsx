import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';

function AdminHeader({children}) {
  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="w-4/5 ml-auto">
        {/* Fixed Header */}
        <div className="bg-white shadow-md px-6 py-4 fixed w-full z-10">
          <div className="flex items-center justify-between">
            {/* Search Bar - Restored */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Section - Restored */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <FiBell className="text-gray-600 text-xl" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src="https://i.pravatar.cc/150?img=1"  // Changed to more reliable placeholder
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 mt-16">
            {children}
          {/* Page content goes here */}
        </div>
      </div>
    </div>
  );
}

export default AdminHeader;
