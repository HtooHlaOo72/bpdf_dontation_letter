import {useFormik} from 'formik';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function LoginForm() {
    const history=useHistory();
    const url='https://sheet.best/api/sheets/983278aa-0a93-4713-9183-ccd8f1aa9f4f';
    const formik=useFormik({
        initialValues:{
            username:'',
            password:''
        },
        onSubmit:(values)=>{
            console.log(JSON.stringify(values,null,2));
            history.push('/donate')
        }
    })

    return (
        <div className="container">
            <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
            <label htmlFor="username" className="form-label">
                Username:
            </label>
            <input
                type="text"
                className="form-control"
                id="username"
                name='username'
                placeholder="admin"
                value={formik.values.username}
                onChange={formik.handleChange}
            />
            </div>
            <div className="mb-3">
            <label htmlFor="password" className="form-label">
               Password:
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                name='password'
                placeholder="12345abcd@#"
                value={formik.values.password}
                onChange={formik.handleChange}
            />
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
    );
}
