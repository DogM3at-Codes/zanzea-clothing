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
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);

            resetFormFields();
        } catch (ex) {
            console.log(ex.message);
        }
    };

    return (
        <div className="sign-in-form-container">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    type="text" 
                    required onChange=""
                    name="email" 
                    value={email} 
                />
                <FormInput
                    label="Password"
                    type="text" 
                    required onChange=""    
                    name="password" 
                    value={password} 
                />
                <div className="sign-in-button-container">
                    <Button type="submit">
                        Sign in
                    </Button>
                    <Button buttonType="google" onClick={logGoogleUser}>
                        Google Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;