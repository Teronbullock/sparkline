import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components//Footer/Footer";
import axios from "axios";

export default function Registration() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  /**
  * e: React.FormEvent<HTMLFormElement> is the type of the event object
  * that is passed to the handleSubmit function. React.FormEvent is a generic
  * type that takes a type argument that represents the type of the form element
  * that the event is being dispatched from. 
  * 
  * <> is a type argument that is being passed to the React.FormEvent type.
  * HTMLFormElement is the type of the form element that the event is being
  * dispatched from.
  *  
  */ 
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Send a POST request to the server
    try {
      if (
        formData.firstName !== '' &&
       formData.lastName !== '' && 
       formData.email !== '' && 
       formData.password !== '' && 
       formData.confirmPassword !== ''
      ) {

        // Check if the passwords match
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        const response = await axios.post('/api/user/add', formData);
        console.log('Response from server', response);
        alert('Account created successfully');

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        
      } else {
        alert('Please fill out all fields');
      }

    } catch (error) {
      console.error('Error with submitting form to server', error);
    }
  }

  return (
    <>
      <Header />
      <main>
        <section className="et-section bg-sky-600 text-white py-32">
          <div className="container mx-auto">
            <h1 className="text-center xl:text-5xl">
              Create an account
            </h1>
            <p className="text-center xl:text-2xl mt-8">
              Start tracking your exercises today!
            </p>
          </div>
        </section>
        <section className="et-section bg-sky-500 text-white py-32">
          <div className="container mx-auto">
            <h2 className="text-center xl:text-4xl">
              Sign Up
            </h2>
            <form className="flex flex-col items-center mt-16" onSubmit={onSubmit}>
              <input
                type="text"
                placeholder="First Name"
                className="w-96 p-4 mb-4 text-black"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-96 p-4 mb-4 text-black"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-96 p-4 mb-4 text-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-96 p-4 mb-4 text-black"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-96 p-4 mb-4 text-black"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
              <button className="w-96 bg-red-600 text-white py-4 px-8 hover:text-black hover:bg-transparent hover:border-red-600 hover:border-2">
                Sign Up
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}