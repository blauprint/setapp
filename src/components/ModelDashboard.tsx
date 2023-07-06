'use client';
import { Database } from '@/types/typedefs';
import styles from '@/styles/ModelDashboard.module.css';
import Link from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

export default function ModelDashboard({ model }: { model: Database }) {
  return (
    <div className={styles.modelContainer}>
      <h1 className={styles.modelName}>{model.name}</h1>

      <div className={styles.modelElement}>
        <p className={styles.modelDescription}>{model.description}</p>

        <h2 className={styles.descriptionTitle}>
          Why should I choose it for my app?
        </h2>

        <p className={styles.description}>{model.whyGoodOption}</p>
      </div>
      <div className={styles.modelElement}>
        {model.schema &&
          <>
            <h2 className={styles.descriptionTitle}>Schema</h2>

            <div className={styles.schemaContainer}>
              This is a sample {model.name} model schema for your app:

              <SyntaxHighlighter
                className={styles.schema}
                language='javascript'
                style={atomOneDark}
              >
                {model.schema}
              </SyntaxHighlighter>

            </div>
          </>
        }
      </div>
      <div className={styles.modelElement}>
        <hr />

        <h2 className={styles.descriptionTitle}>Learn more</h2>
        <p className={styles.description}>
          Official {model.name} website:
          <Link href={model.link} className={styles.link}>
            {model.link}
          </Link>
        </p>
      </div>
    </div>
  );
}
