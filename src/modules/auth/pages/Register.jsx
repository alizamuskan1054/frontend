/**
 * REGISTER PAGE
 *
 * Single-panel signup form — same card layout as Login.
 * Top: 4 role selector cards (Admin, Teacher, Student, Parent).
 *   - Click to select. Selected card highlights in that role's color.
 * Below: common fields always shown, role-specific fields appear when a role is picked.
 *
 * Common fields: Full Name, Email, Password, Confirm Password
 * Student extra:  Roll Number, Class, Guardian Name, Guardian Phone, Date of Birth
 * Teacher extra:  CNIC, Qualification, Specialization, Joining Date
 * Parent extra:   Child Roll Number, Relation (Father/Mother/Guardian)
 * Admin extra:    none (just an info note)
 *
 * On submit → simulates API → navigates to /pending-approval.
 *
 * Usage: rendered by React Router at /register, wrapped in AuthLayout.
 *   <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Mail, Eye, EyeOff, User, Phone, Hash, BookOpen,
  Calendar, GraduationCap, Users, Baby,
  IdCard, Briefcase,
} from 'lucide-react';

import { Input,Select,Button,PasswordStrength } from '../../../components';

// ─── Role cards config ────────────────────────────────────────────────────────
// All class strings are explicit — no dynamic Tailwind building (v4 rule)
const ROLES = [
  {
    key: 'teacher',
    label: 'Teacher',
    icon: GraduationCap,
    selected: 'border-teacher-border bg-teacher-light text-teacher-text',
    unselected: 'border-border bg-surface-dim text-text-muted hover:border-teacher-border hover:bg-teacher-light',
    iconColor: 'text-teacher-primary',
  },
  {
    key: 'student',
    label: 'Student',
    icon: BookOpen,
    selected: 'border-student-border bg-student-light text-student-text',
    unselected: 'border-border bg-surface-dim text-text-muted hover:border-student-border hover:bg-student-light',
    iconColor: 'text-student-primary',
  },
  {
    key: 'parent',
    label: 'Parent',
    icon: Users,
    selected: 'border-parent-border bg-parent-light text-parent-text',
    unselected: 'border-border bg-surface-dim text-text-muted hover:border-parent-border hover:bg-parent-light',
    iconColor: 'text-parent-primary',
  },
];

// Submit button tone per role — explicit lookup
const SUBMIT_TONE = {
  admin: 'admin',
  teacher: 'teacher',
  student: 'student',
  parent: 'parent',
};

// Mock class options — swap with API data later
const CLASS_OPTIONS = [
  { value: 'class_1', label: 'Class 1' },
  { value: 'class_2', label: 'Class 2' },
  { value: 'class_3', label: 'Class 3' },
  { value: 'class_4', label: 'Class 4' },
  { value: 'class_5', label: 'Class 5' },
  { value: 'class_6', label: 'Class 6' },
  { value: 'class_7', label: 'Class 7' },
  { value: 'class_8', label: 'Class 8' },
  { value: 'class_9', label: 'Class 9' },
  { value: 'class_10', label: 'Class 10' },
];

const RELATION_OPTIONS = [
  { value: 'Father', label: 'Father' },
  { value: 'Mother', label: 'Mother' },
  { value: 'Guardian', label: 'Guardian' },
];

// ─── Component ────────────────────────────────────────────────────────────────
function Register() {
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState('teacher');
  const [form, setForm] = useState({
    // Common
    full_name: '', email: '', password: '', confirm_password: '',
    // Student
    roll_number: '', class_id: '', guardian_name: '', guardian_phone: '', date_of_birth: '',
    // Teacher
    cnic: '', qualification: '', specialization: '', joining_date: '',
    // Parent
    child_roll_number: '', relation: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e) {
    setError('');
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select your role to continue.');
      return;
    }
    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    // Replace with real API call later
    setTimeout(() => {
      setLoading(false);
      navigate('/pending-approval');
    }, 1000);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Create account</h2>
        <p className="mt-1 text-sm text-text-secondary">
          Select your role, fill in your details, and wait for admin approval.
        </p>
      </div>

      {/* Role selector cards — horizontal row */}
      <div className="grid grid-cols-3 gap-3">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = selectedRole === role.key;

          return (
            <button
              key={role.key}
              type="button"
              onClick={() => { setSelectedRole(role.key); setError(''); }}
              className={[
                'flex flex-col items-center gap-1.5 rounded-xl border-2 py-3 px-2 transition-all duration-150 cursor-pointer',
                isSelected ? role.selected : role.unselected,
              ].join(' ')}
            >
              <Icon
                size={20}
                className={isSelected ? role.iconColor : 'text-text-muted'}
              />
              <span className="text-xs font-semibold">{role.label}</span>
            </button>
          );
        })}
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-xl bg-danger-bg px-4 py-3 text-sm text-danger-text">
          {error}
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Common fields */}
          <Input
            label="Full Name"
            type="text"
            name="full_name"
            placeholder="Muhammad Ali"
            tone={selectedRole}
            value={form.full_name}
            onChange={handleChange}
            leftIcon={<User size={16} />}
            required
          />
          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="you@school.edu"
            tone={selectedRole}
            value={form.email}
            onChange={handleChange}
            leftIcon={<Mail size={16} />}
            required
          />
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Min. 8 characters"
            tone={selectedRole}
            value={form.password}
            onChange={handleChange}
            rightIcon={
              <button type="button" onClick={() => setShowPassword(v => !v)}
                className="text-text-muted hover:text-text-primary transition-colors" tabIndex={-1}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />
          
          <PasswordStrength password={form.password} />
          <Input
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            name="confirm_password"
            placeholder="Repeat password"
            tone={selectedRole}
            value={form.confirm_password}
            onChange={handleChange}
            rightIcon={
              <button type="button" onClick={() => setShowConfirm(v => !v)}
                className="text-text-muted hover:text-text-primary transition-colors" tabIndex={-1}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            }
            required
          />

          {/* ── Student extra fields ─────────────────────────────── */}
          {selectedRole === 'student' && (
            <div className="space-y-4 pt-2 border-t border-surface-muted">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted pt-2">
                Student Details
              </p>
              <Input
                label="Roll Number"
                type="text"
                name="roll_number"
                placeholder="e.g. STU-2024-001"
                tone={selectedRole}
                value={form.roll_number}
                onChange={handleChange}
                leftIcon={<Hash size={16} />}
                required
              />
              <Select
                label="Class"
                name="class_id"
                options={CLASS_OPTIONS}
                placeholder="Select class"
                tone={selectedRole}
                value={form.class_id}
                onChange={handleChange}
                required
              />
              <Input
                label="Guardian Name"
                type="text"
                name="guardian_name"
                placeholder="Parent / Guardian full name"
                tone={selectedRole}
                value={form.guardian_name}
                onChange={handleChange}
                leftIcon={<User size={16} />}
                required
              />
              <Input
                label="Guardian Phone"
                type="tel"
                name="guardian_phone"
                placeholder="03XX-XXXXXXX"
                tone={selectedRole}
                value={form.guardian_phone}
                onChange={handleChange}
                leftIcon={<Phone size={16} />}
                required
              />
              <Input
                label="Date of Birth"
                type="date"
                tone={selectedRole}
                name="date_of_birth"
                value={form.date_of_birth}
                onChange={handleChange}
                leftIcon={<Baby size={16} />}
                required
              />
            </div>
          )}

          {/* ── Teacher extra fields ─────────────────────────────── */}
          {selectedRole === 'teacher' && (
            <div className="space-y-4 pt-2 border-t border-surface-muted">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted pt-2">
                Teacher Details
              </p>
              <Input
                label="CNIC"
                type="text"
                name="cnic"
                tone={selectedRole}
                placeholder="XXXXX-XXXXXXX-X"
                value={form.cnic}
                onChange={handleChange}
                leftIcon={<IdCard size={16} />}
                required
              />
              <Input
                label="Qualification"
                type="text"
                name="qualification"
                placeholder="e.g. M.Sc Physics"
                tone={selectedRole}
                value={form.qualification}
                onChange={handleChange}
                leftIcon={<GraduationCap size={16} />}
                required
              />
              <Input
                label="Specialization"
                type="text"
                name="specialization"
                placeholder="e.g. Mathematics"
                tone={selectedRole}
                value={form.specialization}
                onChange={handleChange}
                leftIcon={<Briefcase size={16} />}
                required
              />
              <Input
                label="Joining Date"
                type="date"
                name="joining_date"
                tone={selectedRole}
                value={form.joining_date}
                onChange={handleChange}
                leftIcon={<Calendar size={16} />}
                required
              />
            </div>
          )}

          {/* ── Parent extra fields ──────────────────────────────── */}
          {selectedRole === 'parent' && (
            <div className="space-y-4 pt-2 border-t border-surface-muted">
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted pt-2">
                Parent Details
              </p>
              <Input
                label="Child's Roll Number"
                type="text"
                name="child_roll_number"
                tone={selectedRole}
                placeholder="e.g. STU-2024-001"
                value={form.child_roll_number}
                onChange={handleChange}
                leftIcon={<Hash size={16} />}
                helperText="Must match your child's registered roll number exactly"
                required
              />
              <Select
                label="Relation to Child"
                name="relation"
                tone={selectedRole}
                options={RELATION_OPTIONS}
                placeholder="Select relation"
                value={form.relation}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {/* Admin note — no extra fields needed */}
          {selectedRole === 'admin' && (
            <div className="rounded-xl border border-admin-border bg-admin-light px-4 py-3 text-sm text-admin-text">
              Admin accounts require special verification. Your request will be manually reviewed before approval.
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            fullWidth
            loading={loading}
            tone={SUBMIT_TONE[selectedRole] || 'brand'}
          >
            Create Account
          </Button>

        </form>
      

      {/* Sign in link */}
      <p className="text-center text-sm text-text-secondary">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-primary hover:text-brand-hover transition-colors">
          Sign in
        </Link>
      </p>

    </div>
  );
}

export default Register;