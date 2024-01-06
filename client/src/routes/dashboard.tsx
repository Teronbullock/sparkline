import { useContext } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components//Footer/Footer';
import { UserContext } from '../context/user-context';


export default function Dashboard() {
  const userContext = useContext(UserContext);

  if (!userContext) {
    console.error('UserContext is not defined');
  }

  const { currentUser, tokenInfo } = userContext;
  // console.log('currentUser', currentUser);
  // console.log('tokenInfo', tokenInfo);

  return (
    <>
      <Header />
      <main>
        <section className='et-section bg-sky-600 text-white py-32'>
          <div className='container mx-auto max-w-screen-md'>
            <h1 className='text-center xl:text-5xl'>
              Dashboard
            </h1>
            <p className='text-center mt-8'>
              Welcome to the dashboard. Here you can track your exercises, set goals, and track your progress.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}