import Card from "../../ui/Card";
import {
  Mail,
  UserRound,
} from "lucide-react";

function ProfileCard({
  name,
  role,
  email,
  avatar,
  subtitle,
  bgColor,
  meta1,
  meta2,
  className = "",
}) {
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
      <div className="flex items-start gap-4">
        {/* Avatar */}
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="
              h-16
              w-16
              rounded-full
              object-cover
              ring-4
              ring-brand-primary/20
            "
          />
        ) : (
          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-brand-primary
              to-parent-primary
              text-2xl
              font-bold
              text-white
              shadow-lg
            "
          >
            {name?.charAt(0)}
          </div>
        )}

        {/* User Information */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-text-primary">
            {name}
          </h3>

          <div className="mt-1 flex items-center gap-2 text-text-secondary">
            <UserRound size={16} />
            <span>{role}</span>
          </div>

          {email && (
            <div className="mt-2 flex items-center gap-2 text-text-secondary">
              <Mail size={16} />
              <span>{email}</span>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      {(subtitle || meta1 || meta2) && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          {subtitle && (
            <p className="text-sm text-text-primary">
              {subtitle}
            </p>
          )}

          {meta1 && (
            <p className="mt-2 text-sm text-text-secondary">
              {meta1}
            </p>
          )}

          {meta2 && (
            <p className="mt-1 text-sm text-text-secondary">
              {meta2}
            </p>
          )}
        </div>
      )}
    </Card>
  );
}

export default ProfileCard;