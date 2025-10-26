import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPlus, FaTimes, FaCalendarAlt, FaBook, FaUsers, FaCheck, FaRegCircle, FaSave, FaUndo } from 'react-icons/fa';

const AttendanceButtonWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const user=JSON.parse(localStorage.getItem("user"))
  // Dummy data
  const dummySubjects = [
    { id: 1, name: 'Mathematics', code: 'MATH101' },
    { id: 2, name: 'Physics', code: 'PHY102' },
    { id: 3, name: 'Chemistry', code: 'CHEM103' },
    { id: 4, name: 'C Programming', code: 'CS104' },
    { id: 5, name: 'Basic Electrical Engineering', code: 'ENG105' }
  ];

  

 useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/student/by-department-class",
        {
          department: user.department,
          _class: user._class,
        }
      );
      setStudents(response.data);
      localStorage.setItem("students", JSON.stringify(response.data));
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  fetchStudents();
}, [user.department, user._class]);


  const dummyStudents = students.length > 0 ? students : [];

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    subject: '',
    
    presentStudentIds: []
  });

  // Open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Handle save attendance
  const handleSaveAttendance = async(attendanceData) => {
    console.log('Saving attendance:', attendanceData);
    // Here you would typically make an API call to save the attendance
    const response= await axios.post("http://localhost:8080/api/computer-attendance/add",
      attendanceData)
     
      console.log("res : "+response.data);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentSelect = (studentId) => {
    setFormData(prev => {
      const isSelected = prev.presentStudentIds.includes(studentId);
      if (isSelected) {
        return {
          ...prev,
          presentStudentIds: prev.presentStudentIds.filter(id => id !== studentId)
        };
      } else {
        return {
          ...prev,
          presentStudentIds: [...prev.presentStudentIds, studentId]
        };
      }
    });
  };

  const handleSelectAll = () => {
    const allStudentIds = dummyStudents.map(student => student.id);
    setFormData(prev => ({
      ...prev,
      presentStudentIds: allStudentIds
    }));
  };

  const handleDeselectAll = () => {
    setFormData(prev => ({
      ...prev,
      presentStudentIds: []
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.subject) {
      alert('Please select a subject');
      return;
    }

    if (formData.presentStudentIds.length === 0) {
      alert('Please select at least one student');
      return;
    }

    const attendanceData = {
subject : formData.subject,
      year: user._class,
      date: formData.date,
      
      studentsPresent: formData.presentStudentIds.toString()
      
     
    };

    handleSaveAttendance(attendanceData);
    closeModal();
  };

  // Reset form when modal opens
  React.useEffect(() => {
    if (isModalOpen) {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        subject: '',
        presentStudentIds: []
      });
    }
  }, [isModalOpen]);

  const selectedSubject = dummySubjects.find(sub => sub.id === parseInt(formData.subjectId));

  return (
    <div>
      {/* Add Attendance Button */}
      <button
        onClick={openModal}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
      >
        <FaPlus className="text-sm" />
        Add Attendance
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  bg-blur backdrop-blur-md bg-opacity-50x  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <FaUsers className="text-blue-600" />
                Mark Attendance
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-8rem)]">
              {/* Basic Info Section */}
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Date */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaCalendarAlt className="text-blue-500" />
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <FaBook className="text-green-500" />
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Select Subject</option>
                      {dummySubjects.map(subject => (
                        <option key={subject.id} value={subject.name}>
                          {subject.name} ({subject.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Academic Year */}
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Academic Year
                    </label>
                    <select
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2023-2024">2023-2024</option>
                      <option value="2022-2023">2022-2023</option>
                    </select>
                  </div> */}

                  {/* Semester */}
               {  /* <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Semester
                    </label>
                    <select
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="1">Semester 1</option>
                      <option value="2">Semester 2</option>
                      <option value="3">Semester 3</option>
                      <option value="4">Semester 4</option>
                      <option value="5">Semester 5</option>
                      <option value="6">Semester 6</option>
                      <option value="7">Semester 7</option>
                      <option value="8">Semester 8</option>
                    </select>
                  </div>*/}
                </div>

                {/* Lecture Topic */}
                {/* <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lecture Topic (Optional)
                  </label>
                  <input
                    type="text"
                    name="lectureTopic"
                    value={formData.lectureTopic}
                    onChange={handleInputChange}
                    placeholder="Enter today's lecture topic..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div> */}
              </div>

              {/* Students Section */}
              <div className="flex-1 overflow-hidden flex flex-col">
                {/* Students Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center gap-2">
                    <FaUsers className="text-gray-600" />
                    <span className="font-semibold text-gray-700">
                      Select Present Students ({formData.presentStudentIds.length} selected)
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSelectAll}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                    >
                      <FaCheck size={12} />
                      Select All
                    </button>
                    <button
                      type="button"
                      onClick={handleDeselectAll}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                    >
                      <FaUndo size={12} />
                      Deselect All
                    </button>
                  </div>
                </div>

                {/* Students List */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {dummyStudents.map(student => (
                      <div
                        key={student.uid}
                        onClick={() => handleStudentSelect(student.uid)}
                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                          formData.presentStudentIds.includes(student.uid)
                            ? 'border-green-500 bg-green-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.presentStudentIds.includes(student.uid)
                            ? 'border-green-500 bg-green-100 text-white'
                            : 'border-gray-300'
                        }`}>
                          {formData.presentStudentIds.includes(student.id) && (
                            <FaCheck size={10} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500 truncate">
                            {student.uid} • {user.department}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  <FaSave size={14} />
                  Save Attendance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceButtonWithModal;