import ColorsDashboard from "@/components/ColorsDashboard";
import HomeNavigationBar from "@/components/HomeNavigationBar";
import ProjectMenu from "@/components/ProjectMenu";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";

export default function OutputPage() {


  return (
    <>
      <SignedIn>
        <ProjectMenu></ProjectMenu>
        <ColorsDashboard></ColorsDashboard>
      </SignedIn>
      <SignedOut><RedirectToSignIn></RedirectToSignIn></SignedOut>
    </>
  )
}
