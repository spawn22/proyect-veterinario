import { useState } from "react"

 const useErrors = () => {
  const [error, setError] = useState(false);
  return {error, setError}
}

export default useErrors