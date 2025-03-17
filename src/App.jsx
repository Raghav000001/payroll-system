import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'


// Lazy load components
const Home = lazy(() => import("./pages/Home"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const CreateAdmin = lazy(() => import("./pages/CreateAdmin"))
const EmployeeRegistration = lazy(() => import("./pages/admin/EmployeeRegistration"))
const Salary = lazy(() => import("./pages/employee/Salary"))
const   EmployeeAttendence = lazy(() => import("./pages/employee/EmployeeAttendence"))
const AdminDashBoard= lazy(()=> import('./pages/admin/AdminDashBoard'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
)

function App() {
  const routes = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path='/' element={<Home />} />
        <Route path='/admin/login' element={<AdminLogin />} />        
        <Route path='/employee/attendance' element={<EmployeeAttendence />} />        
        <Route path='/admin/dashboard' element={<AdminDashBoard />} />
        <Route path='/create-admin' element={<CreateAdmin />} />
        <Route path='/admin/employee/registration' element={<EmployeeRegistration />} />
        <Route path='/employee/salary' element={<Salary />} />
      </Route>
    )
  )

  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={routes} />
    </Suspense>
  )
}

export default App
