import React from "react";

export default function RegisterDesc() {

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
          src="https://firebasestorage.googleapis.com/v0/b/notepadapp-96bda.appspot.com/o/MailSuccess2.jpg?alt=media&token=bb3057b3-9cae-4ece-834f-f71ec2dceb75"
          alt="Register Success"
          style={{ width: "25em" }}
        />
      </div>
      <h1>The Registration was Successfully Created.</h1>
      <h4>Confirm The EMail We Sent To You For Registration Completion.</h4>
      <h5>Check Your mailbox. Don't Forget to Check Your Spam Box.</h5>
    </div>
  );
}
