import { Logo } from '@/components/logo.tsx';
import {
  AIIcon, CapsulePillIcon, HeartPulseIcon, IncognitoIcon, LightbulbIcon,
  OrderAscIcon, PersonHeartsIcon, ShieldCheckIcon, ThumbsUpIcon
} from '@/ui/icons.ts';
import { cx } from '@/ui/utils.ts';

import styles from './features-section.module.scss';

import type { ComponentProps, JSX, ReactNode } from 'react';

type FeatureCardProps = Omit<ComponentProps<'div'>, 'title'> & {
  readonly icon?: ReactNode
  readonly title?: ReactNode
};

const FeatureCard = ({ children, className, icon, title, ...props }: FeatureCardProps): JSX.Element => (
  <div {...props} className={cx('feature-card', className)}>
    <div className="feature-icon">{icon}</div>

    <div>
      <h2 className="feature-title">{title}</h2>
      {children}
    </div>
  </div>
);

FeatureCard.displayName = 'FeatureCard';
const FeaturesSection = (): JSX.Element => (
  <section className={cx(styles.section)}>
    <div className="section-container relative">
      <h1 className="gradient-text">Ada apa dengan <Logo />?</h1>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <FeatureCard icon={<ThumbsUpIcon />} title="User-friendly">
          Aplikasi daftar tugas atau todo-list yang sederhana dan mudah dipahami tanpa harus berpikir terlalu panjang tentang aku, kau, dan dia
        </FeatureCard>

        <FeatureCard icon={<LightbulbIcon />} title="Intuitif">
          Di desain agar agar kamu bisa dengan mudah menemukan apa dan kapan kamu perlu melakukan sesuatu yang perlu dilakukan
        </FeatureCard>

        <FeatureCard icon={<CapsulePillIcon />} title="Safe">
          Tidak menyebakan iritasi dan nyaman untuk digunakan berulangkali, 3×sehari, tuwenti-por-sepen, tanpa perlu surat rujukan dan resep dokter terlebih dahulu.
        </FeatureCard>

        <FeatureCard icon={<ShieldCheckIcon />} title="Secure">
          Aman bagi lahir dan bathin; Kecuali sakit hati, <Logo /> tidak dapat (secara langsung) menyebabkan kanker, serangan jantung, impotensi dan gangguan kehamilan dan janin
        </FeatureCard>

        <FeatureCard icon={<IncognitoIcon />} title="Privacy">
          Tidak ada tedeng aling-aling, apa adanya, tanpa ada yang ditutup-tutupi, tanpa basa-basi. Bebas dari was-was dan rasa curiga, <Logo /> menjamin kerahasiaan data publikmu, tetaplah milik publik.
        </FeatureCard>

        <FeatureCard icon={<OrderAscIcon />} title="Systematize">
          Mendorong kamu untuk lebih terorganisir dan teratur dalam menjalani kehidupanmu sehari-hari
        </FeatureCard>

        <FeatureCard icon={<HeartPulseIcon />} title="Supportive">
          Membantu sedikit meringankan beban hidupmu yang sudah terlampau berat &apos;tuk dibagi-pakai
        </FeatureCard>

        <FeatureCard icon={<PersonHeartsIcon />} title="Personal">
          Membuat kamu merasa memegang kendali penuh atas duniamu yang semu.
        </FeatureCard>

        <FeatureCard icon={<AIIcon />} title="Smart">
          Dilengkapi dengan kecerdasan buatan, buat kamu terlihat tambah cerdas untuk buat-buat alasan ketika terlambat kumpulkan tugas
        </FeatureCard>
      </div>
    </div>
  </section>
);

FeaturesSection.displayName = 'FeaturesSection';

export { FeaturesSection };
