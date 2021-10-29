import { useEffect } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

function LoginForm(props) {
  const history = useHistory();
  useEffect(() => {
    console.log("authentication changed...");
    if(props.auth.isAuthenticated)  history.push('/dashboard');
   

  }, [props.auth.isAuthenticated]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values) => {
      const { username, password } = await values;
      await props.loginUser(username, password);
      
    },
  });

  return (
    <div className="container bg-danger login-box">
      <form onSubmit={formik.handleSubmit} className="mt-5 login-form">
        <h1 className="">Login</h1>
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
        {
        (props.auth.error)&&
        <div className="alert alert-secondary" role="alert">
          Invalid username or password
        </div>
        }
        <button type="submit" className="btn btn-warning">
          Submit
        </button>
      </form>
      <hr />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
