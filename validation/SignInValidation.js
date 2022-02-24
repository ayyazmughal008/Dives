import * as yup from 'yup';
    

export const userSignInSchema = yup.object().shape({
    email: yup.string().email("Email is invalid")
    .required("Email is required"),
    password: yup.string()
    .min(8, "Password must be atleast 8 characters")
    .max(16, "Password must be 16 characters or less")
    .required("Password is required"),
})