import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields]  =  useState(defaultFormFields);
    const {email, password} = formFields;

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch (ex) {
            switch (ex.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for email');
                    break;

                case 'auth/user-not-found':
                    alert('No user associated wiith this email');
                    break;

                default:
                    console.log(ex.code);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-in-form-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="text" 
                    required onChange={handleChange}
                    name="email" 
                    value={email} 
                />
                <FormInput
                    label="Password"
                    type="text" 
                    required onChange={handleChange}  
                    name="password" 
                    value={password} 
                />
                <div className="sign-in-button-container">
                    <Button type="submit">
                        Sign in
                    </Button>
                    <Button type="button" buttonType="google" onClick={logGoogleUser}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;