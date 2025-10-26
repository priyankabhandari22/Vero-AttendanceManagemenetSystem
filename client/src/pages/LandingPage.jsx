import React from "react";
import { Link } from "react-router-dom";
import { FaUserShield, FaChartLine, FaUsers, FaSitemap, FaChartBar, FaCalendarCheck, FaShieldAlt, FaRocket, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import landingImg from "../assest/landingpage.jpeg"


const LandingPage = () => {
  const features = [
    {
      icon: <FaUserShield className="text-2xl" />,
      title: "Role-based Access",
      description: "Secure login for Admin, Faculty, and Students with appropriate permissions"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Attendance Tracking",
      description: "Real-time attendance marking and comprehensive reporting system"
    },
    {
      icon: <FaUsers className="text-2xl" />,
      title: "User Management",
      description: "Efficiently manage students, faculty, and administrative staff"
    },
    {
      icon: <FaSitemap className="text-2xl" />,
      title: "Branch Management",
      description: "Organize data by academic departments and courses"
    },
    {
      icon: <FaChartBar className="text-2xl" />,
      title: "Analytics & Reports",
      description: "Detailed insights and exportable attendance reports"
    },
    {
      icon: <FaCalendarCheck className="text-2xl" />,
      title: "Leave Management",
      description: "Streamlined leave application and approval process"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Accuracy" },
    { number: "50K+", label: "Users" },
    { number: "100+", label: "Institutions" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Vero
              </span>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#contact" className="text-slate-600 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            
            <Link to="/login">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-6">
                <FaRocket className="mr-2" />
                Trusted by 100+ Educational Institutions
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
                Smart Attendance
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Made Simple</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
               <span className="text-blue-600 font-bold"> Vero </span>revolutionizes attendance management with cutting-edge technology, 
                providing seamless tracking, robust analytics, and unparalleled security 
                for modern educational institutions.
              </p>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/login">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 flex items-center">
                    Get Started <FaArrowRight className="ml-2" />
                  </button>
                </Link>
                <button className="border border-slate-300 text-slate-700 px-8 py-4 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all">
                  Contact Support
                </button>
              </div>
            </div>
            
            <div className="lg:w-1/2 flex justify-center">
              <div className="relative">
                <div className="w-96 h-96 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    {/* Image placeholder - Replace with your dashboard screenshot */}
                    <div className="w-full h-64 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                      {/* <span className="text-white/80">Dashboard Preview</span> */}
                      <img src={landingImg} alt=" " />
                    </div>
                    <p className="">Modern Interface</p>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-500 rounded-2xl rotate-12 shadow-lg flex items-center justify-center">
                  <FaCheckCircle className="text-white text-2xl" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-500 rounded-2xl -rotate-12 shadow-lg flex items-center justify-center">
                  <FaChartLine className="text-white text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Powerful Features for <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Education</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage attendance efficiently and securely
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Attendance Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of institutions that trust Vero for their attendance tracking needs.
          </p>
          <Link to="/login">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl hover:bg-slate-100 transition-all shadow-2xl font-semibold text-lg">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-lg flex items-center justify-center">
                <FaShieldAlt className="text-white text-sm" />
              </div>
              <span className="text-xl font-bold">Vero</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Vero Attendance System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;