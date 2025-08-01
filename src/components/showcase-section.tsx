import { cx } from "@/ui/utils";

import { Logo } from "@/components/logo";

import styles from './showcase-section.module.scss';
import Image from "next/image";

import placeholder from '../../public/showcase-placeholder.svg?url';

import type { ComponentProps, ReactNode } from 'react';
import { BoltIcon, PersonArmsUpIcon } from "@/ui/icons";

type ShowcaseCardProps = ComponentProps<'div'> & {
  readonly icon?: ReactNode
  readonly image?: string
}

const ShowcaseCard = ({ children, className, icon, image, title, ...props }: ShowcaseCardProps) => {
  return (
    <div {...props} className={cx('showcase-card flex-col md:flex-row even:md:flex-row-reverse', className)}>
      <Image
        alt={title}
        className="showcase-image w-full md:w-[320px] lg:w-[480px] xl:w-[560px] 2xl:w-[720px] h-auto rounded-lg"
        src={image} />
      <div {...props} className={cx('showcase-content', className)}>
        <div className="showcase-icon">{icon}</div>
        <div>
          <h2 className="showcase-title">{title}</h2>
          <div className="showcase-text">{children}</div>
        </div>
      </div>
    </div>
  )
};

const ShowcaseSection = () => {
  return (
    <section className={cx(styles.section)}>
      <div className="section-container relative">
        <h1 className="gradient-text">Antara <Logo />, kamu, dan dirinya</h1>
        <div className="flex flex-col gap-12">
          <ShowcaseCard image={placeholder} icon={<PersonArmsUpIcon />} title="In Harmonia Productio">
            <Logo /> mengembalikan kepercayaan dirimu untuk terus menghasilkan karya bagi bangsa dan negara, <span className="text-red-600">MERDEKA!!!</span> 🇮🇩
          </ShowcaseCard>
          <ShowcaseCard image={placeholder} icon={<BoltIcon />} title="Achieving Humanity">
            Dengan <Logo />, menuju hari-hari yang lebih sedikit stress, lebih banyak sukses. 🎉
          </ShowcaseCard>
        </div>
      </div>
    </section>
  )
}

export { ShowcaseSection }
