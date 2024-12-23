import React, { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { loginAPI, registerAPI } from '../services/allAPI';
import { Spinner } from 'react-bootstrap';

const Auth = ({ insideRegister }) => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [userInput, setUserInput] = useState({
    username: "", email: "", password: ""
  });

  // Admin credentials
  const adminEmail = "admin@example.com";
  const adminPassword = "admin123";

  const register = async (e) => {
    e.preventDefault();
    if (userInput.username && userInput.password && userInput.email) {
      // API call
      try {
        const result = await registerAPI(userInput);
        if (result.status === 200) {
          toast.success(`Welcome ${result.data?.username}, please login to explore our projects!`);
          navigate("/login");
          setUserInput({ username: "", email: "", password: "" });
        } else {
          if (result.response.status === 406) {
            toast.warn(result.response.data);
            setUserInput({ username: "", email: "", password: "" });
          }
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Please fill the form completely");
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (userInput.password && userInput.email) {
      // Check if the entered email and password match the admin credentials
      if (userInput.email === adminEmail && userInput.password === adminPassword) {
        toast.success("Admin login successful!");
        navigate("/add-doctor");
        return;
      }

      try {
        const result = await loginAPI(userInput);
        if (result.status === 200) {
          sessionStorage.setItem("users", JSON.stringify(result.data.users));
          sessionStorage.setItem("token", result.data.token);
          toast.success("Login successful!");

          setTimeout(() => {
            navigate("/");
            window.location.reload();
          }, 500);
        } else if (result.response.status === 404) {
          toast.warn(result.response.data);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      toast.error("Please fill the form completely");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-300 w-96">
        <h2 className="text-xl font-semibold text-center mb-4">{insideRegister ? 'Create Account' : 'Login'}</h2>
        <p className="text-center text-gray-600 mb-4">Please {insideRegister ? 'sign up' : 'log in'} to book an appointment</p>
        {insideRegister &&
          <MDBInput value={userInput.username} onChange={e => setUserInput({ ...userInput, username: e.target.value })} label="Username" id="form1" type="text" className="mt-2" />
        }
        <MDBInput value={userInput.email} onChange={e => setUserInput({ ...userInput, email: e.target.value })} label="Email" id="form2" type="text" className="mt-2" />
        <MDBInput value={userInput.password} onChange={e => setUserInput({ ...userInput, password: e.target.value })} label="Password" id="form3" type="password" className="mt-2" />
        {
          insideRegister ?
            <div className='mt-3'>
              <button onClick={register} className='bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-800 transition duration-300'>
                Create account
              </button>
              <p className='mt-2'>Already have an account? <Link to={'/login'} className='underline'>Login here</Link></p>
            </div>
            :
            <div className='mt-3'>
              <button onClick={login} className='bg-blue-600 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-800 transition duration-300'>
                Login
                {isLogin &&
                  <Spinner animation="border" variant="dark" className='ms-1' />}
              </button>
              <p className='mt-2'>Create a new account? <Link to={'/register'} className='underline'>Click here</Link></p>
            </div>
        }
      </div>
      <ToastContainer />
    </div>
  );
}

export default Auth;