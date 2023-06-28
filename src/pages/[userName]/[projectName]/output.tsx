import ProjectMenu from "@/components/ProjectMenu";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import styles from "@/styles/Output.module.css";
import { useState } from "react";
import ColorsPage from "./colors";

export default function OutputPage() {
  const [selectedComponent, setSelectedComponent] = useState<string>("");

  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  let content = null;

  if (selectedComponent === "colorsPage") {
    content = <ColorsPage />;
  } else {
    content = (<>
      <div>idea</div>
      <div>notes</div>
    </>)
  }

  return (
    <>
      <SignedIn>
        <div className={styles.outputPage}>
          <ProjectMenu onButtonClick={handleButtonClick} />

          <div>{content}</div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
