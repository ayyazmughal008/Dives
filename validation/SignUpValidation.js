import * as yup from 'yup';
    

export const userSignUpSchema = yup.object().shape({
    email: yup.string().email("Email is invalid")
    .required("Email is required"),
    username : yup.string()
    .min(4, "Username must be atleast 4 characters")
    .required("Username is required"),
    password: yup.string()
    .min(8, "Password must be atleast 8 characters")
    .max(16, "Password must be 16 characters or less")
    .required("Password is required"),
    confirmPassword: yup.string()
    .equals([yup.ref('password'), null], "Passwords do not match")
    .required("Confirm Password is required")
})


