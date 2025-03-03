import classnames from 'classnames';
import { Children } from 'react';
import './hero.scss';

type HeroProps = {
    type?: string;
    children?: React.ReactNode;
    bgImgLabel?: string;
    heroClass?: string;
    contentClass?: string;
    headerText?: string;
    headerClass?: string;
};

/**
 *  -- Hero Component --
 *
 * @param type: string - 'FrontPage' or 'normal'
 * @param children: React.ReactNode - JSX elements
 * @param bgImgLabel: string - aria-label for the background image
 * @param heroClass: string - additional Classes for the hero container
 * @param contentClass: string - additional classes for the hero content container
 * @returns
 */
export default function Hero({
    type,
    children,
    bgImgLabel,
    heroClass,
    contentClass,
    headerText,
}: HeroProps) {
    // check if type is defined
    if (!type) {
        type = 'normal';
    }

    // render the hero component based on the type
    if (type === 'FrontPage') {
        const hasChildren = Children.count(children) > 0;
        return (
            <div className={classnames('sl-hero', heroClass)}>
                <div
                    className={classnames('sl-hero__img', {
                        'sl-hero__img--with-content': hasChildren,
                    })}
                    aria-label={bgImgLabel}
                ></div>
                {children ? (
                    <div
                        className={classnames('sl-hero__content', contentClass)}
                    >
                        {children}
                    </div>
                ) : null}
            </div>
        );
    } else {
        return (
            <div className={`sl-hero bg-sl-blue py-32 text-white ${heroClass}`}>
                <div
                    className={`sl-hero__content container mx-auto max-w-screen-md ${contentClass}`}
                >
                    <h1 className="text-center text-5xl">{headerText}</h1>
                    {children}
                </div>
            </div>
        );
    }
}
