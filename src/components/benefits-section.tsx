import { cx } from "@/ui/utils";

import { Logo } from "@/components/logo";

import styles from './benefits-section.module.scss';
import Image from "next/image";

import type { ComponentProps, ReactNode } from 'react';
import { BarChartIcon, BoltIcon, CurrencyIcon, DatabaseIcon, PersonArmsUpIcon, PlusIcon, TicketIcon } from "@/ui/icons";
import { Link } from "@/components/link";

type BenefitCardProps = ComponentProps<'div'> & {
  readonly icon?: ReactNode
  readonly image?: string
}

const BenefitCard = ({ children, className, icon, image, title, ...props }: BenefitCardProps) => {
  return (
    <div {...props} className={cx('benefit-card flex-row items-start gap-4 sm:flex-col sm:items-center', className)}>
      <div className="benefit-icon">{icon}</div>
      <div {...props} className={cx('benefit-content sm:items-center', className)}>
        <h2 className="benefit-title">{title}</h2>
        <div className="benefit-text">{children}</div>
      </div>
    </div>
  )
};

const BenefitsSection = () => {
  return (
    <section className={cx(styles.section)}>
      <div className="section-container relative">
        <h1 className="gradient-text">Kenapa harus <Logo />?</h1>
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <BenefitCard icon={<BarChartIcon />} title="Satisfaction">
            Statistik membuktikan bahwa dari tahun ke tahun <Logo /> konsisten selalu memiliki tingkat kepuasan pelanggan yang berbanding terbalik dengan tingkat ketidakpuasannya.
          </BenefitCard>
          <BenefitCard icon={<DatabaseIcon />} title="Data Integrity">
            Integritas data Anda di <Logo /> dijamin dan akan selalu tersedia dengan{' '}
            <Link external={true} href="https://en.wikipedia.org/wiki/Service-level_agreement" title="Service Level Agreement">SLA</Link>{' '}
            <strong>up to</strong> 99.999%. Tidak ada outstanding task yang akan berubah menjadi selesai kecuali Anda (atau orang lain) menyelesaikannya sendiri.
          </BenefitCard>
          <BenefitCard icon={<CurrencyIcon />} title="Flexible Pricing">
            Tidak ada dua individu yang sama persis. Oleh karena itu <Logo /> menawarkan paket berlangganan dengan harga dan billing yang fleksibel sesuai dengan kebiasaan masing-masing pengguna.
            Anda hanya akan ditagihkan sesuai dengan jumlah task yang Anda selesaikan.
          </BenefitCard>
          <BenefitCard icon={<TicketIcon />} title="Rewards">
            Dapatkan reward dari pihak-pihak yang bekerja sama dengan <Logo /> untuk setiap task dari mereka yang berhasil Anda selesaikan. Jumlah dan besaran reward tergantung pada kesepakatan pihak-pihak yang terkait.
          </BenefitCard>
        </div>
      </div>
    </section>
  )
}

export { BenefitsSection }
