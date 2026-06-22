import {
  useState,
} from "react";
import {
  useDispatch,
} from "react-redux";
import {
  useNavigate,
} from "react-router-dom";

// Redux action for storing authenticated user data
import {
  loginSuccess,
} from "../../../store/authSlice";

// Mock users used for demo authentication
import {
  mockUsers,
} from "../../../mocks/authMock";

function Login() {
  // Redux dispatch function
  const dispatch =
    useDispatch();

  // React Router navigation function
  const navigate =
    useNavigate();

  // Form state for login credentials
  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  // Updates form state whenever an input changes
  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  // Handles login form submission
  const handleSubmit = (
    e
  ) => {
    // Prevent page refresh
    e.preventDefault();

    // Find a user matching the entered credentials
    const user =
      mockUsers.find(
        (u) =>
          u.email ===
            form.email &&
          u.password ===
            form.password
      );

    // Show error if credentials are invalid
    if (!user) {
      alert(
        "Invalid credentials"
      );
      return;
    }

    // Store authenticated user and token in Redux
    dispatch(
      loginSuccess({
        user,
        token: user.token,
      })
    );

    // Redirect user based on role
    switch (user.role) {
      case "admin":
        navigate(
          "/admin/dashboard"
        );
        break;

      case "teacher":
        navigate(
          "/teacher/dashboard"
        );
        break;

      case "student":
        navigate(
          "/student/dashboard"
        );
        break;

      case "parent":
        navigate(
          "/parent/dashboard"
        );
        break;

      // Fallback route
      default:
        navigate("/login");
    }
  };

  return (
    // Login form
    <form
      onSubmit={
        handleSubmit
      }
      className="space-y-5"
    >
      {/* Email Input */}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={
          handleChange
        }
        className="w-full rounded-lg border p-3"
      />

      {/* Password Input */}
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={
          form.password
        }
        onChange={
          handleChange
        }
        className="w-full rounded-lg border p-3"
      />

      {/* Submit Button */}
      <button
        className="w-full rounded-lg bg-blue-600 py-3 text-white"
      >
        Login
      </button>
    </form>
  );
}

export default Login;