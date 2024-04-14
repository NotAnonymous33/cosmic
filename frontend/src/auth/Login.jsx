import React from "react";
import Button from "react-bootstrap/Button";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  passwordToggle = () => {
    if (this.state.toggleType === "password")
      this.setState({
        toggleType: "text",
      });
    if (this.state.toggleType === "text")
      this.setState({
        toggleType: "password",
      });
  };

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
  };
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = () => {
    if (!this.state.username || !this.state.password)
      toast.warning("Please fill the fields!");
    else {
      axios
        .post("http://localhost:9191/auth/student_login", {
          username: this.state.username,
          password: this.state.password,
        })
        .then((result) => {
          toast.success("Successful login!");
          console.log(result);
          localStorage.setItem("token", JSON.stringify(result.data.token));
        })
        .catch((error) => {
          toast.error("Something went wrong! Please try again.");
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
        <h2>Login</h2>
        <div className="loginBox">
          <TextField
            placeholder="Enter username/email..."
            value={this.state.username}
            onChange={(event) => this.onChangeUsername(event)}
            style={{
              color: "black",
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: "transparent",
            }}
          />
          <TextField
            placeholder="Enter password"
            value={this.state.password}
            type={this.state.toggleType}
            onChange={(event) => this.onChangePassword(event)}
            style={{
              color: "black",
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: "transparent",
            }}
          />
        </div>
        <Button onClick={() => this.handleSubmit()}>Login</Button>
      </div>
    );
  }
}

export default Login;
