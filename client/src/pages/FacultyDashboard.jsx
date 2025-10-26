import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, 
  FaUser, 
  FaCalendarCheck, 
  FaClipboardList, 
  FaCheck, 
  FaTimes,
  FaClock,
  FaSearch,
  FaFilter,
  FaChalkboardTeacher,
  FaUserCheck,
  FaUserTimes,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaEye
} from "react-icons/fa";
import AttendanceButtonWithModal from "../components/AttendanceWithModal";
import axios from "axios";
import AttendanceCard from "../components/AttendanceCard";

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("attendance");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  // Dummy faculty data
  const facultyData = {
    name: "Dr. Priya Patel",
    employeeId: "FAC2024001",
    department: "Computer Science",
    subjects: ["Data Structures", "Algorithm Design", "Web Technologies"]
  };
  const user= JSON.parse(localStorage.getItem("user"));

  // Dummy students data
  const studentsData = [
    { id: 1, name: "Rahul Sharma", uid: "STU2024001", attendance: null },
    { id: 2, name: "Priya Singh", uid: "STU2024002", attendance: null },
    { id: 3, name: "Amit Kumar", uid: "STU2024003", attendance: null },
    { id: 4, name: "Sneha Reddy", uid: "STU2024004", attendance: null },
    { id: 5, name: "Karan Mehta", uid: "STU2024005", attendance: null },
    { id: 6, name: "Neha Gupta", uid: "STU2024006", attendance: null },
    { id: 7, name: "Vikram Joshi", uid: "STU2024007", attendance: null },
    { id: 8, name: "Anjali Desai", uid: "STU2024008", attendance: null },
  ];

  // Dummy leave applications
  const leaveApplications = [
    {
      id: 1,
      studentName: "Rahul Sharma",
      uid: "STU2024001",
      fromDate: "2024-01-15",
      toDate: "2024-01-17",
      type: "medical",
      reason: "Fever and cold",
      status: "pending",
      appliedDate: "2024-01-14"
    },
    {
      id: 2,
      studentName: "Priya Singh",
      uid: "STU2024002",
      fromDate: "2024-01-18",
      toDate: "2024-01-18",
      type: "personal",
      reason: "Family function",
      status: "approved",
      appliedDate: "2024-01-16"
    },
    {
      id: 3,
      studentName: "Amit Kumar",
      uid: "STU2024003",
      fromDate: "2024-01-20",
      toDate: "2024-01-22",
      type: "medical",
      reason: "Dental surgery",
      status: "pending",
      appliedDate: "2024-01-18"
    }
  ];

  const [students, setStudents] = useState(studentsData);
  const [leaves, setLeaves] = useState(leaveApplications);

  const handleAttendanceChange = (studentId, status) => {
    setStudents(students.map(student => 
      student.id === studentId ? { ...student, attendance: status } : student
    ));
  };

  const markAllPresent = () => {
    setStudents(students.map(student => ({ ...student, attendance: true })));
  };

  const markAllAbsent = () => {
    setStudents(students.map(student => ({ ...student, attendance: false })));
  };

  const submitAttendance = () => {
    const absentStudents = students.filter(s => s.attendance === false).length;
    const presentStudents = students.filter(s => s.attendance === true).length;
    
    if (presentStudents + absentStudents === 0) {
      alert("Please mark attendance for at least one student");
      return;
    }

    setAttendanceMarked(true);
    setTimeout(() => {
      setAttendanceMarked(false);
      setStudents(students.map(student => ({ ...student, attendance: null })));
    }, 2000);
    
    console.log("Attendance submitted:", {
      date: selectedDate,
      subject: selectedSubject,
      students: students
    });
  };

  const handleLeaveAction = (leaveId, action) => {
    setLeaves(leaves.map(leave =>
      leave.id === leaveId ? { ...leave, status: action } : leave
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <FaCheck className="text-green-500" />;
      case 'rejected': return <FaTimes className="text-red-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      default: return <FaClock className="text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'medical': return 'text-red-600 bg-red-50';
      case 'personal': return 'text-blue-600 bg-blue-50';
      case 'family': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.uid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLeaves = leaves.filter(leave =>
    leave.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leave.uid.toLowerCase().includes(searchTerm.toLowerCase())
  );


useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/computer-attendance/attendance", {
        params: {
          year: user._class
        }
      });
setAttendanceData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  fetchAttendance();
}, []);



const handleLogout=()=>{
  localStorage.removeItem("user");
  localStorage.removeItem("students");
navigate("/login")
}

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <FaChalkboardTeacher className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Vero Faculty Portal</h1>
                <p className="text-sm text-slate-600">Welcome, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-600">{user._class} • {user.department}</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <FaUser className="text-slate-600" />
              </div>
              <button className="p-2 text-slate-600 hover:text-red-500 transition-colors hover:cursor-pointer" onClick={handleLogout}>
                <FaSignOutAlt size={18}/>
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
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                <p className="text-sm text-slate-600">{user._class}</p>
                <p className="text-sm text-slate-600">{user.department}</p>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("attendance")}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all flex items-center space-x-3 ${
                    activeTab === "attendance" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FaUserCheck className="text-lg" />
                  <span>Mark Attendance</span>
                </button>
                
                <button
                  onClick={() => setActiveTab("leaves")}
                  className={`w-full text-left py-3 px-4 rounded-xl transition-all flex items-center space-x-3 ${
                    activeTab === "leaves" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <FaCalendarCheck className="text-lg" />
                  <span>Manage Leaves</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h4 className="font-semibold text-slate-800 mb-4">Today's Overview</h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Total Students</span>
                  <span className="font-semibold text-slate-800">{students.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Pending Leaves</span>
                  <span className="font-semibold text-yellow-600">
                    {leaves.filter(l => l.status === 'pending').length}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Subjects</span>
                  <span className="font-semibold text-slate-800">{facultyData.subjects.length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Attendance Marking Section */}
            {activeTab === "attendance" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Mark Attendance</h2>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-slate-600 whitespace-nowrap">Date:</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-slate-600 whitespace-nowrap">Subject:</label>
                      <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 min-w-[150px]"
                      >
                        <option value="">Select Subject</option>
                        {facultyData.subjects.map((subject, index) => (
                          <option key={index} value={subject}>{subject}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

               
                {/* <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={markAllPresent}
                    className="flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-lg border border-green-200 hover:bg-green-100 transition-colors"
                  >
                    <FaUserCheck />
                    <span>Mark All Present</span>
                  </button>
                  <button
                    onClick={markAllAbsent}
                    className="flex items-center space-x-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    <FaUserTimes />
                    <span>Mark All Absent</span>
                  </button>
                </div> */}

              
                {/* <div className="mb-6">
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search students by name or UID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div> */}

             
                {/* <div className="space-y-3 mb-6">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
                      <div>
                        <h4 className="font-semibold text-slate-800">{student.name}</h4>
                        <p className="text-sm text-slate-600">{student.uid}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleAttendanceChange(student.id, true)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                            student.attendance === true
                              ? 'bg-green-500 text-white border-green-500'
                              : 'bg-white text-green-600 border-green-300 hover:bg-green-50'
                          }`}
                        >
                          <FaCheck />
                          <span>Present</span>
                        </button>
                        
                        <button
                          onClick={() => handleAttendanceChange(student.id, false)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                            student.attendance === false
                              ? 'bg-red-500 text-white border-red-500'
                              : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                          }`}
                        >
                          <FaTimes />
                          <span>Absent</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div> */}

                {/* <div className="flex justify-end">
                  <button
                    onClick={submitAttendance}
                    disabled={attendanceMarked}
                    className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {attendanceMarked ? (
                      <>
                        <FaCheck />
                        <span>Attendance Marked!</span>
                      </>
                    ) : (
                      <>
                        <FaUserCheck />
                        <span>Submit Attendance</span>
                      </>
                    )}
                  </button>
                </div> */}

                <AttendanceButtonWithModal/>
              </div>
            )}
       {activeTab !== "leaves" && (
  <>
    {attendanceData.map((attendance) => {
      // Convert comma-separated string → array
      const studentsArray = attendance.studentsPresent
        ? attendance.studentsPresent.split(",").map((id) => id.trim())
        : [];

      // Pass modified object
      return (
       <div className="my-4">
         <AttendanceCard
          key={attendance.id}
          attendance={{
            ...attendance,
            studentsPresent: studentsArray,
          }}
        />
       </div>
      );
    })}
  </>
)}


            {/* Leave Management Section */}
            {activeTab === "leaves" && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 lg:mb-0">Leave Applications</h2>
                  
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by student name or UID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full lg:w-64 pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                {/* Leave Applications */}
                <div className="space-y-4">
                  {filteredLeaves.map((leave) => (
                    <div key={leave.id} className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="mb-4 lg:mb-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-slate-800">{leave.studentName}</h4>
                            <span className="text-sm text-slate-600">{leave.uid}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getTypeColor(leave.type)}`}>
                              <span>{leave.type.charAt(0).toUpperCase() + leave.type.slice(1)} Leave</span>
                            </span>
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(leave.status)}`}>
                              {getStatusIcon(leave.status)}
                              <span>{leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}</span>
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-slate-600">
                            <span className="flex items-center space-x-1">
                              <FaCalendarAlt />
                              <span>{new Date(leave.fromDate).toLocaleDateString()} - {new Date(leave.toDate).toLocaleDateString()}</span>
                            </span>
                            <span>Applied: {new Date(leave.appliedDate).toLocaleDateString()}</span>
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
                  
                  {filteredLeaves.length === 0 && (
                    <div className="text-center py-12">
                      <FaClipboardList className="text-slate-400 text-4xl mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">No Leave Applications</h3>
                      <p className="text-slate-500">No leave applications match your search criteria.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;