import { forwardRef } from "react";

export const Input = forwardRef(({ className, ...props }, ref) => (
  <input {...props} ref={ref} className={`${className}`} />
));
