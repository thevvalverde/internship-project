import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import { PrismaClient } from "@prisma/client"
import { useRouter } from "next/router";

async function handleRegister(values) {
    const checkExistingRegister = await fetch('/api/lookup', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(values)
    });

    // const checkStringified = JSON.stringify(checkExistingRegister);

    const data = await checkExistingRegister.json()

    if(data.found !== 0) {
      alert("This email is already registered")
      return false
    }

    const response = await fetch('/api/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })

    const stringResponse = await response.json()
    return true


}

export default function Register() {

  const router = useRouter();

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 3) {
      errors.password = "Must be longer than 3 digits";
    }

    if (!values.confirm) {
        errors.confirm = "Required";
    } else if( values.confirm != values.password) {
        errors.confirm = "Password and confirmation must match!"
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm: ""
    },
    validate,
    onSubmit: async(values) => {
      const status = await handleRegister(values);
      if(status) {
        router.push("/login")
      }
    },
  });

  return (
    <div
      className="centered"
      style={{
        paddingTop: "50px",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "50%",
          display: "inline-block",
        }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="filled"
          margin="dense"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          helperText={formik.touched.email && formik.errors.email}
        />{" "}
        <TextField
          fullWidth
          id="password"
          type="password"
          name="password"
          label="Password"
          variant="filled"
          margin="dense"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
          helperText={formik.touched.password && formik.errors.password}
        />{" "}
        <TextField
          fullWidth
          id="confirm"
          name="confirm"
          label="Confirm Password"
          variant="filled"
          type="password"
          margin="dense"
          value={formik.values.confirm}
          onChange={formik.handleChange}
          error={formik.touched.confirm && formik.errors.confirm}
          helperText={formik.touched.confirm && formik.errors.confirm}
        />{" "}
        <hr
          style={{
            border: "none",
            margin: "10px",
          }}
        />{" "}
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
          size="large"
          margin="dense"
        >
          Log In{" "}
        </Button>{" "}
      </form>{" "}
    </div>
  );
}
