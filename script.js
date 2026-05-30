const projectDetails = {
    placement: {
        title: "College Placement Website",
        summary:
            "A full-stack campus placement platform for student profiles, recruiter access, company listings, resume uploads, job applications, and real-time application tracking.",
        stack: ["React", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript"],
        points: [
            "Built secure role-based access for students, recruiters, and placement officers.",
            "Centralized resume management, application records, and placement workflow data in MongoDB.",
            "Designed dashboard views to help placement teams track students, companies, and application status."
        ]
    },
    sparkly: {
        title: "Sparkly Data",
        summary:
            "An end-to-end data analytics platform for dataset upload, preprocessing, statistical analysis, and interactive visualization dashboards.",
        stack: ["MERN Stack", "Chart.js", "D3.js", "Power BI", "Tableau"],
        points: [
            "Created a workflow for uploading, cleaning, and preparing datasets for analysis.",
            "Integrated chart-driven storytelling with Chart.js and D3.js for interactive frontend visuals.",
            "Used Power BI and Tableau concepts to support richer dashboard and reporting outcomes."
        ]
    }
};

const qs = (selector, parent = document) => parent.querySelector(selector);
const qsa = (selector, parent = document) => [...parent.querySelectorAll(selector)];

function initLoader() {
    const loader = qs(".loading-screen");
    const hide = () => loader?.classList.add("hidden");
    if (document.readyState === "complete") {
        setTimeout(hide, 350);
    } else {
        window.addEventListener("load", () => setTimeout(hide, 350));
    }
    setTimeout(hide, 1200);
}

function initTheme() {
    const toggle = qs("#themeToggle");
    const icon = toggle?.querySelector("i");
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (e) {
        console.warn("localStorage is not accessible:", e);
    }

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        icon?.classList.replace("fa-moon", "fa-sun");
    }

    toggle?.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        try {
            localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        } catch (e) {
            console.warn("localStorage is not accessible:", e);
        }
        icon?.classList.toggle("fa-moon", !isLight);
        icon?.classList.toggle("fa-sun", isLight);
    });
}

function initNavigation() {
    const navbar = qs("#navbar");
    const hamburger = qs("#hamburger");
    const navMenu = qs("#navMenu");
    const navLinks = qsa(".nav-link");

    const syncNavbar = () => {
        navbar?.classList.toggle("scrolled", window.scrollY > 16);
    };

    window.addEventListener("scroll", syncNavbar);
    syncNavbar();

    hamburger?.addEventListener("click", () => {
        const isOpen = navMenu?.classList.toggle("active");
        hamburger.classList.toggle("active", Boolean(isOpen));
        hamburger.setAttribute("aria-expanded", String(Boolean(isOpen)));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            navMenu?.classList.remove("active");
            hamburger?.classList.remove("active");
            hamburger?.setAttribute("aria-expanded", "false");
        });
    });

    const sections = navLinks
        .map((link) => qs(link.getAttribute("href")))
        .filter(Boolean);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((link) => {
                    link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = qs(".cursor");
    const follower = qs(".cursor-follower");
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    });

    const animate = () => {
        followerX += (mouseX - followerX) * 0.18;
        followerY += (mouseY - followerY) * 0.18;
        follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
    };
    animate();

    qsa("a, button, input, textarea").forEach((element) => {
        element.addEventListener("mouseenter", () => follower.classList.add("hover"));
        element.addEventListener("mouseleave", () => follower.classList.remove("hover"));
    });
}

function initParticles() {
    const particles = qs("#particles");
    if (!particles) return;

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 42; i += 1) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.bottom = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${8 + Math.random() * 8}s`;
        fragment.appendChild(particle);
    }
    particles.appendChild(fragment);
}

function initCounters() {
    const counters = qsa(".stat-number");
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const counter = entry.target;
                const target = Number(counter.dataset.target || "0");
                const duration = 1200;
                const start = performance.now();

                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    counter.textContent = Math.floor(progress * target);
                    if (progress < 1) requestAnimationFrame(tick);
                    else counter.textContent = `${target}${target > 1 ? "+" : ""}`;
                };

                requestAnimationFrame(tick);
                obs.unobserve(counter);
            });
        },
        { threshold: 0.45 }
    );

    counters.forEach((counter) => observer.observe(counter));
}

function initSkillBars() {
    const bars = qsa(".skill-progress");
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("animate");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.5 }
    );

    bars.forEach((bar) => observer.observe(bar));
}

function initReveal() {
    const revealTargets = qsa(
        ".section-header, .about-text, .stat-card, .service-card, .skill-category, .project-card, .timeline-item, .achievement-card, .resume-card, .contact-item, .contact-form"
    );

    revealTargets.forEach((target) => target.classList.add("reveal"));

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    revealTargets.forEach((target) => observer.observe(target));
}

function initProjectFilters() {
    const buttons = qsa(".filter-btn");
    const cards = qsa(".project-card");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            buttons.forEach((item) => item.classList.toggle("active", item === button));

            cards.forEach((card) => {
                const categories = card.dataset.category?.split(" ") || [];
                const shouldShow = filter === "all" || categories.includes(filter);
                card.classList.toggle("hide", !shouldShow);
            });
        });
    });
}

function initProjectModal() {
    const modal = qs("#projectModal");
    const modalBody = qs("#modalBody");
    const closeButton = qs("#modalClose");

    const closeModal = () => {
        modal?.classList.remove("active");
        modal?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    qsa(".btn-view-project").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projectDetails[button.dataset.project];
            if (!project || !modal || !modalBody) return;

            modalBody.innerHTML = `
                <h3 id="modalTitle">${project.title}</h3>
                <p>${project.summary}</p>
                <div class="modal-tags">
                    ${project.stack.map((item) => `<span class="tag">${item}</span>`).join("")}
                </div>
                <ul>
                    ${project.points.map((point) => `<li>${point}</li>`).join("")}
                </ul>
            `;

            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });
    });

    closeButton?.addEventListener("click", closeModal);
    qs(".modal-overlay")?.addEventListener("click", closeModal);
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });
}

function initContactForm() {
    const form = qs("#contactForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const subject = String(formData.get("subject") || "Portfolio Contact").trim();
        const message = String(formData.get("message") || "").trim();

        const body = [
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            message
        ].join("\n");

        window.location.href = `mailto:poovarasanpoovi20@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}

function init() {
    initLoader();
    initTheme();
    initNavigation();
    initCursor();
    initParticles();
    initCounters();
    initSkillBars();
    initReveal();
    initProjectFilters();
    initProjectModal();
    initContactForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
