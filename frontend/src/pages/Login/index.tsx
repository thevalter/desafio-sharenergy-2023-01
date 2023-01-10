import React, { useState, useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../contexts/auth';

import './styles.css';


const LoginPage = () => {

  const { login } = useContext(AuthContext);

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);

  const handleLogin = async (e : React.SyntheticEvent) => {
    e.preventDefault();
    await login(user, password);

    if (remember) {
      localStorage.setItem('login', JSON.stringify({ user, password }))
    }
  };

  useEffect(() => {
    const loginRemember = localStorage.getItem('login');

    if (loginRemember) {
      const credentials = JSON.parse(loginRemember);
      setPassword(credentials.password);
      setUser(credentials.user);
      setRemember(true);
    }

  }, []);

  return (
    <div id='login'>

      <div className="form-wrapper">
        <h1>Login</h1>

        <form onSubmit={handleLogin} className='form-login'>
          <label htmlFor="user">User</label>

          <input type="text" name="user" placeholder='Enter your username' onChange={e => setUser(e.target.value)} value={user} />

          <label htmlFor="password">Password</label>

          <input type="password" name="password" id="password" placeholder='Insert your password' onChange={e => setPassword(e.target.value)} value={password} />

          <div>
            <input checked={remember} type="checkbox" name="remember" id="" onChange={e => setRemember(e.target.checked)} /> Remember me
          </div>
          <button type="submit">Sign in</button>

        </form>

        <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      </div>
    </div>
  )
}

export default LoginPage;