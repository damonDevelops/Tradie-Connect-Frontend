import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { checkRole, checkLogin } from "../hooks/checkUser";

// could possibly add auth to determine if there is a token in the system as well.
const withAuth = (WrappedComponent, allowedRoles) => {
  const Authenticate = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      // Check if the user has the necessary role to access the page
      if (allowedRoles.includes(checkRole())) {
        // replace "Admin" with user.role
        setIsAuthorized(true);
      } else {
        router.push("/unauthorized");
      }
    }, []); // replace "Admin" with user.role

    // Render the wrapped component if the user has the necessary role
    return isAuthorized ? ( // replace "Admin" with user.role
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
