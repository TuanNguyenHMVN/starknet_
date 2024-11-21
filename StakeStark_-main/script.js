gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");
  const contactSection = document.querySelector(".contact-section");
  const features = document.querySelectorAll(".feature");
  const iconStake = document.querySelector('.icon-stake');
  const symbolIcon = document.querySelector('.symbol-icon');
  const topLogo = document.querySelector(".logo");
  const footerLogo = document.querySelector(".footer-logo");
  const businessSteps = document.querySelectorAll(".business-step");
  const faqItems = document.querySelectorAll(".faq-item");
  const homeLink = document.querySelector('.nav-links a[href="/StakeStark_-main"]');
  
    // scroll to the top of the page
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
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

    if (window.location.pathname === '/StakeStark_-main/') {
      homeLink.classList.add('current-page');
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

  [aboutSection, heroLeft, heroRight].forEach(section => {
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
      ease: "sine.inOut"
    });
  }

  if (symbolIcon) {
    gsap.to(symbolIcon, {
      y: -20,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }

  // Hover Animations for iconStake and symbolIcon
  function hoverAnimation(icon, scaleValue, rotationValue) {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: scaleValue,
        rotation: rotationValue,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  }

  if (iconStake) hoverAnimation(iconStake, 1.1, 0);
  if (symbolIcon) hoverAnimation(symbolIcon, 1.1, 15);

  // Click Animation for iconStake and symbolIcon
  function clickAnimation(icon) {
    icon.addEventListener('click', () => {
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
      const feature = Array.from(features).find(item => item.classList.contains(featureName));
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
          }
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
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const plusIcon = item.querySelector('.plus');
    const minusIcon = item.querySelector('.minus');

    question.addEventListener('click', () => {
      answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
      plusIcon.style.display = plusIcon.style.display === 'none' ? 'inline' : 'none';
      minusIcon.style.display = minusIcon.style.display === 'inline' ? 'none' : 'inline';
      question.classList.toggle('active');
    });

    // Initially hide all answers except the first one
    if (index === 0) {
      answer.style.display = 'block';
      plusIcon.style.display = 'none';
      minusIcon.style.display = 'inline';
    } else {
      answer.style.display = 'none';
      plusIcon.style.display = 'inline';
      minusIcon.style.display = 'none';
    }
  });
});
