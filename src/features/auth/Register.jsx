// src/features/auth/Register.jsx
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    address: '',
    role: 'USER', // default role (must match your Role enum)
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/api/user/register', form);
      alert('Registered successfully!');
      console.log(response.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={form.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
      </select>

      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
