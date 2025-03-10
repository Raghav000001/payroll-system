import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'


// Lazy load components
const Home = lazy(() => import("./pages/Home"))
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const CreateAdmin = lazy(() => import("./pages/CreateAdmin"))
const EmployeeRegistration = lazy(() => import("./pages/admin/EmployeeRegistration"))
const Salary = lazy(() => import("./pages/employee/Salary"))
const Attendence = lazy(() => import("./pages/employee/Attendence"))
const AdminHome= lazy(()=> import('./pages/admin/AdminHome'))

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
        <Route path='/admin/home' element={<AdminHome />} />
        <Route path='/create-admin' element={<CreateAdmin />} />
        <Route path='/admin/employee/registration' element={<EmployeeRegistration />} />
        <Route path='/employee/salary' element={<Salary />} />
        <Route path='/employee/attendence' element={<Attendence />} />
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
