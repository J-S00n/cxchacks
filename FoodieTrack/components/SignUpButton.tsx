import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

interface ButtonProps {
  className?: string;
}

const SignUp: React.FC<ButtonProps> = ({ className }) => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button 
      className={className} 
      onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: "signup" } })}
    >
      Sign Up
    </button>
  );
};

export default SignUp;