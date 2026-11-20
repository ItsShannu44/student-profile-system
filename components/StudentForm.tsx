'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';

export interface Student {
  id?: number;
  name: string;
  usn: string;
  email: string;
  course: string;
}

interface StudentFormProps {
  onSave: (student: Student) => void;
  editingStudent: Student | null;
  onCancelEdit: () => void;
}

const emptyForm: Student = { name: '', usn: '', email: '', course: '' };

export default function StudentForm({ onSave, editingStudent, onCancelEdit }: StudentFormProps) {
  const [form, setForm] = useState<Student>(emptyForm);

  useEffect(() => {
    if (editingStudent) {
      setForm(editingStudent);
    } else {
      setForm(emptyForm);
    }
  }, [editingStudent]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.usn || !form.email || !form.course) return;

    onSave(form);
    setForm(emptyForm);
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit} className="form-grid">
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} />
        <input name="usn" placeholder="USN" value={form.usn} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="course" placeholder="Course" value={form.course} onChange={handleChange} />
        <div className="form-actions">
          <button type="submit" className={`btn ${editingStudent ? 'btn-success' : 'btn-primary'}`}>
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-danger" onClick={onCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}