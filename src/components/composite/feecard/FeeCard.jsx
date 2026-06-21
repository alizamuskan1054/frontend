import Card from "../../ui/Card";
import {
  CalendarDays,
  Wallet,
  CircleDollarSign,
  CheckCircle2,
} from "lucide-react";

function FeeCard({
  month,
  originalAmount,
  amount,
  amountPaid = 0,
  dueDate,
  paidDate,
  status = "Unpaid",
  onPay,
  bgColor,
  className = "",
}) {
  const remaining =
    amount - amountPaid;

  const statusStyles = {
    Paid:
      "bg-success-bg text-success-text",
    Partial:
      "bg-warning-bg text-warning-text",
    Unpaid:
      "bg-danger-bg text-danger-text",
  };

  return (
    <Card
      hover
      bgColor={bgColor}
      className={`
        bg-gradient-to-br
        from-white
        via-slate-50
        to-blue-50
        ${className}
      `}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary">
            {month}
          </p>

          <h3 className="mt-2 text-3xl font-bold text-text-primary">
            Rs. {amount}
          </h3>
        </div>

        <div
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-medium
            ${statusStyles[status]}
          `}
        >
          {status}
        </div>
      </div>

      {/* Fee Information */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">
            Original Fee
          </span>

          <span className="font-semibold">
            Rs. {originalAmount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">
            Paid
          </span>

          <span className="font-semibold text-success">
            Rs. {amountPaid}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-text-secondary">
            Remaining
          </span>

          <span className="font-semibold text-danger">
            Rs. {remaining}
          </span>
        </div>

        <div className="flex items-center gap-3 text-text-secondary">
          <CalendarDays size={18} />

          <span>
            Due: {dueDate}
          </span>
        </div>

        {paidDate && (
          <div className="flex items-center gap-3 text-text-secondary">
            <CheckCircle2 size={18} />

            <span>
              Paid: {paidDate}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      {remaining > 0 && (
        <button
          onClick={onPay}
          className="
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-button
            bg-gradient-to-r
            from-brand-primary
            to-parent-primary
            px-4
            py-3
            font-medium
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          <Wallet size={18} />
          Pay Now
        </button>
      )}

      {status === "Paid" && (
        <div
          className="
            mt-6
            flex
            items-center
            justify-center
            gap-2
            rounded-button
            bg-success-bg
            px-4
            py-3
            text-success-text
            font-medium
          "
        >
          <CircleDollarSign
            size={18}
          />
          Payment Completed
        </div>
      )}
    </Card>
  );
}

export default FeeCard;