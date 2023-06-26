import { useRef, ChangeEvent } from "react";
import styles from "@/styles/IdeaInputForm.module.css";
import { BiSend } from 'react-icons/bi'

export default function IdeaInputForm() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //This is the logic that makes the textarea auto expand
  const handleExpand = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${e.target.scrollHeight - 16}px`;
    }
  };

  return (
    <div className={styles.inputContainer}>
      <form className={styles.form}>
        <textarea
          className={styles.ideaTextArea}
          ref={textAreaRef}
          onChange={handleExpand}
          name="idea"
          rows={1}
          id="idea"
          required={true}
          autoComplete="off"
        ></textarea>
        <label className={styles.ideaLabel} htmlFor="name">
          <span className={styles.ideaSpan}>Type in your app idea....</span>
        </label>
        <button type="submit" className={styles.sendBtn}><BiSend /></button>
      </form>
    </div>
  );
}
