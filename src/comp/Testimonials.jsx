import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      designation: "CEO, Tech Corp",
      quote: "This payroll system has transformed how we manage our employee payments. Highly recommended!",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500"
    },
    {
      name: "Jane Smith",
      designation: "HR Manager, Innovation Inc",
      quote: "The most user-friendly payroll solution we've ever used. It's made our HR processes so much more efficient.",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500"
    }
  ];

  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20 relative z-[1]">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    zIndex: isActive(index) ? 2 : 1
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-300">
              {testimonials[active].designation}
            </p>
            <p className="text-lg text-gray-300 mt-8">
              {testimonials[active].quote}
            </p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <IconArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <IconArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;