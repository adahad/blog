import { useState } from "react";
import { Modal } from "@mantine/core";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

interface AuthModalProps {
  authOpened: boolean;
  setAuthOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

function AuthModal({ authOpened, setAuthOpened }: AuthModalProps) {
  const [displayLogin, setDisplayLogin] = useState(true);

  const swapAuth = () => {
    setDisplayLogin(!displayLogin);
  };

  const closeAuth = () => {
    setAuthOpened(false);
  };

  return (
    <Modal centered opened={authOpened} onClose={() => setAuthOpened(false)}>
      {displayLogin ? (
        <LoginForm openSignup={swapAuth} closeAuth={closeAuth} />
      ) : (
        <SignupForm openLogin={swapAuth} closeAuth={closeAuth} />
      )}
    </Modal>
  );
}

export default AuthModal;
