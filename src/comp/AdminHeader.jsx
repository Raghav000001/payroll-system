import React from 'react';
import { FiBell, FiSearch } from 'react-icons/fi';
import Sidebar from './Sidebar';

function AdminHeader() {
  return (
    <div className="flex">

      {/* Sidebar */}
       <Sidebar/>

      {/* Main Content Area */}
      <div className="w-4/5">
        {/* Header */}
        <div className="bg-white shadow-md px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
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

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <FiBell className="text-gray-600 text-xl" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="https://via.placeholder.com/150"
                  alt="User profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Main content */}
        </div>
      </div>




    </div>
  );
}

export default AdminHeader;
