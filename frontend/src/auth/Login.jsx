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
          localStorage.setItem("token", result.data.token);
          localStorage.setItem(
            "studentData",
            JSON.stringify(result.data.student)
          );
          window.location.href = "http://localhost:5173/profile";
        })
        .catch((error) => {
          toast.error("Something went wrong! Please try again.");
          console.log(error);
        });
    }
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          background:
            "url(https://www.transparenttextures.com/patterns/stardust.png), linear-gradient(to right, #41295a, #2F0743)",
          backgroundSize: "cover",
        }}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          theme="dark"
        />
        <div
          className="loginBox"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.7)",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2 style={{ color: "white" }}>Login</h2>
          <br />
          <TextField
            placeholder="Enter username/email..."
            value={this.state.username}
            onChange={(event) => this.onChangeUsername(event)}
            style={{
              color: "white",
              backgroundColor: "rgba(30, 30, 30, 0.8)",
              borderStyle: "none",
              borderRadius: "5px",
              marginBottom: "10px",
              width: "250px",
              padding: "10px",
              boxShadow: "0 0 5px 1px rgba(252,70,107,1)",
            }}
            InputProps={{
              // <-- This values are for the input (inside the TextField component)
              disableUnderline: true, // <-- This removes the underline
              style: {
                color: "white",
                fontFamily: "Arial",
                fontSize: "16px",
              },
            }}
          />

          <TextField
            placeholder="Enter password"
            value={this.state.password}
            type={this.state.toggleType}
            onChange={(event) => this.onChangePassword(event)}
            style={{
              color: "white",
              backgroundColor: "rgba(30, 30, 30, 0.8)",
              borderStyle: "none",
              borderRadius: "5px",
              width: "250px",
              padding: "10px",
              boxShadow: "0 0 5px 1px rgba(252,70,107,1)",
            }}
            InputProps={{
              // <-- This values are for the input (inside the TextField component)
              disableUnderline: true, // <-- This removes the underline
              style: {
                color: "white",
                fontFamily: "Arial",
                fontSize: "16px",
              },
            }}
          />
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "rgba(63,94,251,1)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(252,70,107,1)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(63,94,251,1)";
            }}
            onClick={() => this.handleSubmit()}
          >
            Login
          </Button>
          <Button
            style={{
              marginTop: "10px",
              backgroundColor: "rgba(63,94,251,1)",
              border: "none",
              borderRadius: "5px",
              color: "white",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "rgba(252,70,107,1)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "rgba(63,94,251,1)";
            }}
            onClick={() =>
              (window.location.href = "http://localhost:5173/register")
            }
          >
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default Login;
