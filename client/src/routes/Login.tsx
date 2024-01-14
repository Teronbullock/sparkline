import { useState, useContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/user-context";
import Btn from "../components/btn/Btn";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userContext) {
      console.error('UserContext is not defined');
    }

    const { setCurrentUser, setTokenInfo, setIsLoggedIn } = userContext;

    try {
      if (formData.email !== '' && formData.password !== '') {
        const res = await axios.post('/api/user/login', formData);
        const { userId, token, message } = res.data;
        console.log('Response from server: ', message);
        setCurrentUser({ 
          userID:  userId,
        });

        setTokenInfo(token);
        setIsLoggedIn(true);
        
        localStorage.setItem(
          'userData', 
          JSON.stringify({ 
            userID: userId,
            token: token
          })
        );

        navigate('/dashboard');
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
        <section className="et-section bg-sky-600 text-white py-32 h-lvh">
          <div className="container mx-auto max-w-screen-md">
            <div className="flex justify-end px-8 text-3xl">
              <Btn text="X" link="/" btnclass="text-white text-xl md:text-2xl xl:text-3xl hover:border-2" ariaLabel="back to home button" />
            </div>
            <h1 className="text-center md:text-3xl xl:text-5xl">
              Login
            </h1>
            <form className="container mx-auto mt-16 px-8" onSubmit={onSubmit} method="POST">
              <div className="flex flex-col mb-4">
                <label htmlFor="email" className="mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="p-2 text-black" 
                  onChange={(e)=> setFormData({ ...formData, email: e.target.value }) }
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-2">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="p-2 text-black" 
                  onChange={(e)=> setFormData({ ...formData, password: e.target.value }) }  
                />
              </div>
              <button type="submit" className="bg-sky-900 text-white p-2 rounded-md">Login</button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );

}