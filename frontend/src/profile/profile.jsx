import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { studentData: {} };
  }

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
        <button>Choose a lesson</button>
      </div>
    );
  }
}

export default Profile;
