import React from 'react';
import AuthHeadline from "../../../components/containers/AuthHeadline/AuthHeadline";
import AuthInputForm from "../../../components/containers/AuthInputForm/AuthInputForm";
import AuthPrimaryButton from "../../../components/containers/AuthPrimaryButton/AuthPrimaryButton";


export const SignupView: React.FC = () => {

    return (
        <>
            <AuthHeadline>
                Jak się nazywasz? 🤔
            </AuthHeadline>
            <AuthInputForm />
            <AuthPrimaryButton margin onClick={() => null}>
                Gotowe
            </AuthPrimaryButton>
        </>
    )
};
