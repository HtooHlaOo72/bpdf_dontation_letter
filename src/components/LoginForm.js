import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
export default function LoginForm() {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      history.push("/donate");
    },
  });

  return (
    <div className="container bg-danger login-box">
      
      <form
        onSubmit={formik.handleSubmit}
        className="mt-5 login-form"
      > 
        <h1 className=''>Login</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
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
            name="password"
            placeholder="12345abcd@#"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
        </div>

        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
      <hr />
    </div>
  );
}
