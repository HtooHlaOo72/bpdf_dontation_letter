import { useEffect,useState} from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";

function LoginForm(props) {
  const history = useHistory();
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    setLoading(false);
    if(props.auth.isAuthenticated)  history.push('/dashboard');
  },[props.auth.isAuthenticated, history]);
  useEffect(()=>{
    setLoading(false);
  },[props.auth.error]);
  const validate=(values)=>{
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    } else if (values.username.length > 30) {
      errors.username = "Must be 30 characters or less";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length > 30) {
      errors.password = "Must be 30 characters or less";
    }
    return errors;
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      const { username, password } = await values;
      await setLoading(true);
      await props.loginUser(username, password);
      setLoading(false);
    },
  });

  return (
    <div className="container login-form">
      <form onSubmit={formik.handleSubmit} className="mt-5 py-3">
        <h1 className="mt-3">Login</h1>
        <div className="mb-3 login-input">
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
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />{
            (formik.errors.username)&&
            <div className="alert alert-danger login-input" role="alert">
              {formik.errors.username}
            </div>
            }
        </div>
        <div className="mb-3 login-input">
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
        <div className="alert alert-danger login-input" role="alert">
          Invalid username or password
        </div>
        }
        <button type="submit" className="btn" disabled={loading}>
          {(loading)?"Loading...":"Submit"}
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
