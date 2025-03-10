import React from 'react'

function Footer() {
  return (
    <footer className='bg-black text-white py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div>
            <h3 className='text-xl font-bold mb-4'>Elysium Payroll System</h3>
            <p className='text-blue-200'>Streamlining payroll management for businesses of all sizes.</p>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
            <ul className='space-y-2'>
              <li><a href="#" className='text-blue-200 hover:text-white'>About Us</a></li>
              <li><a href="#" className='text-blue-200 hover:text-white'>Services</a></li>
              <li><a href="#" className='text-blue-200 hover:text-white'>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className='text-lg font-semibold mb-4'>Contact Info</h4>
            <ul className='space-y-2 text-blue-200'>
              <li>Email: info@elysium.com</li>
              <li>Phone: (+91-870882763) </li>
              <li>Address: 123 Business Street</li>
            </ul>
          </div>
        </div>
        <div className='mt-8 pt-8 border-t border-blue-700 text-center text-blue-200'>
          <p>&copy; {new Date().getFullYear()} Elysium Payroll System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer