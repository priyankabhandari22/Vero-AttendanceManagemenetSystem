import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaSignOutAlt, 
  FaUser, 
  FaCalendarAlt, 
  FaChartBar, 
  FaFileExport, 
  FaPlus, 
  FaTimes,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCalendarPlus,
  FaGraduationCap
} from "react-icons/fa";
import axios from "axios";

const StudentDashboard = () => {
  const navigate=useNavigate();
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
    type: "medical"
  });

  // Dummy student data
  const studentData = {
    name: "Rahul Sharma",
    uid: "STU2024001",
    department: "Computer Science",
    currentSemester: 4,
    overallAttendance: 85.5
  };
  const user= JSON.parse(localStorage.getItem("user"));

  // Dummy attendance data for 8 semesters
  const semesterData = {
    1: {
      subjects: [
        { name: "Mathematics I", attended: 40, total: 45, percentage: 88.9 },
        { name: "Physics", attended: 38, total: 45, percentage: 84.4 },
        { name: "Programming Fundamentals", attended: 42, total: 45, percentage: 93.3 },
        { name: "Electrical Engineering", attended: 35, total: 45, percentage: 77.8 },
        { name: "Engineering Drawing", attended: 39, total: 45, percentage: 86.7 }
      ],
      overall: { attended: 194, total: 225, percentage: 86.2 }
    },
    2: {
      subjects: [
        { name: "Mathematics II", attended: 42, total: 45, percentage: 93.3 },
        { name: "Chemistry", attended: 37, total: 45, percentage: 82.2 },
        { name: "Data Structures", attended: 41, total: 45, percentage: 91.1 },
        { name: "Digital Electronics", attended: 36, total: 45, percentage: 80.0 },
        { name: "Mechanical Engineering", attended: 39, total: 45, percentage: 86.7 }
      ],
      overall: { attended: 195, total: 225, percentage: 86.7 }
    },
    3: {
      subjects: [
        { name: "Discrete Mathematics", attended: 38, total: 45, percentage: 84.4 },
        { name: "Object Oriented Programming", attended: 43, total: 45, percentage: 95.6 },
        { name: "Database Management", attended: 40, total: 45, percentage: 88.9 },
        { name: "Computer Networks", attended: 37, total: 45, percentage: 82.2 },
        { name: "Theory of Computation", attended: 35, total: 45, percentage: 77.8 }
      ],
      overall: { attended: 193, total: 225, percentage: 85.8 }
    },
    4: {
      subjects: [
        { name: "Operating Systems", attended: 41, total: 45, percentage: 91.1 },
        { name: "Algorithm Design", attended: 39, total: 45, percentage: 86.7 },
        { name: "Web Technologies", attended: 44, total: 45, percentage: 97.8 },
        { name: "Software Engineering", attended: 38, total: 45, percentage: 84.4 },
        { name: "Microprocessors", attended: 36, total: 45, percentage: 80.0 }
      ],
      overall: { attended: 198, total: 225, percentage: 88.0 }
    }
  };

  const [subjects, setSubjects] = useState([
1,2,3
  ])

  // Generate empty semesters for 5-8
  for (let i = 5; i <= 8; i++) {
    semesterData[i] = {
      subjects: [],
      overall: { attended: 0, total: 0, percentage: 0 }
    };
  }

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    console.log("Leave application submitted:", leaveForm);
    // Handle leave submission logic here
    setIsLeaveModalOpen(false);
    setLeaveForm({ fromDate: "", toDate: "", reason: "", type: "medical" });
    alert("Leave application submitted successfully!");
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getAttendanceBgColor = (percentage) => {
    if (percentage >= 75) return "bg-green-100";
    if (percentage >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const getAttendanceIcon = (percentage) => {
    if (percentage >= 75) return <FaCheckCircle className="text-green-500" />;
    if (percentage >= 60) return <FaExclamationTriangle className="text-yellow-500" />;
    return <FaTimes className="text-red-500" />;
  };

  const totalLectures=(attendanceData,subjectName)=>{
    const subjectData = attendanceData.filter(att=> att.subject === subjectName);
    return subjectData.length || 0;
  }
const lecturesAttended=(attendanceData,subjectName)=>{
  const subjectData = attendanceData.filter(att=> att.subject === subjectName && att.studentsPresent.split(",").includes(user.uid));
  return subjectData.length || 0;
}

 useEffect(() => {
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/computer-attendance/attendance", {
        params: {
          year: user._class
        }
      });
setAttendanceData(response.data);
setSubjects([
  {name : "Mathematics",attended: lecturesAttended(response.data,"Mathematics"), total: totalLectures(response.data,"Mathematics"), percentage: Math.round((lecturesAttended(response.data,"Mathematics")/ totalLectures(response.data,"Mathematics")*100)) || 0},
  {name : "Physics",attended: lecturesAttended(response.data,"Physics"), total: totalLectures(response.data,"Physics"), percentage: Math.round((lecturesAttended(response.data,"Physics")/ totalLectures(response.data,"Physics")*100)) || 0},
  {name : "Chemistry",attended: lecturesAttended(response.data,"Chemistry"), total: totalLectures(response.data,"Chemistry"), percentage: Math.round((lecturesAttended(response.data,"Chemistry")/ totalLectures(response.data,"Chemistry")*100)) || 0},
  {name : "C Programming",attended: lecturesAttended(response.data,"C Programming"), total: totalLectures(response.data,"C Programming"), percentage: Math.round((lecturesAttended(response.data,"C Programming")/ totalLectures(response.data,"C Programming")*100)) || 0},
  {name : "Basic Electrical Engineering",attended: lecturesAttended(response.data,"Basic Electrical Engineering"), total: totalLectures(response.data,"Basic Electrical Engineering"), percentage: Math.round((lecturesAttended(response.data,"Basic Electrical Engineering")/ totalLectures(response.data,"Basic Electrical Engineering")*100)) || 0}
])
      console.log(response.data);
      console.log(subjects)
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  fetchAttendance();
}, []);
console.log(subjects)
 
const handleLogout=()=>{
  localStorage.removeItem("user");
navigate("/login")
}

const attendedCount = (attendanceData) => {
return attendanceData.filter(att => att.studentsPresent.includes(user.uid)).length 
}

const attendancePercentage = (attendanceData) => {
  const attended = attendedCount(attendanceData);
  const total = attendanceData.length;
  return total === 0 ? 0 : Math.round((attended / total) * 100);
};

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-white text-lg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Vero Student Portal</h1>
                <p className="text-sm text-slate-600">Welcome back, {user.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-600">{user.uid} • {user.department}</p>
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
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaUser className="text-white text-2xl" />
                </div>
                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                <p className="text-sm text-slate-600">{user.uid}</p>
                <p className="text-sm text-slate-600">{user.department}</p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => setIsLeaveModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25"
                >
                  <FaCalendarPlus />
                  <span>Apply for Leave</span>
                </button>
                
                <button className="w-full border border-slate-300 text-slate-700 py-3 px-4 rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all flex items-center justify-center space-x-2">
                  <FaFileExport />
                  <span>Export Report</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h4 className="font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <FaChartBar className="text-blue-600" />
                <span>Quick Stats</span>
              </h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600">Overall Attendance</p>
                  <p className="text-2xl font-bold text-slate-800">{attendancePercentage(attendanceData)}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-600">Current Year</p>
                  <p className="text-lg font-semibold text-slate-800">{user._class}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-600">Attendance Status</p>
                  <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full ${getAttendanceBgColor(attendancePercentage(attendanceData))} ${getAttendanceColor(attendancePercentage(attendanceData))}`}>
                    {getAttendanceIcon(attendancePercentage(attendanceData))} 
                    <span className="text-sm font-medium">
                      {attendancePercentage(attendanceData) >= 75 ? "Good" : attendancePercentage(attendanceData) >= 60 ? "Average" : "Poor"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Semester Selector */}
            <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 sm:mb-0">Attendance Overview</h2>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Select Semester:</span>
                  <select 
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
                    className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Semester Overall Stats */}
              {semesterData[selectedSemester].subjects.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-blue-600 mb-1">Total Classes</p>
                      <p className="text-2xl font-bold text-blue-700">{attendanceData.length || 0}</p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-green-600 mb-1">Classes Attended</p>
                      <p className="text-2xl font-bold text-green-700">{attendedCount(attendanceData)|| 0}</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <p className="text-sm text-purple-600 mb-1">Overall Percentage</p>
                      <p className="text-2xl font-bold text-purple-700">{attendancePercentage(attendanceData)}%</p>
                    </div>
                  </div>

                  {/* Subjects List */}
                  <div className="space-y-4">
                    {subjects.map((subject, index) => (
                      <div key={index} className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div className="mb-3 sm:mb-0">
                            <h4 className="font-semibold text-slate-800">{subject.name}</h4>
                            <p className="text-sm text-slate-600">
                              {subject.attended} of {subject.total} classes attended
                            </p>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <div className="text-right">
                              <p className={`text-lg font-bold ${getAttendanceColor(subject.percentage)}`}>
                                {subject.percentage}%
                              </p>
                              <p className="text-xs text-slate-600">Attendance</p>
                            </div>
                            <div className={`p-2 rounded-lg ${getAttendanceBgColor(subject.percentage)}`}>
                              {getAttendanceIcon(subject.percentage)}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                subject.percentage >= 75 ? "bg-green-500" : 
                                subject.percentage >= 60 ? "bg-yellow-500" : "bg-red-500"
                              }`}
                              style={{ width: `${subject.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <FaCalendarAlt className="text-slate-400 text-4xl mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No Data Available</h3>
                  <p className="text-slate-500">Attendance data for Semester {selectedSemester} will be available soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 bg-blur backdrop-blur-md bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center space-x-2">
                <FaCalendarPlus className="text-blue-600" />
                <span>Apply for Leave</span>
              </h3>
              <button 
                onClick={() => setIsLeaveModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleLeaveSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.fromDate}
                    onChange={(e) => setLeaveForm({...leaveForm, fromDate: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.toDate}
                    onChange={(e) => setLeaveForm({...leaveForm, toDate: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Leave Type
                </label>
                <select
                  value={leaveForm.type}
                  onChange={(e) => setLeaveForm({...leaveForm, type: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="medical">Medical Leave</option>
                  <option value="personal">Personal Leave</option>
                  <option value="family">Family Emergency</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Reason
                </label>
                <textarea
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                  rows="4"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Please provide a reason for your leave application..."
                  required
                ></textarea>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="flex-1 border border-slate-300 text-slate-700 py-3 px-4 rounded-xl hover:border-slate-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/25"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;