import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaUserShield, FaIdCard, FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa";
import axios from "axios";

const LoginSignup = () => {
    const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: "student",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    _class: "",
    department: "",
    uid: "",
    adminKey: ""
  });

  const departments = [
    "Computer Science",
    "Information Technology", 
    "EXTC",
    "ECS",
    "Mechanical",
    "Civil",
    "Electrical",
    "Chemical"
  ];

  const classes = [
    "First Year",
    "Second Year", 
    "Third Year",
    "Final Year"
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Helper function to create request data
const createRegistrationData = (formData) => {
  const {role, email, password, fullName, _class , department, uid, adminKey } = formData;
  
  const baseData = { email, password, 'name':fullName };
  
  switch (role) {
    case 'student':
      return { ...baseData, _class , department, uid };
    case 'faculty':
      return { ...baseData, _class, department };
    case 'admin':
      return { ...baseData,  adminKey };
    default:
      throw new Error(`Unsupported role: ${role}`);
  }
};
  
  const handleAuth = async() => {
    if(isLogin){
      try {
    const response = await axios.post(`http://localhost:8080/api/${formData.role}/login`, {
      email: formData.email,
      password: formData.password
    });
    console.log(`${formData.role} Login successful:`, response.data);
     const { password, ...userData } = response.data;
      localStorage.setItem("user", JSON.stringify(userData));

    navigate(`/${formData.role}`);

  } catch (error) {
    console.error('Error logging in:', error.response?.data || error.message);
  }}
    else{
 try {
    const requestData = createRegistrationData(formData);
    console.log('Registration data:', requestData);
    const response = await axios.post(`http://localhost:8080/api/${formData.role}/register`, 
    requestData,
    {
      headers: { "Content-Type": "application/json" },
    }
    
    );

   console.log('Registration successful:', response.data);
    const { password, ...userData } = response.data;
      localStorage.setItem("user", JSON.stringify(userData));

   navigate(`/${formData.role}`);
      return response.data;
  } catch (error) {
    console.error('Error adding student:', error.response?.data || error.message);
  }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Form submitted:", formData);
    // Handle login/signup logic here
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Image/Graphics Placeholder */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 to-indigo-700 items-center justify-center p-12">
        <div className="text-white text-center max-w-md">
          <div className="w-full h-64 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-8 border-2 border-white/20">
            <div className="text-center">
              {/* <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <p className="text-white/80 text-lg">Welcome to Vero</p>*/}
              <img src="https://www.lystloc.com/blog/wp-content/uploads/2024/09/attendance-management-features.webp" alt="" className="border-none rounded-2xl"/>
              <p className="text-white/60 text-sm mt-2">Your Smart Attendance Solution</p> 
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Streamline Your Institution</h2>
          <p className="text-blue-100 text-lg leading-relaxed">
            Join thousands of educational institutions using Vero to manage attendance 
            with precision, security, and ease.
          </p>
          <div className="mt-8 flex justify-center space-x-6 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-sm">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-sm">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">100+</div>
              <div className="text-sm">Institutions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaUserShield className="text-white text-lg" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Vero
              </span>
            </Link>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-600">
              {isLogin ? "Sign in to your Vero account" : "Join Vero and streamline your attendance management"}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 lg:p-8">
            {/* Toggle Switch */}
            <div className="flex bg-slate-100 rounded-lg p-1 mb-6">
              <button
                onClick={() => {
                   
                    setIsLogin(true)}}
                className={`flex-1 py-3 px-4 rounded-md transition-all ${
                  isLogin 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 px-4 rounded-md transition-all ${
                  !isLogin 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-slate-600 hover:text-slate-800"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  I am a
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["student", "faculty", "admin"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({...formData, role})}
                      className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg border transition-all text-sm ${
                        formData.role === role
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-slate-300 text-slate-600 hover:border-slate-400"
                      }`}
                    >
                      {role === "student" && <FaGraduationCap className="text-sm" />}
                      {role === "faculty" && <FaChalkboardTeacher className="text-sm" />}
                      {role === "admin" && <FaUserShield className="text-sm" />}
                      <span className="capitalize">{role}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Common Fields */}
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                {/* Signup Specific Fields */}
                {!isLogin && (
                  <>
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Student Specific Fields */}
                    {formData.role === "student" && (
                      <>
                        {/* UID */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Student UID
                          </label>
                          <div className="relative">
                            <FaIdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="text"
                              name="uid"
                              value={formData.uid}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Enter your student ID"
                              required
                            />
                          </div>
                        </div>

                        {/* Class */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Class
                          </label>
                          <select
                            name="_class"
                            value={formData._class}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          >
                            <option value="">Select your class</option>
                            {classes.map((cls) => (
                              <option key={cls} value={cls}>{cls}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}

                    {/* Faculty Specific Fields */}
                    {formData.role === "faculty" && (
                      <>
                        {/* Department for Faculty */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Department
                          </label>
                          <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          >
                            <option value="">Select department</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>

 {/* Class */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Class
                          </label>
                          <select
                            name="_class"
                            value={formData._class}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            required
                          >
                            <option value="">Select your class</option>
                            {classes.map((cls) => (
                              <option key={cls} value={cls}>{cls}</option>
                            ))}
                          </select>
                        </div>

                      </>
                    )}

                    {/* Admin Specific Fields */}
                    {formData.role === "admin" && (
                      <>
                        {/* Admin Key */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Admin Authorization Key
                          </label>
                          <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                            <input
                              type="password"
                              name="adminKey"
                              value={formData.adminKey}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                              placeholder="Enter admin authorization key"
                              required
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Contact system administrator to get your authorization key
                          </p>
                        </div>
                      </>
                    )}

                    {/* Department for Student */}
                    {formData.role === "student" && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          required
                        >
                          <option value="">Select department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (Signup only) */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
              
                onClick={handleAuth}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-lg shadow-blue-500/25 font-medium"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>

              {/* Forgot Password */}
              {isLogin && (
                <div className="text-center">
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700 text-sm">
                    Forgot your password?
                  </Link>
                </div>
              )}
            </form>

            {/* Switch Mode Text */}
            <div className="text-center mt-6 pt-6 border-t border-slate-200">
              <p className="text-slate-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                
                  onClick={() => {
                   
                    setIsLogin(!isLogin)}}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-slate-500 text-sm mt-6">
            By continuing, you agree to Vero's{" "}
            <Link to="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;