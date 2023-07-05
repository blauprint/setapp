import IdeaInputForm from '@/components/IdeaInputForm';
import { RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';

export default function IdeaPage() {
  return (
    <>
      <SignedIn>
        <IdeaInputForm />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
