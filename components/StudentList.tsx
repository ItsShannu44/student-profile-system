'use client';

import { Student } from './StudentForm';

interface StudentListProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
}

export default function StudentList({ students, onEdit, onDelete }: StudentListProps) {
  if (students.length === 0) {
    return <p className="empty">No students found.</p>;
  }

  return (
    <div className="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>USN</th>
          <th>Email</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.usn}</td>
            <td>{student.email}</td>
            <td>{student.course}</td>
            <td>
              <div className="actions">
                <button className="btn btn-warning" onClick={() => onEdit(student)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(student.id!)}>
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}