import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import LogoutNav from '../Navbars/LogoutNav';
import { doLogin } from '../store/actions/UserAction';
import '../CSS/Login.css';
import LoginNav from '../Navbars/LoginNav';



function Login() {
    const loggedInUser = useSelector(state => state.userReducer.loggedInUser)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});


    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [userRole, setUserRole] = useState("");


    const doSignIn = () => {

        let errors = {};
        if (!userName) {
            errors['UsernameError'] = "username cannot be empty";
        }

        if (!password) {
            errors['passwordError'] = "Password cannot be empty";
        }
        setFormErrors(errors);

        const noErrors = Object.keys(errors).length === 0;

        if (noErrors) {
            console.log("data is valid");

            const payload = {
                userName: userName,
                password: password,
                userRole: userRole
            }
            dispatch(doLogin(payload));
        }

    }

    return (
        <body className="body-login">
            <LoginNav />
            {
                loggedInUser !== null ?

                loggedInUser.userRole==='User' ?
                    navigate('/flight/search')
                    :
                    loggedInUser.userRole==='Admin'&&
                    navigate('/admin')
                    :

                    <div className='container-login'  > 
                        <div>
                            <h2 className='h2-loginpage'>Login Page</h2><hr></hr>
                        </div>
                         

                        <div className="form-group">
                            <label htmlFor='userName'>Username
                                <input type="userName" className="form-control" placeholder="Enter your userName" name="userName" value={userName} onChange={e => setUserName(e.target.value)} />
                            </label>
                            {
                                formErrors.UsernameError &&
                                <div style={{ color: 'red' }}>{formErrors.UsernameError}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor='password'>Password:
                                <input type="password" className="form-control" name="password" placeholder="Enter your Password" value={password} onChange={e => setPassword(e.target.value)} />
                            </label>
                            {
                                formErrors.passwordError &&
                                <div style={{ color: 'red' }}>{formErrors.passwordError}</div>
                            }
                        </div>



                        <div className="form-group">
                            <label htmlFor='userRole' class="control-label">User Role:
                                <select className='form-control' name="userRole" value={userRole} onChange={e => setUserRole(e.target.value)}>
                                    <option>----Select--------</option>
                                    <option value={"User"}>User</option>
                                    <option value={"Admin"}>Admin</option>

                                </select>
                            </label>

                            
                        </div>



                        <div>
                            <button onClick={doSignIn} class="btn btn-outline-success">Login</button>&nbsp;




                        </div><hr></hr>
                        <div className='p-login'>

                            <p>If you are not a registered User, Please <Link to={'/user/add'} ><b> Register </b></Link> here.</p>
                        </div>

                    </div>

            }

        </body>
    )
}

export default Login;