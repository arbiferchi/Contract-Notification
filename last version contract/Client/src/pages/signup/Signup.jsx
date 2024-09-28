import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../Redux/actions/user';
import '../../assets/css/login.css'

const Signup = () => {
    const [newUser, setNewUser] = useState({ role: 'user'});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!newUser.firstName) errors.firstName = "First name is required";
        if (!newUser.lastName) errors.lastName = "Last name is required";
        if (!newUser.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            errors.email = "Email is invalid";
        }
        if (!newUser.password) errors.password = "Password is required";
        if (!newUser.tel) errors.tel = "Phone number is required";

        return errors;
    };

    const handleUser = async (e) => {
        e.preventDefault();
        const formErrors = validate();
        if (Object.keys(formErrors).length === 0) {
            try {
                await dispatch(register(newUser));
                navigate("/");
            } catch (error) {
                // Handle error if needed
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
		<div className='background'>
        <div className='p-4 h-screen flex items-center justify-center'>
            <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
                <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                    <h1 className='text-3xl font-semibold text-center text-gray-300'>
                        Sign Up <span className='text-blue-500'> Contract Alert</span>
                    </h1>

                    <form>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>First Name</span>
                            </label>
                            <input type='text' placeholder='' className='w-full input input-bordered h-10' name="firstName" onChange={handleChange} />
                            {errors.firstName && <p className='text-red-500'>{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Last Name</span>
                            </label>
                            <input type='text' placeholder='' className='w-full input input-bordered h-10' name="lastName" onChange={handleChange} />
                            {errors.lastName && <p className='text-red-500'>{errors.lastName}</p>}
                        </div>
                        <div>
                            <label className='label p-2'>
                                <span className='text-base label-text'>Email</span>
                            </label>
                            <input type='text' placeholder='Email' className='w-full input input-bordered h-10' name="email" onChange={handleChange} />
                            {errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>
                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Password</span>
                            </label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                className='w-full input input-bordered h-10'
                                name="password"
                                onChange={handleChange}
                            />
                            {errors.password && <p className='text-red-500'>{errors.password}</p>}
                        </div>
                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Role</span>
                            </label>
                            <input
                                type='text'
                                value='user'
                                className='w-full input input-bordered h-10 bg-gray-200 text-gray-500 cursor-not-allowed'
                                name="role"
                                readOnly
                            />
                            {errors.role && <p className='text-red-500'>{errors.role}</p>}
                        </div>
                        <div>
                            <label className='label'>
                                <span className='text-base label-text'>Phone Number</span>
                            </label>
                            <input
                                type='text'
                                placeholder=''
                                className='w-full input input-bordered h-10'
                                name="tel"
                                onChange={handleChange}
                            />
                            {errors.tel && <p className='text-red-500'>{errors.tel}</p>}
                        </div>
                        <Link to='/'>
                            <a className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
                                Already have an account?
                            </a>
                        </Link>
                        <div>
                            <button className='btn btn-block btn-sm mt-2 border border-slate-700' onClick={handleUser}>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
		</div>
    );
};

export default Signup;
