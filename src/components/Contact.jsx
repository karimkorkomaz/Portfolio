'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "./hoc";
import { slideIn } from "../utils/motion";
import { toast } from "react-hot-toast";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log('Service ID: ', process.env.MAIL_PASS);
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all the fields.");
      return;
    }
    setLoading(true);
    try {
    emailjs
      .send(
        process.env.SERVICE_ID,
        process.env.TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Karim Korkomaz",
          from_email: form.email,
          to_email: "karim.korkomaz003@gmail.com",
          message: form.message,
        },
        process.env.PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          toast.success("Thanks for reaching out. I'll get back to you soon.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error('FAILED...', error);

          toast.error("Oops! Something went wrong. Please try again.");
        }
        
      );
    } catch (error) {
      setLoading(false);
      console.error('FAILED...', error);
      toast.error("Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 bg-opacity-80 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Phone Number</span>
            <p>+961 76738420</p>
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>E-Mail</span>
           <p>Karim.korkomaz003@gmail.com</p>
          </label>
        
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
