import { Outlet } from "react-router-dom";

/*
======================================================
Authentication Layout Component

Purpose:
- Provides a common layout for all authentication pages.
- Acts as a wrapper around pages such as:
  • Login
  • Signup
  • Forgot Password
  • Reset Password
  • OTP Verification

How It Works:
1. React Router renders this layout when an
   authentication route is matched.
2. The layout displays a centered card container.
3. The <Outlet /> renders the specific auth page
   inside this card.

Current Route Structure:

<Route element={<AuthLayout />}>
  <Route
    path="/login"
    element={<Login />}
  />
  <Route
    path="/signup"
    element={<Signup />}
  />
</Route>

Example Rendering:

-----------------------------------------
|                                       |
|         Gray Background               |
|                                       |
|       -----------------------         |
|       |      School AI      |         |
|       |                     |         |
|       |     Login Form      |         |
|       |                     |         |
|       -----------------------         |
|                                       |
-----------------------------------------

Benefits:
- Avoids repeating the same layout on every
  authentication page.
- Maintains consistent branding and styling.
- Makes authentication pages easier to maintain.
- Supports nested routing through <Outlet />.
======================================================
*/

function AuthLayout() {
  return (
    /*
    ======================================================
    Main Page Container

    Classes:
    - flex               : Enables Flexbox layout
    - min-h-screen       : Minimum height = viewport height
    - items-center       : Centers content vertically
    - justify-center     : Centers content horizontally
    - bg-slate-100       : Light gray background
    ======================================================
    */
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      {/* ==================================================
          Authentication Card

          Classes:
          - w-full         : Takes full width on small screens
          - max-w-md       : Maximum width of medium size
          - rounded-2xl    : Large rounded corners
          - bg-white       : White card background
          - p-8            : Internal spacing
          - shadow-xl      : Large shadow for elevation
      ================================================== */}
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {/* ==================================================
            Application Title / Branding
            Displayed on all authentication screens
        ================================================== */}
        <h1 className="mb-8 text-center text-3xl font-bold text-brand-primary">
          School AI
        </h1>

        {/* ==================================================
            Nested Route Placeholder

            React Router automatically renders the matched
            child route here.

            Examples:
            - /login            -> <Login />
            - /signup           -> <Signup />
            - /forgot-password  -> <ForgotPassword />
            - /otp              -> <OtpVerification />
        ================================================== */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;