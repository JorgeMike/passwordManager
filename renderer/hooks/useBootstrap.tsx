import { useEffect } from "react";

const useBootstrap = () => {
  useEffect(() => {
    // Import Bootstrap JS components as needed
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
      // Initialize tooltips if they are used in your app
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map((tooltipTriggerEl) => {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });

      // Initialize popovers if they are used in your app
      const popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      popoverTriggerList.map((popoverTriggerEl) => {
        return new bootstrap.Popover(popoverTriggerEl);
      });

      // You can add more Bootstrap JS initializations here if needed
    });
  }, []);
};

export default useBootstrap;
