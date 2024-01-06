import { Children } from 'react';
import './hero.scss';

type HeroProps = {
  children?: React.ReactNode,
  bgImgLabel?: string,
  heroClasses?: string,
  heroContentClasses?: string,
}

export default function Hero({ children, bgImgLabel, heroClasses, heroContentClasses }: HeroProps ) {
  const hasChildren = Children.count(children) > 0;
  const bgImgClass = hasChildren ? 'et-hero__img--with-content' : '';
  const classes = heroClasses ? heroClasses : '';
  const contentClasses = heroContentClasses ? heroContentClasses : '';

  return (
    <div className={`et-hero ${classes}`}>
      <div className={`et-hero__img ${bgImgClass}`} aria-label={bgImgLabel}>
      </div>
      { children ? (
        <div className={`et-hero__content ${contentClasses}`}>
          {children}
        </div>
      ) : null }
    </div>
  )
}