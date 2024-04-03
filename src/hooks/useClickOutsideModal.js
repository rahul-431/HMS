import { useEffect, useRef } from "react";

export default function useClickOutsideModal(handler, listenCapturing = true) {
  const ref = useRef();
  //closing the modal when clicked outside of modal
  useEffect(() => {
    const handleClick = (e) => {
      console.log(ref.current);
      if (ref.current && ref.current.contains(e.target)) {
        console.log("Clicked outside");
        handler();
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);

    return document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);
  return ref;
}
