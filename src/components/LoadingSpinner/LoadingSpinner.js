// LoadingSpinner.js
import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import "./LoadingSpinner.scss";

// تغيير defaultProps إلى معلمات افتراضية بدلاً من استخدام defaultProps
const LoadingSpinner = ({
  size = "medium",
  color = "primary",
  theme = "light",
  className = "",
  ariaLabel = "Loading...",
  fullScreen = false,
}) => {
  const spinnerClasses = clsx(
    "spinner-container",
    size,
    color,
    theme,
    fullScreen && "fullscreen-spinner",
    className
  );

  return (
    <div className={spinnerClasses} role="status" aria-label={ariaLabel}>
      <div className="spinner"></div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  color: PropTypes.oneOf(["primary", "secondary", "tertiary"]),
  theme: PropTypes.oneOf(["light", "dark"]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;
