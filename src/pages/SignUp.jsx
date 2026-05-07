import { useState } from "react";

const styles = {
  body: {
    background: "#f5a623",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "24px 16px",
  },
  card: {
    background: "#fff",
    borderRadius: "18px",
    padding: "36px 32px",
    width: "100%",
    maxWidth: "380px",
    boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  label: {
    display: "block",
    fontSize: "13px",
    color: "#888",
    marginBottom: "5px",
    marginTop: "14px",
  },
  input: {
    width: "100%",
    padding: "10px 14px",
    border: "none",
    borderRadius: "30px",
    background: "#f2f2f2",
    fontSize: "15px",
    color: "#333",
    outline: "none",
    boxSizing: "border-box",
  },
  inputFocus: {
    background: "#ebebeb",
  },
  btn: {
    width: "100%",
    padding: "12px",
    marginTop: "22px",
    background: "#e8440e",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  footer: {
    textAlign: "center",
    marginTop: "18px",
    fontSize: "13px",
    color: "#999",
  },
  link: {
    color: "#e8440e",
    fontWeight: "600",
    textDecoration: "none",
    cursor: "pointer",
    background: "none",
    border: "none",
    fontSize: "13px",
    fontFamily: "inherit",
    padding: 0,
  },
  error: {
    color: "#e8440e",
    fontSize: "12px",
    marginTop: "6px",
    paddingLeft: "8px",
  },
};

const CalendarIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
    stroke="#e8440e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

export default function Signup({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter a valid email.";
    if (!form.password.trim()) newErrors.password = "Password is required.";
    else if (form.password.length < 6) newErrors.password = "Minimum 6 characters.";
    return newErrors;
  };

  const handleSignup = async() => {
    const newErrors = validate();//it checks any empty fields or invalid email format and returns an object with error messages for each field if there are any validation issues. If there are no errors, it returns an empty object.
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }//if error object is not empty, it means there is error
    setErrors({});
   
    try {

    const res = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password
      })
    });//sending a post req to backend for storing the user data in the db and getting the response from the backend

    const data = await res.json();

    alert(data.message);

    if (res.ok) {
      onSwitchToLogin();
    }
  }//if the response is successful, it shows a success message and switches to the login page. If there is an error during the fetch request, it catches the error and shows an alert with "Signup failed".

    catch (err) {
    console.log(err);
    alert("Signup failed");
  }
  }//otherwise failed signup

  

  return (
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          <CalendarIcon />
          Sign Up
        </div>

        {[
          { id: "name", label: "Full Name", type: "text", placeholder: "Enter your full name" },
          { id: "email", label: "Email", type: "email", placeholder: "Enter your email" },
          { id: "password", label: "Password", type: "password", placeholder: "Create a password" },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <label style={styles.label}>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              value={form[id]}
              onChange={update(id)}
              onFocus={() => setFocusedField(id)}
              onBlur={() => setFocusedField(null)}
              style={inputStyle(id)}
            />
            {errors[id] && <div style={styles.error}>{errors[id]}</div>}
          </div>
        ))}

        <button
          style={styles.btn}
          onClick={handleSignup}
          onMouseOver={(e) => (e.target.style.background = "#c93b0b")}
          onMouseOut={(e) => (e.target.style.background = "#e8440e")}
        >
          Create Account
        </button>

        <div style={styles.footer}>
          Already have an account?{" "}
          <button style={styles.link} onClick={onSwitchToLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}