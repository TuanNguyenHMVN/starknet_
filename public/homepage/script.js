gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(MorphSVGPlugin);

document.addEventListener("DOMContentLoaded", function () {
  const aboutSection = document.querySelector(".about-section");
  const heroLeft = document.querySelector(".hero-left");
  const heroRight = document.querySelector(".hero-right");
  const contactSection = document.querySelector(".contact-section");
  const features = document.querySelectorAll(".feature");
  // const heroImage = document.querySelector('.hero-image');
  const iconStake = document.querySelector('.icon-stake');
  const featuresSection = document.querySelector(".features");
  const businessSteps = document.querySelectorAll(".business-step");
  const faqItems = document.querySelectorAll('.faq-item');
  const symbolIcon = document.querySelector('.symbol-icon');

  // Intersection Observer for various sections
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
    const floatingAnimation = gsap.to(iconStake, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(iconStake, {
      opacity: 0.8,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }

  if (symbolIcon) {
    const floatingAnimation = gsap.to(symbolIcon, {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(symbolIcon, {
      opacity: 0.8,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut",
    });
  }
  // iconStake.addEventListener('mouseenter', () => {
  //   gsap.to(iconStake, {
  //     duration: 0.3,
  //     scale: 1.1,
  //     filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(135, 206, 250, 0.8))',
  //     ease: "power2.out"
  //   });
  // });

  // iconStake.addEventListener('mouseleave', () => {
  //   gsap.to(iconStake, {
  //     duration: 0.3,
  //     scale: 1,
  //     filter: 'brightness(1) drop-shadow(0 0 5px rgba(135, 206, 250, 0.5))',
  //     ease: "power2.out"
  //   });
  // });

  // Hover animations for symbol-icon
  symbolIcon.addEventListener('mouseenter', () => {
    gsap.to(symbolIcon, {
      duration: 0.3,
      scale: 1.1,
      rotation: 15,
      // /filter: 'brightness(1.2) drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))',
      ease: "power2.out"
    });
  });

  symbolIcon.addEventListener('mouseleave', () => {
    gsap.to(symbolIcon, {
      duration: 0.3,
      scale: 1,
      rotation: 0,
      // filter: 'brightness(1))',
      ease: "power2.out"
    });
  });

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
  if (featuresSection && features.length > 0) {
    const featuresObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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
                });
              }
            });
            featuresObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    featuresObserver.observe(featuresSection);
  }

  // Business Steps Animation
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

  // Hero Section Animation
  gsap.from(".hero-left_container > *", {
    opacity: 0,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out",
  });

  gsap.to(".start-button", {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    delay: 1.5,
    ease: "back.out(1.7)",
    onStart: () => {
      gsap.set(".start-button", { opacity: 0, scale: 0.5 });
    },
  });

  // FAQ Functionality
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

  // Icon Stake and Symbol Icon Animation
  // const iconStake = document.querySelector('.icon-stake');


  if (iconStake && symbolIcon) {
    const shimmer = document.createElement('div');
    shimmer.classList.add('shimmer');
    iconStake.parentNode.insertBefore(shimmer, iconStake.nextSibling);

    const particles = [];
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      iconStake.appendChild(particle);
      particles.push(particle);
    }

    let stakeAnimationTimeline;
    let symbolAnimationTimeline;

    const liquidContainer = document.createElement('div');
    liquidContainer.className = 'liquid-container';
    iconStake.appendChild(liquidContainer);

    for (let i = 0; i < 8; i++) {
      const blob = document.createElement('div');
      blob.className = 'liquid-blob';
      liquidContainer.appendChild(blob);
    }

    iconStake.addEventListener('mouseenter', () => {
      console.log('Mouse entered icon-stake');
      liquidContainer.classList.add('active');
    });
    
    iconStake.addEventListener('mouseleave', () => {
      console.log('Mouse left icon-stake');
      liquidContainer.classList.remove('active');
    });

    // iconStake.addEventListener('click', () => {
 
    //   if (stakeAnimationTimeline) {
    //     stakeAnimationTimeline.kill();
    //   }

    //   // Create a new timeline
    //   stakeAnimationTimeline = gsap.timeline({
    //     onComplete: () => {
    //       // Reset everything after the animation completes
    //       gsap.to(iconStake, {
    //         duration: 0.3,
    //         scale: 1,
    //         filter: 'brightness(1) drop-shadow(0 0 10px rgba(135, 206, 250, 0.7)) hue-rotate(0deg)',
    //         rotation: 0,
    //         ease: "power2.out"
    //       });
    //       gsap.set(shimmer, { clearProps: "all" });
    //       particles.forEach((particle) => {
    //         gsap.set(particle, { clearProps: "all" });
    //       });
    //     }
    //   });

    //   // Main icon animation
    //   stakeAnimationTimeline.to(iconStake, {
    //     duration: 0.3,
    //     scale: 1.2,
    //     filter: 'brightness(1.5) drop-shadow(0 0 20px rgba(135, 206, 250, 0.9))',
    //     ease: "power2.out"
    //   });

    //   // Shimmer effect
    //   stakeAnimationTimeline.fromTo(shimmer, 
    //     { x: '-100%', opacity: 0.7 },
    //     { 
    //       x: '100%', 
    //       opacity: 0, 
    //       duration: 1,
    //       ease: "power2.inOut",
    //       repeat: 3,
    //       yoyo: true
    //     },
    //     0
    //   );

    //   // Rotation animation
    //   stakeAnimationTimeline.to(iconStake, {
    //     duration: 2,
    //     rotation: 360,
    //     ease: "power1.inOut"
    //   }, 0);

    //   // Pulsating effect
    //   stakeAnimationTimeline.to(iconStake, {
    //     duration: 0.4,
    //     scale: 1.25,
    //     repeat: 5,
    //     yoyo: true,
    //     ease: "sine.inOut"
    //   }, 0);

    //   // Particle animation
    //   particles.forEach((particle, index) => {
    //     stakeAnimationTimeline.fromTo(particle,
    //       {
    //         x: 0,
    //         y: 0,
    //         scale: 0,
    //         opacity: 1
    //       },
    //       {
    //         duration: 2,
    //         x: (Math.random() - 0.5) * 100,
    //         y: (Math.random() - 0.5) * 100,
    //         scale: Math.random() * 1.5,
    //         opacity: 0,
    //         delay: index * 0.05,
    //       },
    //       0
    //     );
    //   });

      // Color change animation
      // stakeAnimationTimeline.to(iconStake, {
      //   duration: 2,
      //   filter: 'hue-rotate(360deg) brightness(1.5) drop-shadow(0 0 20px rgba(135, 206, 250, 0.9))',
      //   ease: "none"
      // }, 0);

    //   // Set the total duration to 2 seconds
    //   stakeAnimationTimeline.duration(2);
    // });

    symbolIcon.addEventListener('click', () => {
      // Kill any existing animation
      if (symbolAnimationTimeline) {
        symbolAnimationTimeline.kill();
      }

      // Get the positions and sizes of both icons
      const stakeRect = iconStake.getBoundingClientRect();
      const symbolRect = symbolIcon.getBoundingClientRect();

      // Calculate the center point of the icon-stake
      const centerX = stakeRect.left + stakeRect.width / 2;
      const centerY = stakeRect.top + stakeRect.height / 2;

      // Calculate the radius for the circular motion
      const radius = Math.max(stakeRect.width, stakeRect.height) * 0.75;

      // Create a new timeline
      symbolAnimationTimeline = gsap.timeline({
        onComplete: () => {
          // Reset the symbol-icon to its original position and state
          gsap.to(symbolIcon, {
            duration: 0.5,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            // filter: 'brightness(1) drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))',
            ease: "power2.inOut"
          });
        }
      });

      // Circular motion animation
      symbolAnimationTimeline.to(symbolIcon, {
        duration: 2,
        x: (i) => centerX - symbolRect.left - symbolRect.width / 2 + radius * Math.cos(i * Math.PI / 2),
        y: (i) => centerY - symbolRect.top - symbolRect.height / 2 + radius * Math.sin(i * Math.PI / 2),
        rotation: 360,
        scale: 1.2,
        ease: "power1.inOut",
        repeat: 1,
        yoyo: true
      });

      // Add a slight bounce effect at the end
      symbolAnimationTimeline.to(symbolIcon, {
        duration: 0.5,
        scale: 1.1,
        ease: "bounce.out"
      });

      // Set the total duration to 2.5 seconds
      symbolAnimationTimeline.duration(2.5);
    });
  }
  

});
