import React from 'react';
import { FaTimes, FaUserGraduate, FaIdCard, FaSearch, FaUsers } from 'react-icons/fa';

const StudentsListModal = ({ isOpen, onClose, students, title = "Students List" }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.uid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blur backdrop-filter backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-95 hover:scale-100">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <FaUsers className="text-2xl" />
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-blue-100 text-sm">
                {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors p-2 rounded-full hover:bg-white hover:bg-opacity-20"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or UID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Students List */}
        <div className="flex-1 overflow-y-auto max-h-[60vh]">
          {filteredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <FaUserGraduate className="text-6xl text-gray-300 mb-4" />
              <p className="text-lg font-semibold">No students found</p>
              <p className="text-sm mt-1">
                {searchTerm ? 'Try adjusting your search terms' : 'No students available'}
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {filteredStudents.map((student, index) => (
                <div
                  key={student.uid}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                >
                  {/* Avatar/Number */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {index + 1}
                  </div>

                  {/* Student Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <FaUserGraduate className="text-blue-500 flex-shrink-0" />
                      <h3 className="font-semibold text-gray-900 truncate text-lg group-hover:text-blue-600 transition-colors">
                        {student.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaIdCard className="text-gray-400 text-sm flex-shrink-0" />
                      <span className="text-gray-600 font-mono text-sm bg-gray-100 px-2 py-1 rounded-md">
                        {student.uid}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Active"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredStudents.length}</span> of{' '}
            <span className="font-semibold">{students.length}</span> students
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-semibold shadow-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentsListModal;