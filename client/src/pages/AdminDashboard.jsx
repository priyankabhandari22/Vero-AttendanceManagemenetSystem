import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, 
  FaUser, 
  FaUsers,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaChartBar,
  FaCalendarCheck,
  FaCog,
  FaBuilding,
  FaFileExport,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaPlus,
  FaCheck,
  FaTimes,
  FaExclamationTriangle,
  FaUserShield,
  FaDatabase,
  FaBell
} from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy admin data
  const adminData = {
    name: "Admin User",
    email: "admin@vero.edu",
    role: "Super Admin"
  };

  const user= JSON.parse(localStorage.getItem("user"));

  // Statistics data
  const statsData = {
    totalStudents: 1250,
    totalFaculty: 45,
    totalBranches: 8,
    todayAttendance: 87.5,
    pendingLeaves: 23,
    systemHealth: 99.8
  };

  // Recent activities
  const recentActivities = [
    { id: 1, action: "New student registered", user: "Rahul Sharma", time: "2 mins ago", type: "student" },
    { id: 2, action: "Leave application approved", user: "Dr. Priya Patel", time: "15 mins ago", type: "faculty" },
    { id: 3, action: "Attendance marked", user: "Computer Science Dept", time: "1 hour ago", type: "system" },
    { id: 4, action: "New faculty added", user: "Prof. Amit Kumar", time: "2 hours ago", type: "faculty" },
    { id: 5, action: "System backup completed", user: "System", time: "3 hours ago", type: "system" }
  ];

  // Dummy students data
  const studentsData = [
    { id: 1, name: "Rahul Sharma", uid: "STU2024001", department: "Computer Science", semester: 4, attendance: 85.5, status: "active" },
    { id: 2, name: "Priya Singh", uid: "STU2024002", department: "Information Technology", semester: 3, attendance: 92.3, status: "active" },
    { id: 3, name: "Amit Kumar", uid: "STU2024003", department: "EXTC", semester: 2, attendance: 78.9, status: "active" },
    { id: 4, name: "Sneha Reddy", uid: "STU2024004", department: "Computer Science", semester: 4, attendance: 88.1, status: "inactive" },
    { id: 5, name: "Karan Mehta", uid: "STU2024005", department: "Mechanical", semester: 1, attendance: 65.4, status: "active" }
  ];

  // Dummy faculty data
  const facultyData = [
    { id: 1, name: "Dr. Priya Patel", employeeId: "FAC2024001", department: "Computer Science", subjects: 4, status: "active" },
    { id: 2, name: "Prof. Rajesh Kumar", employeeId: "FAC2024002", department: "Information Technology", subjects: 3, status: "active" },
    { id: 3, name: "Dr. Anjali Desai", employeeId: "FAC2024003", department: "EXTC", subjects: 5, status: "active" },
    { id: 4, name: "Prof. Sanjay Verma", employeeId: "FAC2024004", department: "Mechanical", subjects: 2, status: "inactive" }
  ];

  // Dummy branches data
  const branchesData = [
    { id: 1, name: "Computer Science", code: "CS", students: 320, faculty: 8, hod: "Dr. Priya Patel" },
    { id: 2, name: "Information Technology", code: "IT", students: 280, faculty: 6, hod: "Prof. Rajesh Kumar" },
    { id: 3, name: "EXTC", code: "EXTC", students: 240, faculty: 7, hod: "Dr. Anjali Desai" },
    { id: 4, name: "Mechanical", code: "MECH", students: 180, faculty: 5, hod: "Prof. Sanjay Verma" },
    { id: 5, name: "Civil", code: "CIVIL", students: 150, faculty: 4, hod: "Dr. Ramesh Iyer" }
  ];

  // Dummy leave applications
  const leaveApplications = [
    {
      id: 1,
      userName: "Rahul Sharma",
      userType: "student",
      fromDate: "2024-01-15",
      toDate: "2024-01-17",
      type: "medical",
      reason: "Fever and cold",
      status: "pending"
    },
    {
      id: 2,
      userName: "Dr. Priya Patel",
      userType: "faculty",
      fromDate: "2024-01-18",
      toDate: "2024-01-18",
      type: "personal",
      reason: "Family function",
      status: "approved"
    },
    {
      id: 3,
      userName: "Amit Kumar",
      userType: "student",
      fromDate: "2024-01-20",
      toDate: "2024-01-22",
      type: "medical",
      reason: "Dental surgery",
      status: "pending"
    }
  ];

  const [students, setStudents] = useState(studentsData);
  const [faculty, setFaculty] = useState(facultyData);
  const [branches, setBranches] = useState(branchesData);
  const [leaves, setLeaves] = useState(leaveApplications);

  const handleLeaveAction = (leaveId, action) => {
    setLeaves(leaves.map(leave =>
      leave.id === leaveId ? { ...leave, status: action } : leave
    ));
  };

  const deleteUser = (id, type) => {
    if (type === 'student') {
      setStudents(students.filter(student => student.id !== id));
    } else {
      setFaculty(faculty.filter(fac => fac.id !== id));
    }
  };

  const toggleUserStatus = (id, type) => {
    if (type === 'student') {
      setStudents(students.map(student =>
        student.id === id ? { ...student, status: student.status === 'active' ? 'inactive' : 'active' } : student
      ));
    } else {
      setFaculty(faculty.map(fac =>
        fac.id === id ? { ...fac, status: fac.status === 'active' ? 'inactive' : 'active' } : fac
      ));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <FaCheck className="text-green-500" />;
      case 'inactive': return <FaTimes className="text-red-500" />;
      case 'approved': return <FaCheck className="text-green-500" />;
      case 'rejected': return <FaTimes className="text-red-500" />;
      case 'pending': return <FaExclamationTriangle className="text-yellow-500" />;
      default: return <FaExclamationTriangle className="text-gray-500" />;
    }
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.uid.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFaculty = faculty.filter(fac =>
    fac.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fac.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fac.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeaves = leaves.filter(leave =>
    leave.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout=()=>{
  localStorage.removeItem("user");
navigate("/login")
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaUserShield className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Vero Admin Portal</h1>
                <p className="text-sm text-slate-600">Complete System Control</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-3 text-slate-600 hover:text-slate-800 transition-colors relative">
                <FaBell />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-600">{adminData.role}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <FaUser className="text-slate-600" />
              </div>
              <button className="p-2 text-slate-600 hover:text-slate-800 transition-colors" onClick={handleLogout}>
                <FaSignOutAlt />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                <p className="text-sm text-slate-600">{user.email}</p>
                <p className="text-sm text-slate-600">{adminData.role}</p>
              </div>

              <div className="space-y-1">
                {[
                  { id: "overview", label: "Overview", icon: FaChartBar },
                  { id: "students", label: "Students", icon: FaGraduationCap },
                  { id: "faculty", label: "Faculty", icon: FaChalkboardTeacher },
                  { id: "branches", label: "Branches", icon: FaBuilding },
                  { id: "leaves", label: "Leave Management", icon: FaCalendarCheck },
                  { id: "reports", label: "Reports & Analytics", icon: FaFileExport },
                  { id: "settings", label: "System Settings", icon: FaCog }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left py-3 px-4 rounded-xl transition-all flex items-center space-x-3 ${
                      activeTab === item.id 
                        ? "bg-purple-50 text-purple-700 border border-purple-200" 
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <item.icon className="text-lg" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <FaDatabase className="text-purple-600" />
                <span>System Status</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">System Health</span>
                  <span className="font-semibold text-green-600">{statsData.systemHealth}%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Active Users</span>
                  <span className="font-semibold text-slate-800">1,295</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Storage Used</span>
                  <span className="font-semibold text-slate-800">45%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Total Students</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.totalStudents}</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <FaGraduationCap className="text-blue-600 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Total Faculty</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.totalFaculty}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FaChalkboardTeacher className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Today's Attendance</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.todayAttendance}%</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <FaChartBar className="text-purple-600 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Total Branches</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.totalBranches}</p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <FaBuilding className="text-orange-600 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">Pending Leaves</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.pendingLeaves}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <FaCalendarCheck className="text-yellow-600 text-xl" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600">System Health</p>
                        <p className="text-3xl font-bold text-slate-800">{statsData.systemHealth}%</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <FaDatabase className="text-green-600 text-xl" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activities</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.type === 'student' ? 'bg-blue-100' : 
                          activity.type === 'faculty' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          {activity.type === 'student' && <FaGraduationCap className="text-blue-600" />}
                          {activity.type === 'faculty' && <FaChalkboardTeacher className="text-green-600" />}
                          {activity.type === 'system' && <FaDatabase className="text-purple-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-slate-800">{activity.action}</p>
                          <p className="text-sm text-slate-600">By {activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Students Management Tab */}
            {activeTab === "students" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Students Management</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-64 pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center space-x-2 shadow-lg shadow-purple-500/25">
                      <FaPlus />
                      <span>Add Student</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Student</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Department</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Semester</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Attendance</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Status</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-slate-800">{student.name}</p>
                              <p className="text-sm text-slate-600">{student.uid}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-700">{student.department}</td>
                          <td className="py-4 px-4 text-slate-700">Sem {student.semester}</td>
                          <td className="py-4 px-4">
                            <span className={`font-medium ${getAttendanceColor(student.attendance)}`}>
                              {student.attendance}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(student.status)}`}>
                              {getStatusIcon(student.status)}
                              <span className="capitalize">{student.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <FaEye />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => toggleUserStatus(student.id, 'student')}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                {student.status === 'active' ? <FaTimes /> : <FaCheck />}
                              </button>
                              <button 
                                onClick={() => deleteUser(student.id, 'student')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Faculty Management Tab */}
            {activeTab === "faculty" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Faculty Management</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative">
                      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search faculty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full lg:w-64 pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center space-x-2 shadow-lg shadow-purple-500/25">
                      <FaPlus />
                      <span>Add Faculty</span>
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Faculty</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Department</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Subjects</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Status</th>
                        <th className="text-left py-4 px-4 text-slate-600 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFaculty.map((fac) => (
                        <tr key={fac.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium text-slate-800">{fac.name}</p>
                              <p className="text-sm text-slate-600">{fac.employeeId}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-slate-700">{fac.department}</td>
                          <td className="py-4 px-4 text-slate-700">{fac.subjects} subjects</td>
                          <td className="py-4 px-4">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(fac.status)}`}>
                              {getStatusIcon(fac.status)}
                              <span className="capitalize">{fac.status}</span>
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <FaEye />
                              </button>
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <FaEdit />
                              </button>
                              <button 
                                onClick={() => toggleUserStatus(fac.id, 'faculty')}
                                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                              >
                                {fac.status === 'active' ? <FaTimes /> : <FaCheck />}
                              </button>
                              <button 
                                onClick={() => deleteUser(fac.id, 'faculty')}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Branches Management Tab */}
            {activeTab === "branches" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Branches Management</h2>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all flex items-center space-x-2 shadow-lg shadow-purple-500/25">
                    <FaPlus />
                    <span>Add Branch</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {branches.map((branch) => (
                    <div key={branch.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-800">{branch.name}</h3>
                        <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{branch.code}</span>
                      </div>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Students</span>
                          <span className="font-semibold text-slate-800">{branch.students}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Faculty</span>
                          <span className="font-semibold text-slate-800">{branch.faculty}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">HOD</span>
                          <span className="font-semibold text-slate-800 text-right">{branch.hod}</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-blue-50 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm">
                          View Details
                        </button>
                        <button className="flex-1 bg-green-50 text-green-600 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm">
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leave Management Tab */}
            {activeTab === "leaves" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Leave Management</h2>
                  
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search leaves..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full lg:w-64 pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredLeaves.map((leave) => (
                    <div key={leave.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-slate-800">{leave.userName}</h4>
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
                              leave.userType === 'student' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                            }`}>
                              {leave.userType === 'student' ? <FaGraduationCap /> : <FaChalkboardTeacher />}
                              <span className="capitalize">{leave.userType}</span>
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-600">
                              <span className="capitalize">{leave.type} Leave</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(leave.status)}`}>
                              {getStatusIcon(leave.status)}
                              <span className="capitalize">{leave.status}</span>
                            </span>
                          </div>
                          
                          <div className="text-sm text-slate-600">
                            <span className="flex items-center space-x-1">
                              <FaCalendarCheck />
                              <span>{new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                        
                        {leave.status === 'pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'approved')}
                              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                            >
                              <FaCheck />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleLeaveAction(leave.id, 'rejected')}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                            >
                              <FaTimes />
                              <span>Reject</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <p className="text-slate-700"><strong>Reason:</strong> {leave.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports & Analytics Tab */}
            {activeTab === "reports" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Reports & Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Attendance Reports</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">Monthly Attendance Report</p>
                        <p className="text-sm text-slate-600">Generate detailed monthly attendance reports</p>
                      </button>
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">Department-wise Report</p>
                        <p className="text-sm text-slate-600">Attendance analysis by departments</p>
                      </button>
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">Student Performance Report</p>
                        <p className="text-sm text-slate-600">Individual student attendance tracking</p>
                      </button>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">System Analytics</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">User Activity Logs</p>
                        <p className="text-sm text-slate-600">View system usage and user activities</p>
                      </button>
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">Leave Statistics</p>
                        <p className="text-sm text-slate-600">Analysis of leave patterns and trends</p>
                      </button>
                      <button className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all">
                        <p className="font-medium text-slate-800">Export All Data</p>
                        <p className="text-sm text-slate-600">Download complete system data</p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings Tab */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">System Settings</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">General Settings</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Minimum Attendance Required</span>
                        <span className="font-semibold text-slate-800">75%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Auto Backup</span>
                        <span className="font-semibold text-green-600">Enabled</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Email Notifications</span>
                        <span className="font-semibold text-green-600">Enabled</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Security Settings</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Two-Factor Authentication</span>
                        <span className="font-semibold text-red-600">Disabled</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Session Timeout</span>
                        <span className="font-semibold text-slate-800">30 minutes</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Password Policy</span>
                        <span className="font-semibold text-slate-800">Strong</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-xl p-6 lg:col-span-2">
                    <h3 className="font-semibold text-slate-800 mb-4">Database Management</h3>
                    <div className="flex flex-wrap gap-4">
                      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all flex items-center space-x-2">
                        <FaDatabase />
                        <span>Backup Database</span>
                      </button>
                      <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all flex items-center space-x-2">
                        <FaFileExport />
                        <span>Export Data</span>
                      </button>
                      <button className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-all flex items-center space-x-2">
                        <FaCog />
                        <span>System Maintenance</span>
                      </button>
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all flex items-center space-x-2">
                        <FaTrash />
                        <span>Clear Cache</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;