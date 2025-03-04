import SignInForm from "./SignInFormClient";
import signIn from "../../actions/auth/signin"; // This server action uses Prisma

export default function SignInPage() {
  return (
    <div>
      <SignInForm action={signIn} />
    </div>
  );
}
