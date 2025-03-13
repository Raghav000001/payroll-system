import React, { useState } from 'react'
import AdminHeader from '../../comp/AdminHeader'
import { realtimeDb } from '../../firebase/firebase'
import { onValue, ref, remove } from 'firebase/database'
import { useEffect } from 'react'



function AdminDashBoard() {
   const [employees,setEmployees]=useState([])


useEffect(() => {
  const employeesRef=ref(realtimeDb,'employees')
   onValue(employeesRef,(snapshot)=> {
      setEmployees(snapshot.val())

   })
  
}, [])
 
   function handleDelete(key){
        if (window.confirm("Are you sure you want to delete this employee?")) {
          const employeesRef=ref(realtimeDb,`employees/${key}`)
          remove(employeesRef)
          .then(()=>alert('Employee deleted successfully') )
          .catch((error)=>{
          console.error('Error deleting employee:',error)
         })
        }
   }
   

  return (
         <AdminHeader>
          <div className='flex justify-center'>
            <h1 className='text-3xl p-2 font-bold text-gray-700  cursor-pointer'>Admin Dashboard</h1>  
          </div>
          <div className='flex justify-evenly mt-10'>
            <div className='bg-gray-100 flex justify-evenly items-center shadow-xl h-36 w-60 rounded-lg hover:scale-110 transition-all cursor-pointer'>
               <div> <img  src={'../public/assets/images/dashboardicons1.png'} alt="" /> </div>
               <div> <p className='text-gray-500 mt-1'>Total employees</p> <span className='text-2xl  font-bold text-blue-500  '> {employees ? Object.keys(employees).length:0} </span> </div>
            </div>

            <div className='bg-gray-100 shadow-xl h-36 w-60 rounded-lg hover:scale-110 transition-all'>

            </div>
            <div className='bg-gray-100 shadow-xl h-36 w-60 rounded-lg hover:scale-110 transition-all'>

            </div>
            <div className='bg-gray-100 shadow-xl h-36 w-60 rounded-lg hover:scale-110 transition-all'>

            </div>
          </div>
          <div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md mt-7">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="py-2 px-4 border-b text-center">Name</th>
                  <th className="py-2 px-4 border-b text-center">Email</th>
                  <th className="py-2 px-4 border-b text-center">Phone</th>
                  <th className="py-2 px-4 border-b text-center">Address</th>
                  <th className="py-2 px-4 border-b text-center">Date of Birth</th>
                  <th className="py-2 px-4 border-b text-center">Date of Joining</th>
                  <th className="py-2 px-4 border-b text-center">Salary</th>
                  <th className="py-2 px-4 border-b text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  employees ? Object.keys(employees).map((key) => (
                    <tr key={key} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b text-center">{employees[key].firstName}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].email}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].phone}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].address}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].dateOfBirth}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].joiningDate}</td>
                      <td className="py-2 px-4 border-b text-center">{employees[key].salary}</td>
                      <td className="py-2 px-4 border-b text-center">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">Edit</button>
                        <button
                         onClick={()=>handleDelete(key) }
                         className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-2">Delete</button>
                      </td>
                    </tr>
                  )) : "Loading..."
                }
              </tbody>
            </table>
          </div>
         </AdminHeader> 
  )
}

export default AdminDashBoard
