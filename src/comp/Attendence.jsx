
const AttendanceTracker = () => {
       

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Attendance Tracker</h1>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input 
                type="date" 
                className="border rounded-md p-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select 
                className="border rounded-md p-2 h-10"
              >
                <option value="">All Departments</option>
                  {
                      
                  }
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 

                className="border rounded-md p-2 h-10"
              >
                <option value="">All Status</option>
                  {

                  }
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
            
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Generate Report
            </button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left">Employee</th>
              <th className="py-3 px-4 border-b text-left">Department</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Check In</th>
              <th className="py-3 px-4 border-b text-left">Check Out</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {

            }
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="text-sm text-gray-500">
          {/* showing ___ of ____ employees */}
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-100 rounded-full mr-2"></div>
            <span className="text-sm">Present</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-100 rounded-full mr-2"></div>
            <span className="text-sm">Absent</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-100 rounded-full mr-2"></div>
            <span className="text-sm">Late</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-purple-100 rounded-full mr-2"></div>
            <span className="text-sm">Leave</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;