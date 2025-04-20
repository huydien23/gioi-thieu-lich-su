document.addEventListener("DOMContentLoaded", function () {
  // Điều hướng cố định
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar.offsetHeight;
  const hero = document.querySelector(".hero");
  const heroHeight = hero.offsetHeight;

  window.addEventListener("scroll", function () {
    if (window.scrollY > heroHeight - navbarHeight) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });

  // Chuyển đổi Menu trên thiết bị di động
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");

    // Chuyển đổi biểu tượng giữa thanh và dấu X
    const icon = this.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Đóng menu di động khi nhấp vào liên kết
  const menuLinks = document.querySelectorAll(".nav-links a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      }
    });
  });

  // Cuộn mượt cho tất cả các liên kết neo
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - navbarHeight;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Phát hiện ngày lễ tự động
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Tháng trong JavaScript được đánh số từ 0

  // Kiểm tra xem có phải là ngày 30/4 hoặc 2/9 không
  if (month === 4 && day === 30) {
    celebrateHoliday("april30");
  } else if (month === 9 && day === 2) {
    celebrateHoliday("sept2");
  }

  function celebrateHoliday(holidayId) {
    // Thêm biểu ngữ kỷ niệm đặc biệt
    const banner = document.createElement("div");
    banner.className = "celebration-banner";

    let message = "";
    if (holidayId === "april30") {
      message =
        "Chào mừng kỷ niệm 50 năm ngày Giải phóng miền Nam, thống nhất đất nước (30/4/1975 - 30/4/2025)";
    } else {
      message =
        "Chào mừng kỷ niệm 80 năm ngày Quốc khánh nước Cộng hòa Xã hội chủ nghĩa Việt Nam (2/9/1945 - 2/9/2025)";
    }

    banner.innerHTML = `<div class="container"><p>${message}</p><span class="close-banner">&times;</span></div>`;
    document.body.insertBefore(banner, document.body.firstChild);

    // Cuộn đến phần liên quan
    setTimeout(() => {
      document.querySelector(`#${holidayId}`).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 3000);

    // Thêm chức năng đóng biểu ngữ
    document
      .querySelector(".close-banner")
      .addEventListener("click", function () {
        banner.style.height = "0";
        setTimeout(() => {
          banner.remove();
        }, 500);
      });
  }

  // Hiệu ứng hiện ra khi cuộn trang
  const revealElements = document.querySelectorAll(
    ".history-content, .event-content, .gallery-item"
  );

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Kiểm tra khi trang được tải

  // Thêm năm hiện tại vào bản quyền
  document.querySelector(
    ".copyright p"
  ).innerHTML = `&copy; ${new Date().getFullYear()} Di Sản & Tự Hào Dân Tộc. All rights reserved.`;

  // Chức năng popup cho thư viện ảnh
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const caption = this.querySelector(".caption").textContent;

      const popup = document.createElement("div");
      popup.className = "gallery-popup";
      popup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <img src="${imgSrc}" alt="${caption}">
                    <p>${caption}</p>
                </div>
            `;

      document.body.appendChild(popup);

      // Ngăn cuộn trang khi popup đang mở
      document.body.style.overflow = "hidden";

      // Chức năng đóng popup
      document
        .querySelector(".close-popup")
        .addEventListener("click", closePopup);
      popup.addEventListener("click", function (e) {
        if (e.target === popup) {
          closePopup();
        }
      });

      function closePopup() {
        document.body.style.overflow = "auto";
        popup.remove();
      }
    });
  });

  // Thêm CSS cho các phần tử JS động
  const dynamicStyles = document.createElement("style");
  dynamicStyles.textContent = `
        .celebration-banner {
            background: linear-gradient(to right, var(--color-primary), var(--color-accent));
            color: white;
            text-align: center;
            padding: 15px 0;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
            transition: height 0.5s ease;
            height: auto;
        }
        
        .celebration-banner .container {
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .close-banner {
            position: absolute;
            right: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: 1.5rem;
        }
        
        .history-content, .event-content, .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .history-content.active, .event-content.active, .gallery-item.active {
            opacity: 1;
            transform: translateY(0);
        }
        
        .gallery-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .popup-content {
            position: relative;
            max-width: 80%;
            max-height: 80%;
        }
        
        .popup-content img {
            max-width: 100%;
            max-height: 80vh;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
        
        .popup-content p {
            color: white;
            text-align: center;
            margin-top: 15px;
        }
        
        .close-popup {
            position: absolute;
            top: -40px;
            right: -40px;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
        
        .navbar-scrolled {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            padding: 10px 0;
        }
    `;
  document.head.appendChild(dynamicStyles);
});
