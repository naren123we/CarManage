import { Modal } from "@mantine/core";
import React, { useState } from "react";
import { forgotpassword } from "../../utils/api";
import { toast } from "react-toastify";

const ForgotPassword = ({ open, handleClose }) => {
  const [email, setemail] = useState("");

  async function handlesubmit(e) {
    try {
      if (email !== "") {
        const res = await forgotpassword(email);
        if (res.data.success) {
          toast.success(res.data.message, {
            position: "bottom-right",
          });
        } else {
          toast.error(res.data.message, {
            position: "bottom-right",
          });
        }
        setemail("");
      } else {
        toast.error("Please fill required fields", {
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("something went wrong", {
        position: "top-right",
      });
    }
  }
  return (
    <Modal opened={open} onClose={handleClose} closeOnClickOutside>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="auth_heading">Forgot Password</h1>

        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setemail(e.target.value);
          }}
          className="inp"
        ></input>

        <button
          className="btn"
          style={{ marginTop: "5px" }}
          onClick={() => {
            handlesubmit();
          }}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
