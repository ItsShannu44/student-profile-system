'use client';

import { useState } from 'react';
import StudentForm, { Student } from '@/components/StudentForm';
import StudentList from '@/components/StudentList';
import SearchBar from '@/components/SearchBar';

export default function Home() {
  const [students, setStudents] = useState<Student[]>([]);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [search, setSearch] = useState('');

  const handleSave = (formData: Student) => {
    if (editingStudent) {
      setStudents((prev) =>
        prev.map((s) => (s.id === editingStudent.id ? { ...formData, id: s.id } : s))
      );
      setEditingStudent(null);
    } else {
      setStudents((prev) => [...prev, { ...formData, id: Date.now() }]);
    }
  };

  const handleEdit = (student: Student) => setEditingStudent(student);
  const handleCancelEdit = () => setEditingStudent(null);

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    if (editingStudent?.id === id) setEditingStudent(null);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <main className="container">
    <header>
      <h1>Student <span>Profile</span> Management</h1>
      <p className="subtitle">Add, edit, search and manage student records</p>
    </header>

    <StudentForm
      onSave={handleSave}
      editingStudent={editingStudent}
      onCancelEdit={handleCancelEdit}
    />

    <div className="card">
      <h2 className="card-title">📚 All Students ({filteredStudents.length})</h2>
      <SearchBar value={search} onChange={setSearch} />
      <StudentList
        students={filteredStudents}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  </main>
  );
}