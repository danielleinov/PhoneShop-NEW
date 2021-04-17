import  "./register.css"
import axios from "axios";
import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
export default function Register() {
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [validate, setValidation] = useState("")

    React.useEffect(() => {
        if (password != confirmPassword) {
            alert("password not match")
        }

    }, [validate]);

    const handleSubmit = async e => {
        console.log("here")
        const user = {displayName, email, password};
        // send the username and password to the server
        await axios.post(
            "http://localhost:8080/api/user/register",
            {
                name: displayName,
                email: email,
                password: password
            }
        ).catch(error => {
            alert("Failed to register")
            history.push("/register")
        })


    };

    return (
        <form className="register">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-8 col-xl-6">
                        <div className="row">
                            <div className="col text-center">
                                <h1>Register</h1>
                                <p className="text-h3">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia. </p>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <form className="col mt-4">
                                <input type="text" className="form-control" value={displayName} placeholder="Display Name"
                                       onChange={({target}) => setDisplayName(target.value)}/>
                            </form>
                        </div>
                        <div className="row align-items-center mt-4">
                            <div className="col">
                                <input type="email" className="form-control" value={email} placeholder="user@domain.com"
                                       onChange={({target}) => setEmail(target.value)}/>
                            </div>
                        </div>
                        <div className="row align-items-center mt-4">
                            <div className="col">
                                <input type="password" className="form-control" value={password} placeholder="Password"
                                       onChange={({target}) => setPassword(target.value)}/>
                            </div>
                            <div className="col">
                                <input type="password" className="form-control" value={confirmPassword} placeholder="Confirm Password"
                                       onBlur={({target}) => setValidation(confirmPassword)}
                                       onChange={({target}) => setConfirmPassword(target.value)}/>
                            </div>
                        </div>
                        <div className="row justify-content-start mt-4">
                            <div className="col">
                                <Link to={'/login'}><button onClick={()=>{handleSubmit()}} className="btn btn-primary mt-4">Submit</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}