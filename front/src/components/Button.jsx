function Button({ onClick, children, className, isLoading }) {
  return (
    <button onClick={onClick} className={className} disabled={isLoading}>
      {children}
    </button>
  );
}

export default Button;
