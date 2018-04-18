import * as React from "react";
import { createSession, clearSessionCookies } from "../../helpers";

import "./Login.css";

// --- Types
export interface LoginProps {
  targetUrl: string;
}

type FormEvent = React.FormEvent<HTMLFormElement>;

// --- Mock Functions
function centralLogin(username: string, password: string): Promise<Object> {
  return Promise.resolve({ foo: "bar" });
}

function centralLogout(): Promise<Object> {
  return Promise.resolve({ foo: "bar" });
}

// --- Login Component
class Login extends React.Component<LoginProps, {}> {
  constructor(props: LoginProps) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  // TODO: Add proper error handling!
  handleSubmit(event: FormEvent) {
    event.preventDefault();
    const formValue = event.target as HTMLFormElement;

    const username: HTMLInputElement = formValue
      .elements[0] as HTMLInputElement;
    const password: HTMLInputElement = formValue
      .elements[1] as HTMLInputElement;

    return centralLogin(username.value, password.value)
      .then(apiResponse => {
        console.info("Login Response: ", apiResponse);
        createSession(apiResponse);
      })
      .catch(err => console.error("Error When Attempting to Login: ", err));
  }

  logOut() {
    centralLogout()
      .then(() => clearSessionCookies())
      .catch(err => console.error("Error During Logout: ", err));
  }

  render() {
    return (
      <div id="login-form">
        <h3>Please Enter Your Credentials:</h3>

        <form onSubmit={(event: FormEvent) => this.handleSubmit(event)}>
          <div className="form-field">
            <label htmlFor="username">Email</label>
            <input type="text" name="username" maxLength={40} />
            <ul id="username-error" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              pattern=".{8,}"
              title="Must be at least 8 characters"
            />
            <ul id="password-error" />
          </div>

          <div id="submit-container">
            <input type="submit" defaultValue="Login" />
          </div>
        </form>
        <button onClick={() => this.logOut()}>Logout</button>
      </div>
    );
  }
}

export default Login;
