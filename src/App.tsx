import styles from "./app.module.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import emailjs from "@emailjs/browser";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}
function App() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit = (data: IFormInput) => {
    setLoading(true);

    const templateParams = {
      ...data,
    };

    emailjs
      .send(
        "service_1vhi537",
        "template_qs388il",
        templateParams,
        "kwLXJUJlDJjrxJd5e"
      )
      .then(() => {
        reset();
        setLoading(false);
        alert("One of our agents will contact you soon!");
      });
  };

  return (
    <div className={styles.contact_form}>
      <h1>Contact Form</h1>
      <p>Our friendly team would love to hear from you.</p>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.group}>
          <div className={styles.input_group}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              {...register("firstName", { required: true })}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              {...register("lastName", { required: true })}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <span className={styles.error}>This field is required</span>
            )}
          </div>
        </div>
        <div className={styles.input_group}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="+2348123456789"
          />
          {errors.phone && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="message">Message</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Leave us a message..."
          />
          {errors.message && (
            <span className={styles.error}>This field is required</span>
          )}
        </div>

        <button disabled={loading} className={styles.button} type="submit">
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default App;
