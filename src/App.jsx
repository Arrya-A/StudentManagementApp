import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [nameInput, setNameInput] = useState('');
  const [markInput, setMarkInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchInput, setSearchInput] = useState('');

  // Load students from local storage
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    setStudents(storedStudents);
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Add / Update
  const handleAddStudent = () => {
    if (
      nameInput.trim() === '' ||
      markInput.trim() === '' ||
      subjectInput.trim() === '' ||
      dateInput === ''
    ) {
      setErrorMsg('Please fill in all fields before adding.');
      return;
    }

    if (editId !== null) {
      setStudents(
        students.map((student) =>
          student.id === editId
            ? {
              ...student,
              name: nameInput,
              mark: markInput,
              subject: subjectInput,
              date: dateInput,
            }
            : student
        )
      );
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name: nameInput,
        mark: markInput,
        subject: subjectInput,
        date: dateInput,
      };
      setStudents([...students, newStudent]);
    }

    setNameInput('');
    setMarkInput('');
    setSubjectInput('');
    setDateInput('');
    setErrorMsg('');
  };

  // Edit
  const handleEditStudent = (id) => {
    const studentToEdit = students.find((student) => student.id === id);
    setNameInput(studentToEdit.name);
    setMarkInput(studentToEdit.mark);
    setSubjectInput(studentToEdit.subject);
    setDateInput(studentToEdit.date);
    setEditId(id);
  };

  // Delete
  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div
        style={{
          backgroundImage: 'linear-gradient(to right, lightblue, purple)',
          height: '100vh',
        }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <h1 className="text-center text-light mt-5">
                <i className="fa-solid fa-user-graduate me-3"></i>
                Student Mark List
              </h1>

              <div className="bg-light p-3 rounded shadow mt-4 border">
                {/* Input form */}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Student Name"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      value={markInput}
                      onChange={(e) => setMarkInput(e.target.value)}
                      placeholder="Mark"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      value={subjectInput}
                      onChange={(e) => setSubjectInput(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Select Subject</option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                      <option value="Science">Science</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="form-control"
                    />
                  </div>

                  {errorMsg && <div className="text-danger mb-2">{errorMsg}</div>}
                  <button
                    onClick={handleAddStudent}
                    type="button"
                    className="btn btn-primary w-100"
                  >
                    {editId ? 'Update Entry' : 'Add Entry'}
                  </button>
                </form>
              </div>

              {/* Search input */}
              <div className="my-3 w-50 ms-auto">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search by Name"
                  className="form-control"
                />
              </div>

              {/* Student list */}
              <div className="bg-light rounded shadow p-3 mt-4">
                {filteredStudents.length === 0 ? (
                  <h6 className="text-center text-muted">No student entries found.</h6>
                ) : (
                  filteredStudents.map((student, index) => (


                    <div key={student.id} className="d-flex align-items-center mb-2">
                      <h6>{index + 1}.</h6>
                      <div className="ms-3">
                        <h6 className="mb-0">Name: {student.name}</h6>
                        <small>Mark: {student.mark}</small>
                        <br />
                        <small>Subject: {student.subject}</small>
                        <br />
                        <small>Date: {student.date}</small>
                      </div>

                      <button
                        onClick={() => handleEditStudent(student.id)}
                        className="btn ms-auto fs-5"
                      >
                        <i className="fa-solid fa-pen" style={{ color: 'blue' }}></i>
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="btn ms-2 fs-5"
                      >
                        <i
                          className="fa-solid fa-square-xmark"
                          style={{ color: 'red' }}
                        ></i>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
