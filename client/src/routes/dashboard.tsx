import { useContext } from 'react';
import { UserContext } from '../context/user-context';
import Header from '../components/Header/Header';
import Footer from '../components//Footer/Footer';
import Hero from '../components/Hero/Hero';


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
        <Hero headerText='Dashboard'>
          <p className='text-center mt-8'>
            Welcome to the dashboard. Here you can track your exercises, set goals, and track your progress.
          </p>
        </Hero>
      </main>
      <Footer />
    </>
  )
}