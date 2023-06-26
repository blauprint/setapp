import HomeNavigationBar from "@/components/HomeNavigationBar";
import ProjectMenu from "@/components/ProjectMenu";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function OutputPage() {


  return (
    <>
      <SignedIn>
        <ProjectMenu></ProjectMenu>
      </SignedIn>
      <SignedOut><RedirectToSignIn></RedirectToSignIn></SignedOut>
    </>
  )
}
