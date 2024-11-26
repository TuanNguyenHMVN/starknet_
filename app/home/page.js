"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EmbeddedPage() {
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    };

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, []);

  useEffect(() => {
    const aboutSection = document.querySelector(".about-section");
    const heroLeft = document.querySelector(".hero-left");
    const heroRight = document.querySelector(".hero-right");
    const contactSection = document.querySelector(".contact-section");
    const features = document.querySelectorAll(".feature");
    const iconStake = document.querySelector(".icon-stake");
    const symbolIcon = document.querySelector(".symbol-icon");
    const topLogo = document.querySelector(".logo");
    const footerLogo = document.querySelector(".footer-logo");
    const businessSteps = document.querySelectorAll(".business-step");
    const faqItems = document.querySelectorAll(".faq-item");

    // scroll to the top of the page
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (topLogo) {
      topLogo.addEventListener("click", function (event) {
        event.preventDefault();
        scrollToTop();
      });
    }

    if (footerLogo) {
      footerLogo.addEventListener("click", function (event) {
        event.preventDefault();
        scrollToTop();
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.4 }
    );

    [aboutSection, heroLeft, heroRight].forEach((section) => {
      if (section) observer.observe(section);
    });

    // Hero Image Animations
    if (iconStake) {
      gsap.to(iconStake, {
        y: -20,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (symbolIcon) {
      gsap.to(symbolIcon, {
        y: -20,
        opacity: 0.8,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Hover Animations for iconStake and symbolIcon
    function hoverAnimation(icon, scaleValue, rotationValue) {
      icon.addEventListener("mouseenter", () => {
        gsap.to(icon, {
          scale: scaleValue,
          rotation: rotationValue,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }

    if (iconStake) hoverAnimation(iconStake, 1.1, 0);
    if (symbolIcon) hoverAnimation(symbolIcon, 1.1, 15);

    // Click Animation for iconStake and symbolIcon
    function clickAnimation(icon) {
      icon.addEventListener("click", () => {
        const timeline = gsap.timeline();
        timeline
          .to(icon, { scale: 1.2, duration: 0.3, ease: "power2.out" })
          .to(icon, { rotation: 360, duration: 2, ease: "power1.inOut" })
          .to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
      });
    }

    if (iconStake) clickAnimation(iconStake);
    if (symbolIcon) clickAnimation(symbolIcon);

    // Contact Section Animation
    if (contactSection) {
      gsap.from(contactSection.querySelector("h1"), {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: contactSection,
          start: "top 80%",
        },
      });
    }

    // Features Section Animation
    if (features.length > 0) {
      const featureOrder = ["rewards", "secure", "user-friendly", "receive"];
      featureOrder.forEach((featureName, index) => {
        const feature = Array.from(features).find((item) =>
          item.classList.contains(featureName)
        );
        if (feature) {
          gsap.from(feature, {
            opacity: 0,
            y: 50,
            duration: 1.5,
            delay: index * 0.4,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 80%",
            },
          });
        }
      });
    }
    // Business Section Animation
    if (businessSteps.length > 0) {
      const stepObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(businessSteps).indexOf(entry.target);
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: index * 0.2,
                ease: "power1.out",
              });
              entry.target.classList.add("in-view");
            }
          });
        },
        { threshold: 0.5 }
      );

      businessSteps.forEach((step) => {
        step.style.opacity = "0";
        step.style.transform = "translateY(20px)";
        stepObserver.observe(step);
      });
    }

    // FAQ Section Animation
    faqItems.forEach((item, index) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const plusIcon = item.querySelector(".plus");
      const minusIcon = item.querySelector(".minus");

      question.addEventListener("click", () => {
        answer.style.display =
          answer.style.display === "none" ? "block" : "none";
        plusIcon.style.display =
          plusIcon.style.display === "none" ? "inline" : "none";
        minusIcon.style.display =
          minusIcon.style.display === "inline" ? "none" : "inline";
        question.classList.toggle("active");
      });

      // Initially hide all answers except the first one
      if (index === 0) {
        answer.style.display = "block";
        plusIcon.style.display = "none";
        minusIcon.style.display = "inline";
      } else {
        answer.style.display = "none";
        plusIcon.style.display = "inline";
        minusIcon.style.display = "none";
      }
    });
  }, []);

  return (
    <>
      <>
        <div>
          <section id="home" className="hero-section">
            <div className={`container-lg ${isMobile ? "" : "row w-100"}`}>
              <div className={` hero-left col pe-lg-5 d-flex flex-column justify-content-center align-items-center`}>
                <div className="hero-left_container">
                  <img
                    className="pointer"
                    src="images/pointer-icon.svg"
                    placeholder="pointer-icon"
                  />
                  <p className="para1">Stake Your Starknet Tokens</p>
                  <p className="para2">
                    Earn Rewards,
                    <br />
                    Stay Liquid with
                  </p>
                  <p className="para3">stSTRK</p>
                  <p className="para4">
                    Stake your Starknet tokens, earn rewards, and receive stSTRK
                    tokens, a liquid staking derivative that allows you to
                    remain flexible while securing the network.
                  </p>
                  <button className="start-button">
                    <Link href="/staking">
                      Stake now
                    </Link>
                  </button>
                </div>
              </div>
              <div className={`hero-right col ps-lg-5 d-flex flex-column position-relative justify-content-center ${isMobile ? "align-items-center" : "align-items-end"}`}>
                <img
                  className="icon-stake "
                  src="/images/icon_stake.svg"
                  alt="Stake icon"
                />
                <img
                  className="symbol-icon"
                  src="/images/symbol-icon.svg"
                  alt="Symbol icon"
                />
              </div>
            </div>
          </section>

          <section id="about" className="about-section container">
            <div className="about-content">
              <div className="staking-steps">
                <div className="step">
                  <div className="step-marker">
                    <img
                      src="images/step-marker.svg"
                      alt="step-marker"
                      placeholder="step-marker"
                    />
                  </div>
                  <div className="step-line">
                    <img src="images/line.svg" alt="line" placeholder="line" />
                  </div>
                  <div className="step-content1">
                    <h2>Stake</h2>
                    <p>STRK</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-marker">
                    <img
                      src="images/step-marker.svg"
                      alt="step-marker"
                      placeholder="step-marker"
                    />
                  </div>
                  <div className="step-line">
                    <img src="images/line.svg" alt="line" placeholder="line" />
                  </div>
                  <div className="step-content2">
                    <h2>Receive</h2>
                    <p>stSTRK and get rewards</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-marker">
                    <img
                      src="images/step-marker.svg"
                      alt="step-marker"
                      placeholder="step-marker"
                    />
                  </div>
                  <div className="step-content3">
                    <h2>Use</h2>
                    <p>stSTRK in DeFi</p>
                    <a href="#" className="explore-btn">
                      Explore
                    </a>
                  </div>
                </div>
              </div>
              <div className="staking-info">
                <h1>What is Starknet Staking?</h1>
                <p>
                  Starknet is a cutting-edge layer-2 scaling solution for
                  Ethereum, designed to enhance scalability and reduce
                  transaction costs. When you stake your Starknet tokens on our
                  platform, you not only contribute to the network's security
                  but also receive stSTRK tokens.
                </p>
              </div>
            </div>
          </section>

          <section id="services" className="services-section container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-10 text-center">
                <h2>
                  <span className="highlight">stSTRK</span> is a liquid staking
                  derivative that represents your
                  <span className="highlight">staked assets</span> and allows
                  you to remain flexible, trade, or use them in DeFi while
                  <span className="highlight">still earning</span> staking
                  rewards.
                </h2>
                <img
                  className="services-pointer position-absolute"
                  src="images/pointer-icon.svg"
                  placeholder="pointer-icon"
                />
              </div>
            </div>
          </section>

          <section id="contact" className="contact-section container">
            <div className="row justify-content-center">
              <div className="col-lg-12 col-lg-24">
                <h1
                  className="contact-title"
                  // style={{
                  //   color: "var(--blue, #0F0B46)",
                  //   fontFamily: "DM Sans",
                  //   fontSize: "68px",
                  //   lineHeight: "120%",
                  //   letterSpacing: "-1.36px",
                  // }}
                >
                  Why Stake Your Tokens
                  <br />
                  on Our Platform?
                </h1>
                <div className="features">
                  <div className="feature secure col-md-15">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={80}
                      height={80}
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M37 8.1L11.15 18.75V45C11.15 59.0667 40 72.5 40 72.5C40 72.5 68.85 59.0667 68.85 45V18.75L43 8.1C42.0494 7.70392 41.0298 7.5 40 7.5C38.9702 7.5 37.9506 7.70392 37 8.1Z"
                        stroke="#0F0B46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M50.75 34.5H40V19.6333L29.4833 41.6666H40.2333V56.5333L50.75 34.5Z"
                        stroke="#0F0B46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2>Secure &amp; Trustworthy</h2>
                    <p>
                      Industry-leading security protocols to protect your
                      assets.
                    </p>
                  </div>
                  <div className="feature rewards col-md-15">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={80}
                      height={80}
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M18.8 15V21.3667H7.5V27.6C7.5 38.0333 10.6 43.85 18.05 47.4667C20.8197 48.9558 23.376 50.8114 25.65 52.9833C27.4784 54.9321 29.7073 56.4616 32.1833 57.4667L35 58.3333V65.8833H30.7C25.5 65.8833 23.75 67.0667 23.75 70.5833V72.95H56.25V70.8333C56.25 67.3833 54.1167 65.8333 49.1833 65.8333H45V58.3333L47.8667 57.4833C50.3468 56.4781 52.5768 54.9422 54.4 52.9833C56.7729 50.723 59.4283 48.7791 62.3 47.2C64.5302 46.1268 66.5219 44.6162 68.1567 42.758C69.7915 40.8999 71.0362 38.732 71.8167 36.3833C72.3469 33.4752 72.5925 30.5224 72.55 27.5667V21.3833H61.2V15H18.8ZM40 25.6167L43.4167 32.6833H51.65L45.2 38.6333L47.05 46.2333L40 42.45L32.95 46.2833L34.8 38.6833L28.3333 32.7333H36.5833L40 25.6167ZM13.4333 27.7333H18.7V40.8667C18.15 41.2 16.4333 39.2 15.1833 36.9167C14.4734 35.1686 14.0188 33.3275 13.8333 31.45L13.4333 27.7333ZM61.3 27.7333H67.0333L66.55 31.4C66.4364 34.4523 65.2092 37.3574 63.1 39.5667C62.6031 40.2422 61.9736 40.8094 61.25 41.2333L61.3 27.7333Z"
                        stroke="#0F0B46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2>High Rewards</h2>
                    <p>Competitive staking returns with added flexibility.</p>
                  </div>
                  <div className="feature receive col-md-15">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={80}
                      height={80}
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M16.6667 52.4901V60.0001C16.6667 60.8841 17.0179 61.732 17.643 62.3571C18.2681 62.9822 19.116 63.3334 20 63.3334H60C60.8841 63.3334 61.7319 62.9822 62.357 62.3571C62.9822 61.732 63.3333 60.8841 63.3333 60.0001V52.4901M40.6733 45.0001V16.6667M51.82 37.1667L40.6733 48.0534L29.5267 37.1667"
                        stroke="#0F0B46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h2>Receive stSTRK</h2>
                    <p>
                      Get stSTRK tokens equivalent to your staked Starknet
                      tokens, allowing you to manage and potentially trade your
                      staked position.
                    </p>
                  </div>
                  <div className="feature user-friendly col-md-15">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={80}
                      height={80}
                      viewBox="0 0 80 80"
                      fill="none"
                    >
                      <path
                        d="M51.03 43.745C46.7417 44.7383 46.8217 47.795 49.0733 50.5283L58.12 61.5116C59.745 63.4833 59.4283 65.7233 58.35 66.665L55.1 69.505C53.37 71.0166 51.5217 70.7283 50.1133 69.1633L41.7383 59.855C40.6417 58.6366 38.75 58.8233 37.9083 59.855L30.165 69.345C29.1517 70.5866 27.0383 71.6366 25.1933 69.99L21.1183 66.3566C20.205 65.5416 20.205 63.5566 21.0367 62.56L31.8767 49.56C32.8267 48.4216 33.86 45.3833 30.165 44.4566L20.8733 42.13C18.4233 41.515 17.48 40.7516 17.7767 38.9L18.5917 33.8116C18.885 31.9833 20.3333 30.8816 23.0533 31.53L32.62 33.8116C34.92 34.3616 36.7033 31.6933 34.3467 30.1716C31.3117 28.2133 28.535 24.6883 28.6167 20.6483C28.705 16.2616 31.7033 9.70498 39.8233 9.18165C45.3367 8.82498 51.5483 13.8166 51.52 21.215C51.5033 25.0516 48.8633 27.6483 45.9483 30.1716C44.0283 31.835 45.5983 34.3683 47.925 33.8116L56.75 31.7033C59.5583 31.0316 60.98 31.72 61.3 33.3266L62.1967 37.85C62.64 40.0866 61.1633 41.4 59.7517 41.725L51.03 43.745Z"
                        stroke="#0F0B46"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M36 23.5C37.5 26 42 27 44.5 23.5"
                        stroke="#0F0B46"
                      />
                    </svg>
                    <h2>User-Friendly</h2>
                    <p>Intuitive platform for easy staking and tracking.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="business" className="business-section">
            <div className="business-content container row w-100">
              <div className="col-lg-5 align-items-start left-column">
                <h1>How to Stake</h1>
                <h2>
                  Your Starknet <br /> Tokens and Receive stSTRK?
                </h2>
                <img
                  className="business-pointer"
                  src="images/pointer-icon.svg"
                  placeholder="pointer-icon"
                />
              </div>
              <div className="right-column px-5">
                <div className="business-step">
                  <div className="step-number">Step 1</div>
                  <h2 className="step-title">Connect Your Wallet</h2>
                  <p className="step-description">
                    Link your Starknet wallet to our platform.
                  </p>
                </div>
                <div className="business-step">
                  <div className="step-number">Step 2</div>
                  <h2 className="step-title">Stake STRK</h2>
                  <p className="step-description">
                    Start staking your Starknet tokens with a few simple steps.
                  </p>
                </div>
                <div className="business-step">
                  <div className="step-number">Step 3</div>
                  <h2 className="step-title">Receive stSTRK Tokens</h2>
                  <p className="step-description">
                    Automatically receive stSTRK in your wallet
                  </p>
                </div>
                <div className="business-step">
                  <div className="step-number">Step 4</div>
                  <h2 className="step-title">Earn Rewards</h2>
                  <p className="step-description">
                    Watch your rewards grow over time while holding stSTRK
                    tokens.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="question" className="question-section container-xxl">
            <div className="question-content">
              <h1>Frequently Asked Questions</h1>
              <img
                className="question-pointer"
                src="images/pointer-icon.svg"
                placeholder="pointer-icon"
              />
              <div className="faq-list">
                <div className="faq-item">
                  <div className="faq-question">
                    What Is Starknet Staking?
                    <img
                      className="faq-icon plus"
                      src="images/plus.svg"
                      placeholder="plus"
                    />
                    <img
                      className="faq-icon minus"
                      src="images/minus.svg"
                      placeholder="minus"
                    />
                  </div>
                  <div className="faq-answer">
                    <p>
                      Staking involves locking your Starknet tokens to support
                      network operations, in return for rewards and stSTRK
                      tokens.
                    </p>
                  </div>
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    What Are stSTRK Tokens?
                    <img
                      className="faq-icon plus"
                      src="images/plus.svg"
                      placeholder="plus"
                    />
                    <img
                      className="faq-icon minus"
                      src="images/minus.svg"
                      placeholder="minus"
                    />
                  </div>
                  <div className="faq-answer" />
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    How Are Staking Rewards Calculated?
                    <img
                      className="faq-icon plus"
                      src="images/plus.svg"
                      placeholder="plus"
                    />
                    <img
                      className="faq-icon minus"
                      src="images/minus.svg"
                      placeholder="minus"
                    />
                  </div>
                  <div className="faq-answer" />
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    Is There A Minimum Amount To Stake?
                    <img
                      className="faq-icon plus"
                      src="images/plus.svg"
                      placeholder="plus"
                    />
                    <img
                      className="faq-icon minus"
                      src="images/minus.svg"
                      placeholder="minus"
                    />
                  </div>
                  <div className="faq-answer" />
                </div>
                <div className="faq-item">
                  <div className="faq-question">
                    Can I Unstake My Tokens Anytime?
                    <img
                      className="faq-icon plus"
                      src="images/plus.svg"
                      placeholder="plus"
                    />
                    <img
                      className="faq-icon minus"
                      src="images/minus.svg"
                      placeholder="minus"
                    />
                  </div>
                  <div className="faq-answer" />
                </div>
              </div>
              <div className="btn-action">
                <button className="contact-button">
                  Still Have Questions? Contact Us
                </button>
              </div>
            </div>
          </section>
        </div>
      </>
    </>
  );
}
