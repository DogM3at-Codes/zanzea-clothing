import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields]  =  useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.log("Password not equal with confirm password");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});

            console.log("Successfully created email account");
            resetFormFields();
        } catch (ex) {
            if (ex.code === 'auth/email-already-in-use') {
                console.log(ex.message);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput
                    label="Email"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput
                    label="Password"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <FormInput
                    label="Confirm Password"
                    type="text" 
                    required onChange={handleChange} 
                    name="displayName" 
                    value={displayName} 
                />

                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    );
}

export default SignUpForm;