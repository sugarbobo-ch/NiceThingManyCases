import BrandAdvantage from '@/components/ui/about/brandAdvantage';
import styles from './page.module.css';
import BrandStory from '@/components/ui/about/brandStory';
import TeamIntroduction from '@/components/ui/about/teamIntroduction';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BrandAdvantage id="#brand-advantage" />
        <BrandStory id="#brand-story" />
        <TeamIntroduction id="#team-introduction" />
      </main>
      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
