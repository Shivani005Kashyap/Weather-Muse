import React, { useState } from "react";
import "./styles/Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add logic to send the form data (API, EmailJS, etc.)
    console.log("Form submitted:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="contact-container">
      <h1>Contact WeatherMuse</h1>

      <p>
        Have a question, suggestion, or feedback? We'd love to hear from you.
        Fill out the form below and our team will get back to you as soon as
        possible.
      </p>

      {submitted ? (
        <div className="thank-you-message">
          <h2>Thank You for Contacting Us!</h2>
          <p>
            Your message has been successfully submitted. We appreciate your
            feedback and will respond as soon as possible.
          </p>
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              placeholder="Tell us how we can help you..."
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}