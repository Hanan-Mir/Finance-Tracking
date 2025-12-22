import { useGSAP } from "@gsap/react";
import ContactCard from "./Cards/ContactCard";
import Footer from "./Cards/Footer";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { enableKeyboardScrollSupport } from "../../HelperFunctions/gsapAnimations";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import SubmittingCard from "./Cards/SubmittingCard";

function About() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
   
    const paragraphSplit = new SplitText(".sub-content > h1 span", {
      type: "lines",
    });
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.1,
    });
    gsap.from(".heading > img", {
      opacity: 0,
      xPercent: 100,
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.from(".business-heading", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
    });
    gsap.from(".business-description p:first-of-type", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".heading",
        start: "bottom 90%",
      },
    });
    gsap.from(".right-column img", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      stagger: 0.4,
      ease: "power1.inOut",
    });
    gsap.from(".business-description p:nth-of-type(2)", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".business-description > p",
        start: "bottom 80%",
      },
    });
    gsap.from(".right-section h1:first-of-type", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".outing-section",
        start: "top 80%",
      },
    });

    gsap.from(".right-section p", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".outing-section",
        start: "top 70%",
      },
    });
    gsap.from(".outing-section img:last-of-type", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",

      scrollTrigger: {
        trigger: ".outing-section",
        start: "top 70%",
      },
    });
    gsap.from(".contact-heading h1", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",

      scrollTrigger: {
        trigger: ".contact-team",
        start: "top 70%",
      },
    });
    gsap.from(".contact-heading p", {
      opacity: 0,
      yPercent: 100,
      duration: 1,
      ease: "power1.inOut",

      scrollTrigger: {
        trigger: ".contact-team",
        start: "top 73%",
      },
    });
    gsap.from(".contact-card", {
      opacity: 0,
      xPercent: -100,
      duration: 1,
      ease: "power1.inOut",
      stagger: 0.5,

      scrollTrigger: {
        trigger: ".contact-team",
        start: "top 73%",
      },
    });
 
  }, []);
  //setting up emailjs for the form
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_message: "",
  });
  const navigation=useNavigation();
  const actionData=useActionData();
  
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  useEffect(()=>{
if(actionData?.success ){
 toast.success(`${actionData.message}`, {
position: "bottom-right",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
setFormData({user_email:'',user_name:'',user_message:""})
}else if(actionData?.success===false){
 toast.error(`${actionData.message}`, {
position: "bottom-right",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
}
  },[actionData])
  
  return (
    <section id="about">
      <ToastContainer />
      <div className="content">
        <div className="sub-content">
          <h1>
            <span>FinTrack helps hundreds of</span>
            <span> </span>
            <span>people worldwide to get their business into shape.</span>
          </h1>
        </div>
        <div className="column-layout">
          <div className="left-column">
            <div className="heading">
              <img
                src="/images/bg-right.svg"
                alt=""
                className="absolute md:-top-130 md:-right-20 z-5 about-right-img "
              />
              <h1 className="business-heading">
                In FinTrack, we all come to work every day{" "}
                <span>
                  {" "}
                  to enable people make smart decisions about their business
                  every day{" "}
                </span>
                .
              </h1>

              <div className="mt-5 business-description">
                <p className="text-[#344554] leading-relaxed text-[1.2rem]">
                  We believe that managing business should be as effortless as
                  shopping online. It should be done anytime, anywhere and in
                  few clicks.
                </p>
                <p className="text-[#344554] mt-4 leading-relaxed text-[1.2rem]">
                  What started as a simple expense tracker for a small group of
                  people has grown into personal finance app that brings beauty
                  to finance of hundreds of thousands users from almost every
                  country in the world.
                </p>
              </div>
            </div>
          </div>
          <div className="right-column">
            <img
              src="/images/officegames.png"
              alt=""
              className="w-[80%] z-40 absolute md:-top-20 md:-right-2"
            />
            <img
              src="/images/office-people.png"
              alt=""
              className="w-[55%] h-[40%] z-50 absolute md:top-50 md:left-6"
            />
          </div>
        </div>
      </div>
      <div className="outing-section">
        <div className="left-section">
          <img src="/images/bg-right.svg" alt="" className="right-img z-120" />
          <img src="/images/bg-left.svg" alt="" className="left-img" />
          <img src="/images/outing.png" alt="" className="relative z-100" />
        </div>
        <div className="right-section">
          <div className="mt-5">
            <h1 className="text-4xl text-[#344554]">
              We want to make your{" "}
              <span className="font-bold"> financial life stress-free. </span>
            </h1>
            <p className="text-[#344554] leading-relaxed text-[1.2rem] mt-5">
              FinTrack helps you to get your finances into the shape so that you
              don't need to stress about every dollar that you spend. If you
              know how much and what on you spend, it is easier to change your
              financial habits, if you feel like that's what you need.
            </p>
            <p className="text-[#344554] mt-4 leading-relaxed text-[1.2rem]">
              Having a complete picture of your finances in one place, make them
              easier to manage. Our mission here is to help you leave your
              financial ghosts behind, overcome your financial fears and treat
              yourself with financial wisdom instead.
            </p>
          </div>
        </div>
      </div>
      <div className="contact-team">
        <div className="contact-heading">
          <h1>Meet the Team</h1>
          <p>
            “We have the experience, the skill and the will to make things
            happen.”
          </p>
        </div>
        <div className="contact-card">
          <ContactCard
            imgPath="/images/hanan.gif"
            name="Mir Hanan"
            position="CEO & Co Founder"
            gitLink="https://github.com/Hanan-Mir"
            xLink="https://x.com/Arbaez55676"
          />
          <ContactCard
            imgPath="/images/Rahil.png"
            name="Rahil Shah"
            position="CTO & Co Worker"
            gitLink="/"
            xLink="/"
          />
        </div>
      </div>
      <div className="contact-form">
      
      <h1 className="text-[#344554] mb-4">Get in touch with us</h1>
        <div className="c-form">
          {/* <SubmittingCard /> */}
       {navigation.state==='submitting'?<SubmittingCard />   :<Form method="post">
            <div className="flex md:flex-col mt-3 text-[#344554] ">
              <label for="name" className="ml-4 text-[#344554] ">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                className="mt-2 shadow-form px-4 py-4 rounded-full text-[#344554] "
                placeholder="Your name"
              />
            </div>
            <div className="flex md:flex-col mt-3 text-[#344554] ">
              <label for="email" className="ml-4 text-[#344554] ">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
                className="mt-2 shadow-form px-4 py-4 rounded-full text-[#344554] "
                placeholder="Your email address"
              />
            </div>
            <div className="flex md:flex-col mt-3">
              <label for="message" className="ml-4 text-[#344554] ">
                Message
              </label>
              <textarea
                id="message"
                rows="10"
                cols="20"
                type="textarea"
                required
                name="user_message"
                value={formData.user_message}
                onChange={handleChange}
                className="mt-2 resize-none shadow-form px-4 py-4 rounded-xl text-[#344554] "
                placeholder="Your message"
              />
            </div>
            <div className="w-full flex md:justify-center mt-3">
              <button type="submit" className="md:px-12 rounded-full md:py-4 bg-[#12C48B] text-white hover:cursor-pointer shadow-box">
                Send Message
              </button>
            </div>
          </Form>}
        </div>
      
        
      </div>
      <div className="w-full absolute md:top-[420vh] flex md:justify-center">
        <Footer />
      </div>
    </section>
  );
}

export default About;
