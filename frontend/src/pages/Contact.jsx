import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col mt-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Have questions? We’re here to help you with admissions, courses, and student services.
        </p>
      </div>

      {/* Contact Info + Form */}
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">
              Reach us anytime via phone, email, or drop by our office.
            </p>

            <div className="grid gap-6">
              {/* Address */}
              <div className="flex items-start space-x-4 bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition">
                <MapPin className="text-blue-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Our Office</h3>
                  <p className="text-gray-600">Bangalore, India</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition">
                <Phone className="text-blue-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-gray-600">+91 1800-123-4567 (Toll-Free)</p>
                  <p className="text-gray-600">Mon - Fri, 9AM - 6PM IST</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4 bg-white shadow-md p-4 rounded-xl hover:shadow-lg transition">
                <Mail className="text-blue-600 w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-gray-600">support@scms.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>
            <form className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm text-gray-600">Your Name</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-gray-600">Email Address</label>
                <input
                  type="email"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm text-gray-600">Message</label>
                <textarea
                  rows="4"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your message..."
                ></textarea>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
