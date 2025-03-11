import React, { useState } from 'react';

const AttendanceTracker = () => {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", department: "Engineering", status: "present", checkIn: "09:00", checkOut: "" },
    { id: 2, name: "Jane Smith", department: "Design", status: "present", checkIn: "08:45", checkOut: "" },
    { id: 3, name: "Mike Johnson", department: "Marketing", status: "absent", checkIn: "", checkOut: "" },
    { id: 4, name: "Sarah Williams", department: "Finance", status: "late", checkIn: "10:15", checkOut: "" },
    { id: 5, name: "Robert Brown", department: "HR", status: "leave", checkIn: "", checkOut: "" },
  ]);

  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  
  const statusOptions = ["present", "absent", "late", "leave", "half-day"];
  const departments = ["All", "Engineering", "Design", "Marketing", "Finance", "HR"];
  
  const updateStatus = (id, newStatus) => {
    setEmployees(
      employees.map(emp => 
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
  };
  
  const updateTime = (id, field, time) => {
    setEmployees(
      employees.map(emp => 
        emp.id === id ? { ...emp, [field]: time } : emp
      )
    );
  };
  
  const filteredEmployees = employees.filter(emp => 
    (filterDept === "" || filterDept === "All" || emp.department === filterDept) &&
    (filterStatus === "" || emp.status === filterStatus)
  );
  
  const generateReport = () => {
    alert("Attendance report generated for " + date);
    // In a real application, this would generate a report or send data to a backend
  };

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
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                className="border rounded-md p-2" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select 
                value={filterDept} 
                onChange={(e) => setFilterDept(e.target.value)}
                className="border rounded-md p-2 h-10"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-md p-2 h-10"
              >
                <option value="">All Status</option>
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={generateReport}
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
            {filteredEmployees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{employee.name}</td>
                <td className="py-3 px-4 border-b">{employee.department}</td>
                <td className="py-3 px-4 border-b">
                  <select 
                    value={employee.status} 
                    onChange={(e) => updateStatus(employee.id, e.target.value)}
                    className={`border rounded-md p-1 ${
                      employee.status === 'present' ? 'bg-green-100' :
                      employee.status === 'absent' ? 'bg-red-100' :
                      employee.status === 'late' ? 'bg-yellow-100' :
                      employee.status === 'leave' ? 'bg-purple-100' : 'bg-orange-100'
                    }`}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 px-4 border-b">
                  <input 
                    type="time" 
                    value={employee.checkIn} 
                    onChange={(e) => updateTime(employee.id, "checkIn", e.target.value)}
                    disabled={employee.status === 'absent' || employee.status === 'leave'}
                    className="border rounded-md p-1"
                  />
                </td>
                <td className="py-3 px-4 border-b">
                  <input 
                    type="time" 
                    value={employee.checkOut} 
                    onChange={(e) => updateTime(employee.id, "checkOut", e.target.value)}
                    disabled={employee.status === 'absent' || employee.status === 'leave' || !employee.checkIn}
                    className="border rounded-md p-1"
                  />
                </td>
                <td className="py-3 px-4 border-b">
                  <div className="flex space-x-2">
                    <button className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition-colors text-sm">
                      History
                    </button>
                    <button className="bg-blue-100 px-2 py-1 rounded hover:bg-blue-200 transition-colors text-sm">
                      Notes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex justify-between">
        <div className="text-sm text-gray-500">
          Showing {filteredEmployees.length} of {employees.length} employees
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