import Btn from '@components/btn/Btn';
import { Column, Columns } from '@components/Columns/Columns';
import Hero from '@components/Hero/Hero';
import TwoColImgSection from '@components/Two-col-img-section/Two-col-img-section';

export default function Home() {
  return (
    <div className=''>
      <main className=''>
        <Hero
          type='FrontPage'
          bgImgLabel="Hero Section with background image. Image of a person working out. This person's back is facing the camera, while they hold a bar with weights above their head. Photo by John Arano on Unsplash."
          contentClass='container px-4 py-14 mx-auto'
        >
          <Columns colsClasses='flex-col lg:flex-row'>
            <Column colClasses='lg:pe-8 xl:pe-10'>
              <h1 className='pb-6 text-4xl font-black lg:pb-0 xl:text-5xl mt-0'>
                Track your fitness and reach your goals
              </h1>
            </Column>
            <Column colClasses=''>
              <p className='mb-8 text-2xl'>
                With our exercise tracking app, you can easily entry your
                exercises and stay motivated to reach your goals. Weather your a
                beginner or a seasoned pro, we have the tools to help you
                succeed.
              </p>
              <div className='flex'>
                <Btn
                  btnclass='mr-8 bg-red-600 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-red-600 hover:border-2'
                  text='Sign Up'
                  link='/register'
                />
                <Btn
                  text='Learn More'
                  link='/about'
                  btnclass='bg-gray-900 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-gray-900 hover:border-2'
                />
              </div>
            </Column>
          </Columns>
        </Hero>
        <section className='sl-section bg-sky-600 py-32 text-white'>
          <Columns colsClasses='container mx-auto'>
            <Column>
              <div>
                <p className='text-center xl:text-5xl'>
                  “Work hard in silence, let your success be your noise.”
                </p>
                <p className='mt-8 text-center xl:text-4xl'>Anonymous</p>
              </div>
            </Column>
          </Columns>
        </section>
        <TwoColImgSection
          sectionClasses='lg:pt-24 pb-12'
          leftColContent={
            <img src='https://via.placeholder.com/800x600' alt='placeholder' />
          }
          rightColContent={
            <div className='p-12 pb-0 pe-0 ps-12 xl:pt-0'>
              <h2 className='mb-6 text-4xl font-black'>
                Track Your Exercises and Stay Motivated with Our App
              </h2>
              <p className='text-2xl'>
                Our exercise-tracking app allows you to easily select or enter
                your exercises and track your progress.
              </p>
            </div>
          }
        />
        <TwoColImgSection
          sectionClasses='lg:pt-12 pb-24'
          imgPlacement='right'
          leftColContent={
            <div className='p-12 pb-0 pe-12 ps-0 xl:pt-0'>
              <h2 className='mb-6 text-4xl font-black'>
                Set and Track Your Fitness Goals
              </h2>
              <p className='text-2xl'>
                Our app provides a comprehensive goal setting and tracking
                system to help you stay motivated and achieve your fitness
                goals. Whether you're a beginner or an experienced athlete, our
                app has the tools you need to succeed. With features like
                exercise selection, progress tracking, and personalized
                recommendations, you'll be able to take your fitness journey to
                the next level.
              </p>
            </div>
          }
          rightColContent={
            <img src='https://via.placeholder.com/800x600' alt='placeholder' />
          }
        />
      </main>
    </div>
  );
}
