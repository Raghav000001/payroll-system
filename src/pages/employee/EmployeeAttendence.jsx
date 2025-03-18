import {
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import React, { useState, useEffect } from "react";
import { realtimeDb } from "../../firebase/firebase";
import Sidebar from "../../comp/Sidebar";

const EmployeeAttendence = () => {
  const [employee, setEmployee] = useState([]);
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isadmin, setIsAdmin] = useState(true);
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveStartDate, setLeaveStartDate] = useState("");
  const [leaveEndDate, setLeaveEndDate] = useState("");

  const db = realtimeDb;

  //get all employees
  useEffect(() => {
    if (!db) {
      alert("Database is not connected");
      return;
    }
    const employeesRef = ref(db, "employees");
    onValue(employeesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const employeeList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setEmployee(employeeList);
        console.log(employeeList);
      } else {
        setEmployee([]);
      }
    });
  }, [db]);

  //get attendance records
  useEffect(() => {
    const attendanceRef = ref(db, `attendance/${currentDate}`);
    onValue(attendanceRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAttendanceRecords(data || {});
        //   || {} iska matlab hai agar data nahi hai toh empty object bana do else part yahi likh dia
      }
    });
  }, [db, currentDate]);

  //get leave requests
  useEffect(() => {
    const leaveRef = ref(db, "leaveRequests");
    onValue(leaveRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const leaveList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLeaveRequests(leaveList);
      } else {
        setLeaveRequests([]);
      }
    });
  }, [db]);

  //mark attendance
  function markAttendance(employeeId, status) {
    const attendanceRef = ref(db, `attendance/${currentDate}/${employeeId}`);
    set(attendanceRef, {
      status: status,
      timeStamp: new Date().toISOString(),
    });
  }

  // request leave
function requestLeave(e) {
  e.preventDefault();
  console.log(selectedEmployee);
  if (!selectedEmployee || !leaveStartDate || !leaveEndDate || !leaveReason) {
    alert("Please fill all the fields");
    return;
  }
  
  // Find the selected employee object from the employee array
  const selectedEmpObj = employee.find(emp => emp.id === selectedEmployee);
  
  if (!selectedEmpObj) {
    alert("Selected employee not found");
    return;
  }
  
  const employeeName = `${selectedEmpObj.firstName} ${selectedEmpObj.lastName}`;
  
  const leaveRef = ref(db, "leaveRequests");
  push(leaveRef, {
    employeeId: selectedEmployee,
    employeeName: employeeName, 
    startDate: leaveStartDate,
    endDate: leaveEndDate,
    reason: leaveReason,
    status: "pending",
    timeStamp: new Date().toISOString(),
  });
  alert("Leave request submitted successfully");

  //reset form fields
  setLeaveReason("");
  setLeaveStartDate("");
  setLeaveEndDate("");
  setSelectedEmployee(null);
}

  // approve or reject leave
  function updateLeaveStatus(leaveId, status) {
    const leaveRef = ref(db, `leaveRequests/${leaveId}`);
    update(leaveRef, {
      status: status,
    });
  }

  // delete leave request
  function deleteLeaveRequest(leaveId) {
    const leaveRef = ref(db, `leaveRequests/${leaveId}`);
    remove(leaveRef);
    alert("Leave request deleted successfully");
  }

  // get attendance status
  const getAttendanceStatus = (employeeId) => {
    return attendanceRecords[employeeId]?.status || "Not marked";
  };

  // Change date handler
  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  // Toggle between admin and employee view
  const toggleView = () => {
    setIsAdmin(!isadmin);
  };

  return (
    <div className="flex">
      <Sidebar/>
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="bg-blue-600 text-white px-4 py-2 rounded text-2xl font-bold">
          Attendance & Leave Management
        </h1>
        <button
          onClick={toggleView}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isadmin ? "Employee view" : "Admin view"}
        </button>
      </div>

      {/* Date selector */}
      <div className="mb-4">
        <label className="block mb-2">Select Date:</label>
        <input 
          type="date" 
          value={currentDate}
          onChange={handleDateChange}
          className="border p-2 rounded" 
        />
      </div>

      {isadmin ? (
        <>
          {/* Admin View */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Daily Attendance</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">Employee</th>
                  <th className="border p-2 text-left">Status</th>
                  <th className="border p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((emp) => (
                  <tr key={emp.id}>
                    <td className="border p-2">
                      {" "}
                      {emp.firstName} {emp.lastName}{" "}
                    </td>
                    <td className="border p-2">
                      <span
                        className={`px-2 py-1 rounded ${
                          attendanceRecords[emp.id]?.status === "present"
                            ? "bg-green-100 text-green-800"
                            : attendanceRecords[emp.id]?.status === "absent"
                            ? "bg-red-100 text-red-800"
                            : attendanceRecords[emp.id]?.status === "late"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {attendanceRecords[emp.id]?.status || "Not marked"}
                      </span>
                    </td>

                    <td className="border p-2">
                      <div className="flex space-x-2">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => markAttendance(emp.id, "present")}
                        >
                          Present
                        </button>

                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => markAttendance(emp.id, "absent")}
                        >
                          Absent
                        </button>

                        <button
                          className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => markAttendance(emp.id, "late")}
                        >
                          Late
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leave Requests Management */}
          <div>
            <h2 className="text-xl font-bold mb-4">Leave Requests</h2>
            {leaveRequests.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">Employee</th>
                    <th className="border p-2 text-left">Period</th>
                    <th className="border p-2 text-left">Reason</th>
                    <th className="border p-2 text-left">Status</th>
                    <th className="border p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((leave) => (
                    <tr key={leave.id}>
                      <td className="border p-2"> {leave.employeeName} </td>
                      <td className="border p-2">
                        {new Date(leave.startDate).toLocaleDateString()} -{" "}
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="border p-2"> {leave.reason} </td>
                      <td className="border p-2">
                        <span
                          className={`px-2 py-1 rounded ${
                            leave.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>

                      <td className="border p-2">
                        <div className="flex space-x-2">
                          {
                            leave.status==='pending' && (
                              <>
                                <button 
                                className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                                onClick={()=>updateLeaveStatus(leave.id, 'approved')}
                                >
                                    Approve
                                </button>
                                <button 
                                onClick={()=>updateLeaveStatus(leave.id, 'rejected')}
                                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                                >
                                    Reject
                                </button>
                              </>
                            )
                          }
                          <button   
                          onClick={()=> deleteLeaveRequest(leave.id)}
                          className="bg-gray-500 text-white px-2 py-1 rounded text-sm">
                            Delete

                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No leave requests found</p>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Employee View */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mark Attendance */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Mark Your Attendance</h2>
              <div className="mb-4">
                <label className="block mb-2">Select Employee:</label>
                <select
                  value={selectedEmployee || ""}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select an employee</option>
                  {employee.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.firstName} {emp.lastName}{" "}
                    </option>
                  ))}
                </select>
              </div>

              {selectedEmployee && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => markAttendance(selectedEmployee, "present")}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Mark Present
                  </button>
                  <button
                    onClick={() => markAttendance(selectedEmployee, "late")}
                    className="bg-yellow-500 text-white px-4 py-2 rounded"
                  >
                    Mark Late
                  </button>

                  <button
                    onClick={() => markAttendance(selectedEmployee, "absent")}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Mark Absent
                  </button>
                </div>
              )}
            </div>

            {/* Request Leave */}
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-4">Request Leave</h2>
              <form onSubmit={requestLeave}>
                <div className="mb-4">
                  <label className="block mb-2">Employee:</label>
                  <select
                    value={selectedEmployee || ""}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full border p-2 rounded"
                  >
                    <option value="">Select an employee</option>
                    {employee.map((emp) => (
                      <option key={emp.id} value={emp.id}>
                        {emp.firstName} {emp.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Start Date:</label>
                  <input
                    type="date"
                    value={leaveStartDate}
                    onChange={(e) => setLeaveStartDate(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">End Date:</label>
                  <input
                    type="date"
                    value={leaveEndDate}
                    onChange={(e) => setLeaveEndDate(e.target.value)}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Reason:</label>
                  <textarea
                    value={leaveReason}
                    onChange={(e) => setLeaveReason(e.target.value)}
                    className="w-full border p-2 rounded"
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
    </div>

  );
};

export default EmployeeAttendence;