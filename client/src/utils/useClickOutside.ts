import { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  cb: CallableFunction
) => {
  const handleClick = (e: any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      cb();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;
