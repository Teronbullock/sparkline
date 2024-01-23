import Header from "../components/Header/Header";
import Footer from "../components//Footer/Footer";
import Hero from "../components/Hero/Hero";


export default function Workout() {

  return (
  <>
    <Header />
    <main>
      <Hero headerText='Add Workout'>
        <p className='text-center mt-8'>
          Add a workout to your profile
        </p>
      </Hero>
    </main>
    <Footer />
  </>
  );
}