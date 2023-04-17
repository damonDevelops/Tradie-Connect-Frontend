import { useRouter } from "next/router";
import { useEffect } from "react";

// could possibly add auth to determine if there is a token in the system as well.
const withAuth = (WrappedComponent, allowedRoles) => {
  const Authenticate = (props) => {
    const router = useRouter();

    useEffect(() => {
      // Check if the user has the necessary role to access the page
      if (!allowedRoles.includes("Admin")) {
        // replace "Admin" with user.role
        router.push("/unauthorized");
      }
    }, ["Admin"]); // replace "Admin" with user.role

    // Render the wrapped component if the user has the necessary role
    return allowedRoles.includes("Admin") ? ( // replace "Admin" with user.role
      <WrappedComponent {...props} />
    ) : null;
  };

  // Set the display name for debugging purposes
  Authenticate.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Authenticate;
};

export default withAuth;
