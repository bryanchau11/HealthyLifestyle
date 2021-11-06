import React from 'react';

function Users() {
  const [error, setError] = React.useState("")
  const [data, setData] = React.useState({ username: "" })

  let calculate_bmi = (data) => {
    if (data.weight && data.height) {
      let height = data.height
      let weight = data.weight
      let BMI = ((weight) / (height * height)) * 703
      return BMI.toFixed(2)
    }
  }

  React.useState(() => {
    const args = document.getElementById('data').text ? JSON.parse(document.getElementById('data').text) : "";
    setData(args)
    calculate_bmi(args)
  }, [])

  const update = (e) => {
    e.preventDefault()
    let username = document.getElementById("username").value
    let height = document.getElementById("height").value
    let weight = document.getElementById("weight").value
    let password = document.getElementById("password").value
    let bmi = calculate_bmi({ height, weight })
    if (!username) {
      setError("Username cannot be empty.")
      return
    }
    setError("")

    fetch('/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, height, weight, bmi }),
    })
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        calculate_bmi(result)
        alert("Profile Updated Successfully!")
      })
      .catch((err) => {
        console.error('Request failed', err);
        setError(err.message)
      });
  }

  return (
    <div className="container">
      <div className="form-group mt-2 mb-1">
        <h4>Edit Profile</h4>
      </div>
      <div className="col-6">
        <form>
          <div className="form-group mt-1">
            <label><b>Username</b></label>
            <input type="text" className="form-control" id="username" placeholder="Update username" defaultValue={data.current_user} />
          </div>
          <div className="form-group mt-1">
            <label><b>Password</b></label>
            <input type="password" className="form-control" id="password" placeholder="Update Password" />
          </div>
          <div className="form-group mt-1">
            <label><b>Height</b></label>
            <input type="number" className="form-control" id="height" placeholder="Update Height" min="0" defaultValue={data.height} />
            <small className="form-text text-muted">Height in inches</small>
          </div>
          <div className="form-group mt-1">
            <label><b>Weight</b></label>
            <input type="number" className="form-control" id="weight" placeholder="Update Weight" min="0" defaultValue={data.weight} />
            <small className="form-text text-muted">Weight in pounds</small>
          </div>
          <div className="form-group mt-1">
            <label><b>Calculated BMI{" : "}</b></label>
            <label>{data.bmi ? data.bmi : "N/A"}</label>

          </div>
          <div className="form-group mt-1">
            <small className="form-text text-danger">{error}</small>
          </div>
          <button type="button" className="btn btn-primary mt-1" onClick={(e) => update(e)}>Update</button>
        </form>
      </div>
    </div>

  );
}

export default Users;


