import React from 'react'

export default function NewPassDesc() {


  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/notepadapp-96bda.appspot.com/o/pass1.png?alt=media&token=db50a85e-a618-45ae-8464-770a7bfc240d"
          alt="Register Success"
          style={{ width: "35em" }}
        />
      </div>
      <h1>The Password Was Successfully Changed.</h1>
      <h4>Now you can log in with your new password.</h4>
      <h5>We wish you good studies.</h5>

    </div>
  )
}
