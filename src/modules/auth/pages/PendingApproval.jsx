/**
 * PENDING APPROVAL PAGE
 *
 * Static info screen shown after a user registers, or when a user
 * with status "Pending" tries to log in.
 *
 * Currently uses mock data — "Refresh Status" just simulates an API call
 * and shows a toast. Later: wire this to a real "check my status" API call,
 * and if approved, dispatch loginSuccess + redirect by role.
 *
 * Props: none.
 *
 * Usage: rendered by React Router at /pending-approval, wrapped in AuthLayout.
 *   <Route path="/pending-approval" element={<AuthLayout><PendingApproval /></AuthLayout>} />
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Hourglass, RefreshCw, Home, CheckCircle2 } from 'lucide-react';

import { Button } from '../../../components';
import { useNavigate } from 'react-router-dom';

function PendingApproval() {
    const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  function handleRefresh() {
    setRefreshing(true);

    // Replace with real "check my approval status" API call later
    setTimeout(() => {
      setRefreshing(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1000);
  }

  return (
    <div className="space-y-6 text-center relative">

      {/* Icon: light outer circle, 3-dot icon inside, thin corner badge */}
      <div className="relative flex justify-center pt-2">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full bg-warning-bg/50"
          style={{ animation: 'pending-float 6s ease-in-out infinite' }}
        >
          {/* Inner circle holds the 3-dot icon */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warning-bg">
            <MoreHorizontal size={32} className="text-warning-text" />
          </div>
        </div>

        {/* Corner badge - thin stroke hourglass */}
        <div className="absolute -top-1 right-[calc(50%-3rem)] flex h-8 w-8 items-center justify-center rounded-full bg-surface shadow-soft">
          <Hourglass size={12} strokeWidth={2.2} className="text-warning-text" />
        </div>
      </div>

      {/* Heading + message */}
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Account Under Review</h2>
        <p className="mt-2 text-sm text-text-secondary px-2">
          Thank you for registering! Your account is currently being reviewed by
          our administration team. You'll be able to access all features once
          your registration is approved.
        </p>
      </div>

      {/* Status badge */}
      <div className="inline-flex items-center gap-2 rounded-input border border-warning-text/20 bg-warning-bg px-4 py-2 text-sm font-medium text-warning-text">
        <span className="h-2 w-2 rounded-full bg-warning-text animate-pulse" />
        Status: Pending Verification
      </div>

      {/* Refresh status button - use leftIcon prop so icon + text sit inline */}
      <Button
        type="button"
        fullWidth
        loading={refreshing}
        tone="brand"
        leftIcon={<RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />}
        onClick={handleRefresh}
      >
        Refresh Status
      </Button>

      {/* Secondary action */}
      <Button variant="secondary" type="button" fullWidth onClick={() => navigate('/login')}>
        Back to Login
        </Button>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full bg-text-primary px-5 py-3 text-sm font-medium text-white shadow-dropdown">
          <CheckCircle2 size={18} className="text-success-text" />
          Status refreshed. No changes yet.
        </div>
      )}

      {/* Local keyframes for the float animation */}
      <style>{`
        @keyframes pending-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

    </div>
  );
}

export default PendingApproval;