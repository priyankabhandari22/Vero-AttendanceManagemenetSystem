import React, { useState } from 'react';
import { FaCalendarAlt, FaBook, FaUsers, FaGraduationCap, FaClock, FaEllipsisH } from 'react-icons/fa';
import StudentsListModal from './StudentListModal';

const AttendanceCard = ({ attendance }) => {
  const [isOpen, setIsOpen] = useState(false);
    console.log(attendance);

    const students = JSON.parse(localStorage.getItem("students")) || [];
  // Format date to readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get year label
  const getYearLabel = (year) => {
    const yearMap = {
      '1': 'First Year',
      '2': 'Second Year', 
      '3': 'Third Year',
      '4': 'Fourth Year'
    };
    return yearMap[year] || `Year ${year}`;
  };

  // Calculate attendance percentage
  const attendancePercentage = (presentCount, totalStudents = students.length) => {
    return Math.round((presentCount / totalStudents) * 100);
  };

  // Get color based on attendance percentage
  const getAttendanceColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold truncate group-hover:text-blue-100 transition-colors">
              {attendance.subject}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-blue-100">
              <FaGraduationCap className="text-sm" />
              <span className="text-sm font-medium">
                {getYearLabel(attendance.year)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-full px-3 py-1">
            <div className={`w-2 h-2 rounded-full ${
              attendancePercentage(attendance.studentsPresent?.length || 0) >= 75 
                ? 'bg-green-400' 
                : attendancePercentage(attendance.studentsPresent?.length || 0) >= 50 
                ? 'bg-yellow-400' 
                : 'bg-red-400'
            }`} />
            <span className="text-xs font-semibold">
              {attendancePercentage(attendance.studentsPresent?.length || 0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Date and Time */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCalendarAlt className="text-blue-500" />
            <span className="text-sm font-medium">
              {formatDate(attendance.date)}
            </span>
          </div>
          {attendance.periodNumber && (
            <div className="flex items-center gap-1 text-gray-500 text-sm">
              <FaClock className="text-xs" />
              <span>Period {attendance.periodNumber}</span>
            </div>
          )}
        </div>

        {/* Attendance Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
            <div className="text-2xl font-bold text-green-600">
              {attendance.studentsPresent?.length || 0}
            </div>
            <div className="text-xs text-green-700 font-medium">Present</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
            <div className="text-2xl font-bold text-red-600">
              {(students.length || 50) - (attendance.studentsPresent?.length || 0)}
            </div>
            <div className="text-xs text-red-700 font-medium">Absent</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="text-2xl font-bold text-blue-600">
              {students.length || 50}
            </div>
            <div className="text-xs text-blue-700 font-medium">Total</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Attendance Rate</span>
            <span className="font-semibold">
              {attendancePercentage(attendance.studentsPresent?.length || 0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                attendancePercentage(attendance.studentsPresent?.length || 0) >= 80 
                  ? 'bg-green-500' 
                  : attendancePercentage(attendance.studentsPresent?.length || 0) >= 60 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
              }`}
              style={{ 
                width: `${attendancePercentage(attendance.studentsPresent?.length || 0)}%` 
              }}
            />
          </div>
        </div>

        {/* Lecture Topic */}
        {attendance.lectureTopic && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start gap-2">
              <FaBook className="text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500 font-medium mb-1">Lecture Topic</div>
                <div className="text-sm text-gray-700 line-clamp-2">
                  {attendance.lectureTopic}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Present Students Preview */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FaUsers className="text-indigo-500" />
              <span className="text-sm font-medium">Present Students</span>
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {attendance.studentsPresent?.length || 0} students
            </span>
          </div>
          
          {/* Student IDs Preview */}
          <div className="flex flex-wrap gap-1">
            {attendance.studentsPresent?.slice(0, 5).map((studentId, index) => (
              <span 
                key={index}
                className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full font-medium"
              >
                ID: {studentId}
              </span>
            ))}
            {attendance.studentsPresent?.length > 5 && (
              <span className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                <FaEllipsisH className="mr-1" />
                +{attendance.studentsPresent.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors hover:cursor-pointer"
         onClick={()=> setIsOpen(!isOpen)}>
          View Details
        </button>
        {/* <div className="flex gap-2">
          <button className="text-gray-500 hover:text-gray-700 text-sm transition-colors">
            Edit
          </button>
          <button className="text-red-500 hover:text-red-700 text-sm transition-colors">
            Delete  
          </button>
        </div> */}
      </div>
<StudentsListModal isOpen={isOpen} onClose={() => setIsOpen(false)} students={students.filter(student=> attendance.studentsPresent.includes(student.uid))} />
    </div>


  );
};

export default AttendanceCard;