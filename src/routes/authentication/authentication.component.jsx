import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';

const SignIn = () => {
    return (
        <div class="authentication-container">
            <div class="authentication-container-col">
                <SignInForm />
            </div>
            <div class="authentication-container-col">
                <SignUpForm />
            </div>
            
        </div>
    )
}

export default SignIn;