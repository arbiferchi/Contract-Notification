import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../Redux/actions/user';
import '../../assets/css/login.css'

const Login = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState(null); // To store error message

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleUser = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(user));
            navigate("/home");
        } catch (error) {
            setError("Invalid email or password"); // Set error message on failure
        }
    };

    return (
        <div className='background '>
        <div className='p-4 h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        Login
                        <span className='text-blue-500'> Contract Alert</span>
                    </h1>

                    <form>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Email</span>
                            </label>
                            <input type='text' placeholder='Enter Email' className='w-full input input-bordered h-10' name='email' onChange={handleChange} />
                        </div>

                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                className='w-full input input-bordered h-10'
                                name='password'
                                onChange={handleChange}
                            />
                        </div>

                        {error && <p className='text-red-500'>{error}</p>} {/* Display error message */}

                        <Link to={"/signup"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                            {"Don't"} have an account?
                        </Link>

                        <div>
                            <button className='btn btn-block btn-sm mt-2' onClick={handleUser}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login;
