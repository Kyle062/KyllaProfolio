document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // ===== PROJECT TOGGLE =====
  function toggleProject(element) {
    const isActive = element.classList.contains("is-active");
    document.querySelectorAll(".featured-item").forEach((item) => {
      if (item !== element) {
        item.classList.remove("is-active");
        item.setAttribute("aria-expanded", "false");
      }
    });
    element.classList.toggle("is-active");
    element.setAttribute("aria-expanded", !isActive);
  }
  window.toggleProject = toggleProject;

  document.querySelectorAll(".featured-item").forEach((item) => {
    item.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleProject(this);
      }
    });
  });

  // ===== SUPPORT MODAL WITH GALLERY DATA =====
  const supportData = [
    {
      img: "./images/Displayprojects/assistantS/Task Management Sample(Board View).png",
      title: "Kanban Board Management",
      desc: "Organizing project sprints, tracking progress, and managing workflows efficiently using high-level board layouts.",
    },
    {
      img: "./images/Displayprojects/assistantS/Task Management Sample(List View).png",
      title: "Detailed Task Tracking",
      desc: "Comprehensive list tracking for system requirements, including priority levels, due dates, and status updates.",
    },
    {
      img: "./images/Displayprojects/assistantS/Task Management Sample(Calendar View).png",
      title: "Timeline & Scheduling",
      desc: "Mapping out project milestones and ensuring timely delivery of milestones through calendar-based scheduling.",
    },
    {
      img: "./images/Displayprojects/assistantS/IskolarAid Project System Task Tracker.png",
      title: "IskolarAid System Tracker",
      desc: "Dedicated tracking system for the IskolarAid project, ensuring all database setups and UI tasks are completed on schedule.",
    },
    {
      img: "./images/Displayprojects/assistantS/IT Festival 2026 Planning Tracker.png",
      title: "Event Planning & Coordination",
      desc: "Event planning and logistical coordination tracking for the upcoming IT Festival 2026.",
    },
  ];

  const supportCard = document.getElementById("support-works-trigger");
  const modal = document.getElementById("support-modal");
  const closeBtn = document.querySelector(".close-btn");
  const gallery = document.getElementById("support-gallery");

  // ===== DYNAMIC GALLERY BUILDER WITH FOLDER LOGIC =====
  function buildGallery(data, parentCategory = null) {
    if (!gallery) return;
    gallery.innerHTML = "";

    data.forEach((item) => {
      const card = document.createElement("div");
      card.className = "gallery-card";

      const folderTag =
        item.type === "folder"
          ? `<div style="position:absolute; top:12px; right:12px; background:rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color:#222; padding:6px 12px; border-radius:8px; font-size:12px; font-weight:700; border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 2;">📁 Folder</div>`
          : "";

      card.innerHTML = `
        <div style="position:relative; width: 100%; border-radius: 8px 8px 0 0; overflow: hidden;">
          <img src="${item.img}" alt="${item.title}" loading="lazy" style="display: block; width: 100%; height: 200px; object-fit: cover;" />
          ${folderTag}
        </div>
        <div class="card-desc" style="background: #ffffff; padding: 16px 20px 20px 20px; border-radius: 0 0 12px 12px;">
          <h4 style="color: #1a1a1a !important; font-size: 1.05rem; font-weight: 600; margin: 0 0 6px 0; font-family: 'Poppins', sans-serif;">${item.title}</h4>
          <p style="color: #444444 !important; font-size: 0.9rem; line-height: 1.6; margin: 0; font-family: 'Poppins', sans-serif;">${item.desc}</p>
        </div>
      `;

      card.addEventListener("click", function (e) {
        e.stopPropagation();

        if (item.type === "folder") {
          const modalHeader = modal.querySelector(".modal-header h2");
          const modalDesc = modal.querySelector(".modal-header p");

          const currentParentState = {
            title: modalHeader.textContent,
            desc: modalDesc.textContent,
            data: data,
          };

          updateModalHeader(item.title, item.desc, currentParentState);
          buildGallery(item.subData, currentParentState);
        } else {
          const img = this.querySelector("img");
          openLightbox(img.src, img.alt);
        }
      });
      gallery.appendChild(card);
    });
  }

  // ===== UPDATE MODAL HEADER WITH BACK BUTTON =====
  function updateModalHeader(title, desc, parentCategory = null) {
    const modalHeader = modal.querySelector(".modal-header");
    modalHeader.innerHTML = "";

    if (parentCategory) {
      modalHeader.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; position: relative; margin-bottom: 8px;">
          <div style="
            position: absolute;
            left: 0;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 6px 14px 6px 10px;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            font-family: -apple-system, 'Poppins', sans-serif;
            color: #1a1a1a;
            font-weight: 500;
            font-size: 13px;
            cursor: pointer;
            z-index: 2;
          " 
          onmouseover="this.style.background='rgba(255,255,255,0.9)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.08)'; this.style.transform='scale(1.02)';"
          onmouseout="this.style.background='rgba(255,255,255,0.6)'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.04)'; this.style.transform='scale(1)';">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s ease;">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span>Back</span>
          </div>
          <h2 style="margin: 0; font-size: 2rem; color: #1a1a1a; font-family: 'Playfair Display', serif; text-align: center;">${title}</h2>
        </div>
        <p style="color: #555; font-size: 1rem; margin: 0; text-align: center;">${desc}</p>
      `;

      const backBtn = modalHeader.querySelector(
        'div[style*="cursor: pointer"]',
      );
      if (backBtn) {
        backBtn.addEventListener("click", () => {
          resetModalHeader(parentCategory.title, parentCategory.desc);
          buildGallery(parentCategory.data, null);
        });
      }
    } else {
      modalHeader.innerHTML = `
        <h2 style="margin: 0 0 5px 0; font-size: 2rem; color: #1a1a1a; font-family: 'Playfair Display', serif; text-align: center;">${title}</h2>
        <p style="color: #555; font-size: 1rem; margin: 0; text-align: center;">${desc}</p>
      `;
    }
  }

  // ===== RESET MODAL HEADER =====
  function resetModalHeader(title, desc) {
    const modalHeader = modal.querySelector(".modal-header");
    modalHeader.innerHTML = `
      <h2 style="margin: 0 0 5px 0; font-size: 2rem; color: #1a1a1a; font-family: 'Playfair Display', serif; text-align: center;">${title}</h2>
      <p style="color: #555; font-size: 1rem; margin: 0; text-align: center;">${desc}</p>
    `;
  }

  buildGallery(supportData);

  if (supportCard && modal && closeBtn) {
    supportCard.addEventListener("click", (e) => {
      e.preventDefault();
      const modalHeader = modal.querySelector(".modal-header");
      modalHeader.innerHTML = `
        <h2 style="margin: 0 0 5px 0; font-size: 2rem; color: #1a1a1a; font-family: 'Playfair Display', serif; text-align: center;">Support & Assistant Works</h2>
        <p style="color: #555; font-size: 1rem; margin: 0; text-align: center;">A showcase of my organizational, task management, and administrative support skills.</p>
      `;
      buildGallery(supportData, null);
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
      }
    });
  }

  // ===== CATEGORY MODALS WITH SUB-FOLDERS =====
  const categoryMap = {
    uxui: {
      title: "UX/UI Design Projects",
      desc: "Showcasing user research, wireframing, prototyping, and high-fidelity UI design.",
      data: [
        {
          img: "./images/Displayprojects/UXUI/DesktopUI/Blink.png",
          title: "Blink App Design",
          desc: "Full UX/UI design for a modern desktop application interface.",
        },
        {
          img: "./images/Displayprojects/UXUI/DesktopUI/CtrlAlt.png",
          title: "CtrlAlt UI Design",
          desc: "Clean, structured desktop user interface layout.",
        },
        {
          img: "./images/Displayprojects/UXUI/DesktopUI/DepTrack_Department Management System (1).png",
          title: "DepTrack System UI",
          desc: "Department management system desktop interface.",
        },
        {
          img: "./images/Displayprojects/UXUI/DesktopUI/Hanoi DebtStack_Debt Management System.png",
          title: "Hanoi DebtStack UI",
          desc: "Comprehensive debt management system interface design.",
        },
        {
          img: "./images/Displayprojects/UXUI/mobileUI/KhighTect.png",
          title: "KhighTech Mobile App",
          desc: "Intuitive mobile user interface design and layout for mobile e-commerce app.",
        },
        {
          img: "./images/Displayprojects/UXUI/mobileUI/AgriyaPH.png",
          title: "AgriyaPH Mobile app",
          desc: "Intuitive mobile user interface design and layout for farmers app."
        },
      ],
    },

    assistants: {
      title: "Support & Assistant Works",
      desc: "A showcase of my organizational, task management, and administrative support skills.",
      data: supportData,
    },

    graphic: {
      title: "Graphic Design Projects",
      desc: "Brand identity, print materials, social media graphics, and more.",
      data: [
        {
          type: "folder",
          img: "./images/Displayprojects/GraphicDesign/Brand Foundations/Aromic Logo.jpg",
          title: "Brand Foundations",
          desc: "Logos, brand identity, and typography designs.",
          subData: [
            {
              img: "./images/Displayprojects/GraphicDesign/Brand Foundations/Aromic Logo.jpg",
              title: "Aromic Logo",
              desc: "Primary brand identity logo.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Brand Foundations/Closetly. Logo.png",
              title: "Closely. Logo",
              desc: "Modern app brand design.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Brand Foundations/IIT Department Logo.png",
              title: "IT Department Logo",
              desc: "Official department badge and typography.",
            },
          ],
        },
        {
          type: "folder",
          img: "./images/Displayprojects/GraphicDesign/Event & Promotional/Birthday Banner.jpg",
          title: "Event & Promotional",
          desc: "Banners, event posters, and promotional graphics.",
          subData: [
            {
              img: "./images/Displayprojects/GraphicDesign/Event & Promotional/Birthday Banner.jpg",
              title: "Birthday Banner",
              desc: "Large format promotional banner design.",
            },
          ],
        },
        {
          type: "folder",
          img: "./images/Displayprojects/GraphicDesign/Print Materials/Beron_Calling Card(Front).png",
          title: "Print Materials",
          desc: "Calling cards, brochures, menus, and packaging.",
          subData: [
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/Awakemate Packaging/Packaging Label (5).png",
              title: "Awakemate Packaging",
              desc: "Product box and packaging design.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/Beron_Calling Card(Front).png",
              title: "Boron Calling Card (Front)",
              desc: "Professional business card design.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/Beron_CallingCard(Back).png",
              title: "Boron Calling Card (Back)",
              desc: "Professional business card design.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/Hugo Restaurant Hiring Poster.png",
              title: "Hugo Restaurant Poster",
              desc: "Recruitment and hiring poster.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/JDT Menu Mockup.jpg",
              title: "JDT Menu Mockup",
              desc: "Restaurant menu layout and design.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/LCC Brochure 1.png",
              title: "LCC Brochure (Outside)",
              desc: "Trifold brochure marketing layout.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/LCC Brochure 2.png",
              title: "LCC Brochure (Inside)",
              desc: "Trifold brochure information layout.",
            },
            {
              img: "./images/Displayprojects/GraphicDesign/Print Materials/Movie Poster.jpg",
              title: "Movie Poster",
              desc: "Theatrical poster design and composition.",
            },
          ],
        },
      ],
    },

    frontend: {
      title: "Front-end Development Projects",
      desc: "Responsive websites, interactive components, and clean code.",
      data: [
        {
          img: "./images/Displayprojects/Frontend/website2.png",
          title: "Apple-Inspired eCommerce Site",
          desc: "A clean, minimalist online store inspired by Apple's design philosophy, emphasizing simplicity, premium aesthetics, and intuitive user interaction.",
        },
        {
          img: "./images/Displayprojects/Frontend/website1.png",
          title: "Philippines Tourism Website",
          desc: "A modern tourism website showcasing the Philippines' destinations, culture, and natural beauty through an elegant, Apple inspired user interface.",
        },
        {
          img: "./images/Displayprojects/Frontend/website3.png",
          title: "LUXÉ Designer Bags",
          desc: "A premium fashion eCommerce website designed to showcase luxury handbags with sophisticated layouts, elegant typography, and a refined shopping experience.",
        },
      ],
    },

    others: {
      title: "Other Projects",
      desc: "Creative experiments, passion projects, and miscellaneous work.",
      data: [
        {
          img: "./images/Displayprojects/others/DigitalArt (0).png",
          title: "Digital Art 1",
          desc: "Digital illustration artwork.",
        },
        {
          img: "./images/Displayprojects/others/Digital Art (1).jpg",
          title: "Digital Art 2",
          desc: "Digital illustration artwork.",
        },
        {
          img: "./images/Displayprojects/others/Digital Art (2).jpg",
          title: "Digital Art 3",
          desc: "Digital illustration artwork.",
        },
        {
          img: "./images/Displayprojects/others/Digital Art (3).jpg",
          title: "Digital Art 4",
          desc: "Digital illustration artwork.",
        },
        {
          img: "./images/Displayprojects/others/Digital Art (4).jpg",
          title: "Digital Art 5",
          desc: "Digital illustration artwork.",
        },
      ],
    },
  };

  document.querySelectorAll(".category-card[data-category]").forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const category = card.dataset.category;
      const info = categoryMap[category];
      if (!info) return;

      resetModalHeader(info.title, info.desc);
      buildGallery(info.data, null);

      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    });
  });

  // ===== CERTIFICATES LIGHTBOX =====
  const certificateItems = document.querySelectorAll(".certificate-item");

  certificateItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      const img = this.querySelector(".certificate-img");
      if (img) {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "Certificate";
        openLightbox(src, alt);
      }
    });

    item.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "View certificate full screen");
  });

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  function openLightbox(src, alt) {
    if (!lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "Enlarged view";
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
      if (modal && modal.classList.contains("show")) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto";
      }
    }
  });

  // ===== SMOOTH SCROLL =====
  function smoothScrollTo(target, offset = 100) {
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const ease =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        const navMenu = document.querySelector(".nav-menu");
        const hamburger = document.getElementById("hamburger");
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          hamburger.classList.remove("active");
          hamburger.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        }

        history.pushState(null, null, targetId);
        smoothScrollTo(target, 100);
      }
    });
  });

  // ===== STICKY NAVBAR =====
  const navbar = document.getElementById("navbar");
  const logoDefault = document.querySelector(".logo-default");
  const logoScrolled = document.querySelector(".logo-scrolled");

  if (navbar) {
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        navbar.classList.add("scrolled");
        if (logoDefault) logoDefault.style.display = "none";
        if (logoScrolled) logoScrolled.style.display = "block";
      } else {
        navbar.classList.remove("scrolled");
        if (logoDefault) logoDefault.style.display = "block";
        if (logoScrolled) logoScrolled.style.display = "none";
      }
    });
  }

  // ===== SCROLL SPY =====
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link:not(.nav-cta)");

  function updateActiveLink() {
    let current = "";
    const scrollPosition = window.pageYOffset + 150;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
    if (window.pageYOffset < 200) {
      navLinks.forEach((link) => link.classList.remove("active"));
      const homeLink = document.querySelector('.nav-link[href="#home"]');
      if (homeLink) homeLink.classList.add("active");
    }
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener("load", updateActiveLink);

  // ===== INTERSECTION OBSERVER =====
  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      document.body.style.overflow = isExpanded ? "" : "hidden";
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        hamburger.focus();
      }
    });
  }

  // ===== FORM VALIDATION =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    const fullnameInput = document.getElementById("fullname");
    const emailInput = document.getElementById("email");
    const projectTypeInput = document.getElementById("projecttype");
    const messageInput = document.getElementById("message");
    const submitBtn = document.getElementById("submit-btn");
    const formFeedback = document.getElementById("form-feedback");
    const charCount = document.getElementById("char-count");
    const maxChars = 500;

    messageInput.addEventListener("input", () => {
      const remaining = maxChars - messageInput.value.length;
      charCount.textContent = `${messageInput.value.length}/${maxChars}`;
      charCount.style.color = remaining < 50 ? "#f13d79" : "#666";
      if (remaining < 0) {
        messageInput.value = messageInput.value.substring(0, maxChars);
        charCount.textContent = `${maxChars}/${maxChars}`;
      }
    });

    function validateField(input, errorElement, validationFn, errorMessage) {
      const value = input.value.trim();
      const isValid = validationFn(value);
      if (!isValid && value.length > 0) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        errorElement.textContent = errorMessage;
        errorElement.style.display = "block";
        return false;
      } else if (isValid && value.length > 0) {
        input.classList.remove("invalid");
        input.classList.add("valid");
        errorElement.textContent = "";
        errorElement.style.display = "none";
        return true;
      } else {
        input.classList.remove("invalid", "valid");
        errorElement.textContent = "";
        errorElement.style.display = "none";
        return false;
      }
    }

    const validators = {
      fullname: (v) => v.length >= 2,
      email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      projecttype: (v) => v !== "",
      message: (v) => v.length >= 10 && v.length <= maxChars,
    };

    const errorMessages = {
      fullname: "Please enter your full name (at least 2 characters)",
      email: "Please enter a valid email address",
      projecttype: "Please select a project type",
      message: "Please enter at least 10 characters",
    };

    fullnameInput.addEventListener("input", () =>
      validateField(
        fullnameInput,
        document.getElementById("fullname-error"),
        validators.fullname,
        errorMessages.fullname,
      ),
    );
    emailInput.addEventListener("input", () =>
      validateField(
        emailInput,
        document.getElementById("email-error"),
        validators.email,
        errorMessages.email,
      ),
    );
    projectTypeInput.addEventListener("change", () =>
      validateField(
        projectTypeInput,
        document.getElementById("projecttype-error"),
        validators.projecttype,
        errorMessages.projecttype,
      ),
    );
    messageInput.addEventListener("input", () =>
      validateField(
        messageInput,
        document.getElementById("message-error"),
        validators.message,
        errorMessages.message,
      ),
    );

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const isFullnameValid = validateField(
        fullnameInput,
        document.getElementById("fullname-error"),
        validators.fullname,
        errorMessages.fullname,
      );
      const isEmailValid = validateField(
        emailInput,
        document.getElementById("email-error"),
        validators.email,
        errorMessages.email,
      );
      const isProjectTypeValid = validateField(
        projectTypeInput,
        document.getElementById("projecttype-error"),
        validators.projecttype,
        errorMessages.projecttype,
      );
      const isMessageValid = validateField(
        messageInput,
        document.getElementById("message-error"),
        validators.message,
        errorMessages.message,
      );

      if (
        isFullnameValid &&
        isEmailValid &&
        isProjectTypeValid &&
        isMessageValid
      ) {
        submitBtn.disabled = true;
        submitBtn.querySelector(".btn-text").style.display = "none";
        submitBtn.querySelector(".btn-loader").style.display = "inline-block";
        formFeedback.style.display = "none";

        try {
          const formData = new FormData(contactForm);
          const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
          });
          if (response.ok) {
            formFeedback.textContent =
              "✓ Message sent successfully! I'll get back to you soon.";
            formFeedback.className = "form-feedback success";
            formFeedback.style.display = "block";
            contactForm.reset();
            charCount.textContent = `0/${maxChars}`;
            charCount.style.color = "#666";
            [fullnameInput, emailInput, projectTypeInput, messageInput].forEach(
              (input) => input.classList.remove("valid", "invalid"),
            );
            setTimeout(() => (formFeedback.style.display = "none"), 5000);
          } else {
            throw new Error("Submission failed");
          }
        } catch (error) {
          formFeedback.textContent =
            "⚠ Something went wrong. Please try again or email me directly.";
          formFeedback.className = "form-feedback error";
          formFeedback.style.display = "block";
        } finally {
          submitBtn.disabled = false;
          submitBtn.querySelector(".btn-text").style.display = "inline";
          submitBtn.querySelector(".btn-loader").style.display = "none";
        }
      } else {
        const firstError = document.querySelector(".invalid");
        if (firstError) firstError.focus();
        formFeedback.textContent =
          "⚠ Please fix the errors above before submitting.";
        formFeedback.className = "form-feedback error";
        formFeedback.style.display = "block";
      }
    });
  }
});
