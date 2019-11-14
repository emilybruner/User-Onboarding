import React, { useState, useEffect } from "react"
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "axios";

const Login = ({ values, errors, touched, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        status && setUsers(users => [...users, status]);
    }, [status]);

    return (
        <div className="user-form">
            <h2>Login</h2>
            <Form>
                <label className="userinfo">Name
           <Field type="text" name="name" placeholder="name" />
                    {touched.name && errors.name && (<p>{errors.name}</p>)}
                </label>
                <label className="userinfo">Email
           <Field type="text" name="email" placeholder="email" />
                    {touched.email && errors.email && (<p>{errors.email}</p>)}
                </label>
                <label className="userinfo">Password
           <Field type="text" name="password" placeholder="password" />
                    {touched.password && errors.password && (<p>{errors.password}</p>)}
                </label>
                <label>Role
                    <Field required as="select" name="role">
                        <option>Please Choose an Option</option>
                        <option value="ui">UI Developer</option>
                        <option value="ux">UX Designer</option>
                        <option value="fontend">Front-end Developer</option>
                        <option value="backend">Back-end Developer</option>
                        <option value="ds">Data Scientist</option>
                    </Field>
                </label>
                <label>Terms of Service
            <Field required type="checkbox" name="tos" checked={values.tos} />
                </label>
                <button>Submit</button>
            </Form>
            {users.map(user => (
                <ul key={user.id}>
                    <p>User: {user.name}</p>
                    <p>Email: {user.email}</p>
                </ul>
            ))}
        </div>
    )
}
const FormikLogin = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required()
    }),
    handleSubmit(values, { setStatus }) {
        Axios.post("https://reqres.in/api/users", values)
            .then(res => {
                setStatus(res.data);
                console.log(res);
            })
            .catch(err => console.log(err.response));
    }
})(Login);

export default FormikLogin

