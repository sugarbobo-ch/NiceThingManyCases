import BrandAdvantage from '@/components/ui/about/brandAdvantage';
import styles from './page.module.css';
import BrandStory from '@/components/ui/about/brandStory';
import TeamMember from '@/components/ui/about/teamMember';

const routeLabels = {
  '/products': '產品',
  '/products/software': '軟體解決方案',
  '/products/hardware': '硬體設備',
  '/about': '關於我們',
  '/contact': '聯絡我們',
  '/blog': '部落格',
  '/services/color-film': '改色膜',
  '/products/rhino-skin': '犀牛皮',
  '/products/color-rhino-skin': '改色犀牛皮',
  '/products/custom-painting': '客製化彩繪',
  '/products/corporate-image-car': '企業形象車',
};

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <BrandAdvantage id="#brand-advantage" />
        <BrandStory id="#brand-story" />
        <TeamMember id="#team-member" />
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
