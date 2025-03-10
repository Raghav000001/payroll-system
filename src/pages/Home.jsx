import { useNavigate } from 'react-router-dom'
import Footer from '../comp/Footer'
import  Testimonials  from '../comp/Testimonials'
function Home() {
    const navigate=useNavigate()
  return (
    <> 
      <div className="min-h-screen flex flex-col">
         <div>
            {/* todo= add menu bar here */}
         </div>

        <main className="flex-grow">
          <section className="relative h-[80vh]">
            <img 
              src="/assets/images/homepagebanner.svg"
              alt="Payroll Management" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl font-bold mb-4">Welcome to Elysium Payroll System</h1>
                <p className="text-xl">Streamline your payroll management with our advanced solution</p>
                <button
                 onClick={()=>navigate('/admin/login')}
                 className="bg-blue-500 hover:bg-blue-700 mt-4 rounded-xl p-3">
                  Click to login
                </button>
              </div>
            </div>
          </section>

          <section className='bg-black py-16'>
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Form Side */}
                <div className="p-6 border-r-2">
                  <h2 className="text-3xl font-bold text-white text-center mb-12">Contact Us</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email</label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                        placeholder="What's this about?"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Message</label>
                      <textarea
                        rows="4"
                        className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Your message..."
                      ></textarea>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>

                {/* Testimonials Side */}
                <div className="p-6">
                  <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Clients Say</h2>
                  <Testimonials />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Home