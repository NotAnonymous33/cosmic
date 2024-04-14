import React from "react";
import "../css/profile.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentData: {} };
  }

  handleClick = () => {
    window.location.href = "http://localhost:5173/cards";
  };
  handleClick2 = () => {
    window.location.href =
      "https://play.unity.com/mg/other/webgl-builds-400388";
  };

  componentDidMount() {
    const studentData = JSON.parse(localStorage.getItem("studentData"));
    if (studentData != null) this.setState({ studentData: studentData });
  }
  render() {
    return (
      <div className="container">
        <h1>Student Profile</h1>
        <div className="profile-card">
          <p>ID: {this.state.studentData.id}</p>
          <p>Name: {this.state.studentData.name}</p>
          <p>Email: {this.state.studentData.username}</p>
          <p>
            Current course:{" "}
            {this.state.studentData.currentCourse
              ? this.state.studentData.currentCourse
              : "-"}
          </p>
          <p>Progress so far: {this.state.studentData.progress}</p>
        </div>
        <button onClick={() => this.handleClick()}>Choose a lesson</button>
        <br />
        <br />
        <button onClick={() => this.handleClick2()}>Learn Solar System</button>
      </div>
    );
  }
}

export default Profile;
