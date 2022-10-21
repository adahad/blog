import { useRouteError, isRouteErrorResponse } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  let errorMessage =
    "WEE WOO WEE WOO RED ALERT LOCKDOWN ENGAGED AN ERROR HAS OCCURRED ";
  if (isRouteErrorResponse(error)) {
    errorMessage += `Error Status Text: ${error.statusText}`;
  } else if (error instanceof Error) {
    errorMessage += error.message;
  }
  return <div>{errorMessage}</div>;
}

export default ErrorPage;
