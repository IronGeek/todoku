import { Carousel } from "@/ui/carousel";
import { ComponentProps } from "react";
import { cx } from "@/ui/utils";

import styles from './customers-section.module.scss';
import { ImageAltIcon } from "@/ui/icons";

type CustomerLogoProps = ComponentProps<'div'>;

const CustomerLogo = ({ className, children, ...props }: CustomerLogoProps) => {
  return (
    <div {...props} className={cx("shadow-xs", className)}>
      {children}
    </div>
  )
}

const CustomersSection = () => {
  return (
    <section className={cx(styles.section)}>
      <div className="section-container relative">
        <h1 className="gradient-text text-center">Dipercaya oleh brand-brand populer</h1>

        <Carousel className="w-full" opts={{ align: 'center' }}>
          <Carousel.Previous />
          <Carousel.Content>
            { Array(10).fill(null).map((_, i) => (
              <Carousel.Item key={i} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                <CustomerLogo className="customer-logo">
                  <ImageAltIcon className="logo"/>
                </CustomerLogo>
              </Carousel.Item>
            ))}
          </Carousel.Content>
          <Carousel.Next />
        </Carousel>

        <p className="text-muted-foreground">Gabung bareng 1·000·000 pengguna lainnya di seluruh dunia</p>
      </div>
    </section>
  )
}

export { CustomersSection }
