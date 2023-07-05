import IdeaInputForm from '@/components/IdeaInputForm';
import { RedirectToSignIn, SignedIn, SignedOut, SignUp } from '@clerk/nextjs';
import styles from '@/styles/SignUpPage.module.css';

export default function IdeaPage() {
  return (
    <>
      <SignedIn>
        <IdeaInputForm />
      </SignedIn>
      <SignedOut>
        <div className={styles.signUpPage}>
          <SignUp redirectUrl='/sign-up' />
        </div>
      </SignedOut>
    </>
  );
}
