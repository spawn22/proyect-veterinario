function Button({ onClick, children, className, isButtonLoading }) {
  return (
    <button onClick={onClick} className={className} disabled={isButtonLoading}>
      {children}
    </button>
  );
}

export default Button;
