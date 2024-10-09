import React from "react";

interface CompanyIconProps {
  alt?: string;
  src?: string;
  className?: string;
}

export const CompanyIcon: React.FC<CompanyIconProps> = ({ className = "" }) => {
  return (
    <img
      alt="Your Company"
      src="/src/assets/images/logo.png"
      className={`mx-auto mb-4 ${className}`}
    />
  );
};
