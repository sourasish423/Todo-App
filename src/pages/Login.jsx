import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email.";
    if (!password.trim()) newErrors.password = "Password is required.";
    return newErrors;
  };

  const handleLogin = async() => {
    const newErrors = validate();//checks email,password empty

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;//if there are errors, set the errors state and return early to prevent further processing
    }
    setErrors({});

    try {
      const response = await fetch("https://todo-app-production-7a23.up.railway.app-8834.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });//sends a POST request to the backend with the email and password entered by the user in the login form. 
      // The backend will then validate the credentials and respond accordingly.
      
      const data = await response.json();//parses the JSON response from the backend
      alert(data.message);//displays an alert with the message received from the backend, which indicates whether the login was successful or if there were any issues with the credentials.
      localStorage.setItem("token", data.token);//stores the token received from the backend in the browser's local storage. 
      navigate("/tasks")}//navigates the user to the home page ("/tasks") after a successful login.
      
      
      catch (err) {
    console.log(err);
    alert("Login failed");

  }
}


      
  return (
    
    <div style={styles.body}>
      <div style={styles.card}>
        <div style={styles.cardTitle}>
          <CalendarIcon />
          Login
        </div>

        <label style={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...styles.input,
            ...(focusedField === "email" ? styles.inputFocus : {}),
          }}
        />
        {errors.email && <div style={styles.error}>{errors.email}</div>}

        <label style={styles.label}>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
          style={{
            ...styles.input,
            ...(focusedField === "password" ? styles.inputFocus : {}),
          }}
        />
        {errors.password && <div style={styles.error}>{errors.password}</div>}

        <button
          style={styles.btn}
          onClick={handleLogin}
          onMouseOver={(e) => (e.target.style.background = "#c93b0b")}
          onMouseOut={(e) => (e.target.style.background = "#e8440e")}
        >
          Login
        </button>

        <div style={styles.footer}>
          Don't have an account?{" "}
          <button style={styles.link} onClick={() => navigate("/")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}