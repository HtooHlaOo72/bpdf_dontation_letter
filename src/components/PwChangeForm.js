import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { changePassword } from "../actions/authActions";

function PwChangeForm(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    if (!props.auth.isAuthenticated) history.push("/dashboard");
  }, [props.auth.isAuthenticated, history]);
  useEffect(() => {
    setLoading(false);
  }, [props.auth.error]);
  const validate = (values) => {
    const errors = {};
    if (!values.usernameCh) {
      errors.usernameCh = "Required";
    } else if (values.usernameCh.length > 20) {
      errors.usernameCh = "Must be 20 characters or less";
    }
    if (!values.passwordCh) {
      errors.passwordCh = "Required";
    } else if (values.passwordCh.length > 20) {
      errors.passwordCh = "Must be 20 characters or less";
    }

    if (!values.newPassword1) {
      errors.newPassword1 = "Required";
    } else if (values.newPassword1.length > 20) {
      errors.newPassword1 = "Must be 20 characters or less";
    }

    if (!values.newPassword2) {
      errors.newPassword2 = "Required";
    } else if (values.newPassword2.length > 20) {
      errors.newPassword2 = "Must be 20 characters or less";
    }

    if (
      values.newPassword1 &&
      values.newPassword2 &&
      values.newPassword1 !== values.newPassword2
    ) {
      errors.isSame = "Two Passwords are not identical";
    }

    return errors;
  };
  const formik = useFormik({
    initialValues: {
      usernameCh: "",
      passwordCh: "",
      newPassword1: "",
      newPassword2: "",
    },
    validate,
    onSubmit: async (values) => {
      const { usernameCh, passwordCh, newPassword2 } =await  values;
      console.log(usernameCh,passwordCh,newPassword2,"submit change...")
      setLoading(true);
      await props.changePassword(
        usernameCh,
        passwordCh,
        newPassword2,
        props.auth.token
      );
      await setLoading(false);
      history.push('/dashboard')
    },
  });

  return (
    <div className="container login-form">
      <form onSubmit={formik.handleSubmit} className="mt-5 py-3">
        <h1 className="mt-3">Login</h1>
        <div className="mb-3 login-input">
          <label htmlFor="usernameCh" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="usernameCh"
            name="usernameCh"
            placeholder="admin"
            value={formik.values.usernameCh}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.usernameCh && (
            <div className="alert alert-danger login-input" role="alert">
              {formik.errors.usernameCh}
            </div>
          )}
        </div>
        <div className="mb-3 login-input">
          <label htmlFor="passwordCh" className="form-label">
            Old Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="passwordCh"
            name="passwordCh"
            placeholder="12345abcd@#"
            value={formik.values.passwordCh}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <div className="alert alert-danger login-input" role="alert">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="mb-3 login-input">
          <label htmlFor="newPassword1" className="form-label">
            New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword1"
            name="newPassword1"
            placeholder="12345abcd@#"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.newPassword1 && (
            <div className="alert alert-danger login-input" role="alert">
              {formik.errors.newPassword1}
            </div>
          )}
        </div>
        <div className="mb-3 login-input">
          <label htmlFor="newPassword2" className="form-label">
            Confirm New Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword2"
            name="newPassword2"
            placeholder="12345abcd@#"
            value={formik.values.newPassword2}
            onChange={formik.handleChange}
          />
          {formik.errors.newPassword2 && (
            <div className="alert alert-danger login-input" role="alert">
              {formik.errors.newPassword2}
            </div>
          )}
        </div>
        {formik.errors.isSame && (
          <div className="alert alert-danger login-input" role="alert">
            {formik.errors.isSame}
          </div>
        )}
        {props.auth.error && (
          <div className="alert alert-danger login-input" role="alert">
            Invalid username or password
          </div>
        )}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      <hr />
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { changePassword })(PwChangeForm);
