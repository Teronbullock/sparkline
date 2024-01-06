import { Columns, Column } from '../Columns/Columns';

import './two-col-img-section.scss';

type twoColImgProps = {
  sectionClasses?: string,
  imgPlacement?: string,
  leftColContent: React.ReactNode,
  rightColContent: React.ReactNode,

}

/**
 * 
 * @param sectionClasses - optional classes to add to the section
 * @param imgPlacement - optional placement of the image, either 'left' or 'right', default is 'left'.
 * @param leftColContent - content for the left column
 * @param rightColContent - content for the right column
 * @returns 
 */
const TwoColImgSection = ({ leftColContent, rightColContent, sectionClasses, imgPlacement } : twoColImgProps ) => {

  const classes = sectionClasses ? sectionClasses : '';
  let colsClasses: string;

  if ( imgPlacement === 'right') {
    colsClasses = 'flex-col-reverse';
  } else {
    colsClasses = 'flex-col';
  }

  return (
    <section className={`et-section ${classes}`}>
      <Columns colsClasses={`container mx-auto lg:flex-row items-center px-12 ${colsClasses}`}>
        <Column>
          {leftColContent}
        </Column>
        <Column>
          {rightColContent}
        </Column>
      </Columns>
    </section>
  );
}

export default TwoColImgSection;