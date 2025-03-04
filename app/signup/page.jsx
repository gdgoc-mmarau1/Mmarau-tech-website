// app/signup/page.jsx
import SignUpFormClient from "./SignUpFormClient";
import { signUp } from "../../actions/auth/signup"; 

export default function SignUpPage() {
  return (
    <div>
      <SignUpFormClient action={signUp} />
    </div>
  );
}
