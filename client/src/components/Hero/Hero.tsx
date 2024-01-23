import { Children } from 'react';
import './hero.scss';

type HeaderProps = {
  headerType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children?: React.ReactNode;
  headerClass?: string;
}

const Header = ({ headerType, children, headerClass }: HeaderProps) => {
  let Tag = headerType as keyof JSX.IntrinsicElements;
  
  if (!Tag) {
    Tag = 'h1';
  }

  return (
    <Tag className={headerClass}>
      {children}
    </Tag>
  );
};


type HeroProps = {
  type?: string,
  children?: React.ReactNode,
  bgImgLabel?: string,
  heroClass?: string,
  heroContentClass?: string,
  headerType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  headerText?: string,
  headerClass?: string
}

/**
 *  -- Hero Component --
 * 
 * @param type: string - 'FrontPage' or 'normal'
 * @param children: React.ReactNode - JSX elements
 * @param bgImgLabel: string - aria-label for the background image
 * @param heroClass: string - additional Classes for the hero container
 * @param heroContentClass: string - additional classes for the hero content container
 * @returns 
 */
export default function Hero({ 
  type, children, bgImgLabel, heroClass, heroContentClass, headerType, headerText, headerClass }: HeroProps ) {

  // check if type is defined
  if (!type) {
    type = 'normal';
  }

  // render the hero component based on the type
  if (type === 'normal') {

    console.log('Hero component type is normal');
    return (
      <div className={`sl-hero bg-sl-blue text-white py-32 ${heroClass}`}>
        <div className={`sl-hero__content container mx-auto max-w-screen-md ${heroContentClass}`}>
          <Header
            headerType={headerType}
            headerClass={`text-5xl text-center ${headerClass}`}
          >
            {headerText}
          </Header>
          {children}
        </div>
      </div>
    );
 } else if (type === 'FrontPage') {
    const hasChildren = Children.count(children) > 0;
    const bgImgClass = hasChildren ? 'sl-hero__img--with-content' : '';
    const Class = heroClass ? heroClass : '';
    const contentClass = heroContentClass ? heroContentClass : '';
    
    return (
      <div className={`sl-hero ${Class}`}>
        <div className={`sl-hero__img ${bgImgClass}`} aria-label={bgImgLabel}>
        </div>
        { children ? (
          <div className={`sl-hero__content ${contentClass}`}>
            {children}
          </div>
        ) : null }
      </div>
    );
  }
}