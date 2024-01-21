import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Form from '../components/Form/Form';


export default function Exercise() {
  return (
    <>
      <Header />
      <main>
        <Hero headerText="Add Exercise">
          <p className="text-center mt-8">
            Select Your Exercise From The List Below.
          </p>
        </Hero>
        <div className="flex justify-center mt-4">
          <Form />
        </div>
      </main>
      <Footer />
    </>
  )
}