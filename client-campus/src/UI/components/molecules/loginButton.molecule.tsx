import { GoogleLogin } from "@react-oauth/google";
 import { authenticateUser } from "../../../store/slices/authSlice/auth.thunk";
import { useAppDispatch } from "../../../hooks/UseStore.hook";

const LoginButton = () => {
 const dispatch = useAppDispatch();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        const googleToken = credentialResponse.credential;
        dispatch(authenticateUser(googleToken || "" ));
      }}
      onError={() => {
        console.error("Google login failed");
      }}
    />
  );
};

export default LoginButton