(() => {
  const galleryCoverRadius = "20px";
  const operationsPreviewVideo = "assets/medical-assistant-cover.mp4";
  const heroSlogan = "于方寸界面，打磨每一次用户触碰";
  const experiencePortraitVideo = "assets/experience-portrait-v2.mp4";
  const profileCopyBefore = "高效输出高质量设计方案";
  const profileCopyAfter = "输出高质量设计方案";
  const digitalTwinScreens = Array.from(
    { length: 24 },
    (_, index) => `assets/digital-twin-screens/${String(index + 1).padStart(2, "0")}.png`,
  );
  const operationsScreens = Array.from(
    { length: 19 },
    (_, index) => `assets/operations-screens/${String(index + 1).padStart(2, "0")}.png`,
  );
  const detailProjects = {
    "digital-twin": {
      title: "智慧医院·数字运营管理孪生平台",
      screens: digitalTwinScreens,
    },
    "smart-operations": {
      title: "后勤中台多端产品",
      screens: operationsScreens,
    },
  };
  const covers = {
    "智慧医院·数字运营管理孪生平台": {
      title: "能耗监测系统",
      english: "ENERGY MONITORING",
      src: "assets/covers/energy-monitoring.png",
    },
    "后勤中台多端产品": {
      title: "医帮手APP",
      english: "MEDICAL ASSISTANT APP",
      src: "assets/covers/medical-assistant.png",
    },
    "智时米APP": {
      title: "智时米APP",
      english: "SMART HOME",
      src: "assets/covers/smart-home.png",
    },
    "医彼邻小程序": {
      title: "医彼邻小程序",
      english: "YIBILIN MINI PROGRAM",
      src: "assets/covers/yibilin.png",
    },
    "公司运营管理系统": {
      title: "公司运营管理系统",
      english: "OPERATIONS MANAGEMENT",
      src: "assets/covers/operations-management.png",
    },
    "融合通讯APP": {
      title: "融合通讯APP",
      english: "UNIFIED COMMUNICATIONS APP",
      src: "assets/covers/unified-communications.png",
    },
  };

  const renamedTitle = "智慧医院·数字运营管理孪生平台";
  const newTitle = covers[renamedTitle].title;
  let pending = false;
  let projectPreviewObserver;

  function applyGalleryCoverRadius() {
    if (document.getElementById("gallery-cover-radius-override")) return;
    const style = document.createElement("style");
    style.id = "gallery-cover-radius-override";
    style.textContent = `
      .gallery-card,
      .gallery-modal-panel { border-radius: ${galleryCoverRadius}; }

      .gallery-modal-panel {
        width: min(calc(100vw - 48px), 1240px);
        max-height: min(92dvh, 900px);
      }

      .gallery-modal-panel > img {
        max-height: min(84dvh, 810px);
      }

      .gallery-modal-nav-button {
        position: fixed;
        top: 50%;
        z-index: 3;
        display: grid;
        width: 52px;
        height: 52px;
        place-items: center;
        border: 1px solid rgba(242, 245, 239, 0.28);
        border-radius: 50%;
        background: rgba(12, 17, 20, 0.72);
        color: #f2f5ef;
        cursor: pointer;
        font-size: 34px;
        line-height: 1;
        transform: translateY(-50%);
        transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      }

      .gallery-modal-nav-button:hover {
        border-color: #b8e83e;
        background: rgba(27, 37, 29, 0.94);
        color: #b8e83e;
        transform: translateY(-50%) scale(1.06);
      }

      .gallery-modal-nav-button[data-direction="previous"] { left: clamp(16px, 2vw, 40px); }
      .gallery-modal-nav-button[data-direction="next"] { right: clamp(16px, 2vw, 40px); }

      @media (min-width: 768px) {
        .gallery-modal-panel { width: min(calc(100vw - 144px), 1240px); }
      }

      @media (max-width: 767px) {
        .gallery-modal-panel { width: calc(100vw - 32px); }
        .gallery-modal-nav-button { width: 42px; height: 42px; font-size: 28px; }
        .gallery-modal-nav-button[data-direction="previous"] { left: 8px; }
        .gallery-modal-nav-button[data-direction="next"] { right: 8px; }
      }

      .portrait-wrap .portrait-experience-video {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }

      @media (min-width: 961px) {
        #experience .experience-profile .portrait-wrap {
          align-self: center;
          min-height: 0;
          aspect-ratio: 2 / 3;
        }
      }

      #experience .contact-inline {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: clamp(6px, 1vw, 12px);
      }

      #experience .contact-inline a,
      #experience .contact-inline > div {
        min-width: 0;
        min-height: clamp(58px, 7vw, 76px);
        gap: clamp(6px, 0.8vw, 12px);
        padding: clamp(8px, 1vw, 14px);
      }

      #experience .contact-inline span {
        font-size: clamp(10px, 1.1vw, 13px);
      }

      #experience .portrait-wrap {
        perspective: 800px;
        border-radius: 14px;
        background: rgb(19, 29, 23);
      }

      #experience .portrait-wrap .parallax-image-frame {
        border-radius: 14px;
        transform-style: preserve-3d;
        transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        will-change: transform;
      }

      #experience .portrait-wrap .portrait-experience-video { border-radius: 14px; }

      .portrait-video-tooltip {
        position: absolute;
        z-index: 3;
        padding: 5px 9px;
        border-radius: 4px;
        background: #b8e83e;
        color: #07100d;
        font-family: Arial, sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 1;
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, calc(-100% - 10px));
        transition: opacity 0.18s ease;
      }

      @media (hover: none), (prefers-reduced-motion: reduce) {
        .portrait-video-tooltip { display: none; }
      }
    `;
    document.head.append(style);
  }

  function updateGallery() {
    document.querySelectorAll(".gallery-card").forEach((card) => {
      const titleNode = card.querySelector(".gallery-card-copy strong");
      const label = titleNode?.textContent.trim();
      const cover = covers[label];
      if (!cover) return;

      const image = card.querySelector("img");
      if (image) image.src = cover.src;
      titleNode.textContent = cover.title;
      const english = card.querySelector(".gallery-card-copy small");
      if (english) english.textContent = cover.english;
      card.setAttribute("aria-label", `放大查看${cover.title}`);
    });

    document.querySelectorAll(".gallery-modal").forEach((modal) => {
      const caption = modal.textContent;
      const cover = Object.entries(covers).find(([title, item]) => caption.includes(title) || caption.includes(item.title))?.[1];
      const image = modal.querySelector("img");
      if (cover && image) image.src = cover.src;
      const title = modal.querySelector(".gallery-modal-caption strong");
      const english = modal.querySelector(".gallery-modal-caption small");
      if (cover && title) title.textContent = cover.title;
      if (cover && english) english.textContent = cover.english;
    });
  }

  function updateGalleryModalNavigation() {
    const projects = Object.entries(covers);
    document.querySelectorAll(".gallery-modal").forEach((modal) => {
      if (modal.querySelector(".gallery-modal-nav-button")) return;

      [
        { direction: "previous", label: "上一张封面", symbol: "‹", step: -1 },
        { direction: "next", label: "下一张封面", symbol: "›", step: 1 },
      ].forEach(({ direction, label, symbol, step }) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "gallery-modal-nav-button";
        button.dataset.direction = direction;
        button.setAttribute("aria-label", label);
        button.textContent = symbol;
        button.addEventListener("click", () => {
          const caption = modal.querySelector(".gallery-modal-caption")?.textContent || "";
          const currentIndex = Math.max(0, projects.findIndex(([title, cover]) => (
            caption.includes(title) || caption.includes(cover.title)
          )));
          const [, nextCover] = projects[(currentIndex + step + projects.length) % projects.length];
          const nextCard = Array.from(document.querySelectorAll(".gallery-card")).find((card) => {
            const title = card.querySelector(".gallery-card-copy strong")?.textContent.trim();
            return title === nextCover.title;
          });
          nextCard?.click();
        });
        modal.append(button);
      });
    });
  }

  function updateProjectDetailGallery() {
    const slug = location.hash.match(/^#\/projects\/([^/?#]+)/)?.[1];
    const project = detailProjects[slug];
    if (!project) return;

    const gallery = document.querySelector(".project-detail-gallery");
    if (!gallery || gallery.dataset.projectGalleryOverride === slug) return;

    gallery.dataset.projectGalleryOverride = slug;
    gallery.setAttribute("aria-label", `${project.title}案例图片`);
    gallery.innerHTML = project.screens.map((source, index) => `
      <figure><img src="${source}" alt="${project.title}界面 ${String(index + 1).padStart(2, "0")}" width="1920" height="1080" loading="${index === 0 ? "eager" : "lazy"}" decoding="async"></figure>
    `).join("");
  }

  function updateOperationsPreviewVideo() {
    document.querySelectorAll(".project-feature").forEach((project) => {
      if (!project.textContent.includes("后勤中台多端产品")) return;

      const video = project.querySelector(".project-media video");
      if (!video) return;

      const source = video.querySelector("source");
      const currentSource = source?.getAttribute("src") || video.getAttribute("src");
      if (currentSource === operationsPreviewVideo) return;

      if (source) source.setAttribute("src", operationsPreviewVideo);
      else video.setAttribute("src", operationsPreviewVideo);
      video.load();
    });
  }

  function manageProjectPreviewVideos() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.querySelectorAll(".project-media > video").forEach((video) => {
      if (video.dataset.lazyPreviewManaged === "true") return;
      video.dataset.lazyPreviewManaged = "true";
      video.preload = "none";

      if (!("IntersectionObserver" in window)) {
        video.play().catch(() => {});
        return;
      }

      if (!projectPreviewObserver) {
        projectPreviewObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            projectPreviewObserver.unobserve(entry.target);
            entry.target.play().catch(() => {});
          });
        }, { rootMargin: "320px 0px" });
      }

      projectPreviewObserver.observe(video);
    });
  }

  function updateHeroSlogan() {
    document.querySelectorAll("#home .hero-headline").forEach((headline) => {
      if (headline.textContent.trim() === "让复杂业务，成为清晰体验") {
        headline.textContent = heroSlogan;
      }
    });
  }

  function updateExperiencePortrait() {
    document.querySelectorAll("#experience .experience-profile .portrait-wrap").forEach((portrait) => {
      const frame = portrait.querySelector(".parallax-image-frame");
      if (!frame) return;

      const existingVideo = frame.querySelector(".portrait-experience-video");
      if (existingVideo) {
        if (existingVideo.getAttribute("src") !== experiencePortraitVideo) {
          existingVideo.src = experiencePortraitVideo;
          existingVideo.load();
          existingVideo.play().catch(() => {});
        }
        return;
      }

      const video = document.createElement("video");
      video.className = "portrait-experience-video";
      video.src = experiencePortraitVideo;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", "孙丽娜个人经历视频");
      frame.replaceChildren(video);
      video.play().catch(() => {});
    });
  }

  function enableExperienceTilt() {
    if (
      window.matchMedia("(hover: hover)").matches === false
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    document.querySelectorAll("#experience .experience-profile .portrait-wrap").forEach((portrait) => {
      if (portrait.dataset.tiltEnabled === "true") return;

      const frame = portrait.querySelector(".parallax-image-frame");
      if (!frame) return;

      portrait.dataset.tiltEnabled = "true";
      const tooltip = document.createElement("span");
      tooltip.className = "portrait-video-tooltip";
      tooltip.textContent = "UI Designer";
      portrait.append(tooltip);

      portrait.addEventListener("pointermove", (event) => {
        const rect = portrait.getBoundingClientRect();
        const offsetX = event.clientX - rect.left - rect.width / 2;
        const offsetY = event.clientY - rect.top - rect.height / 2;
        const rotateX = (offsetY / (rect.height / 2)) * -7;
        const rotateY = (offsetX / (rect.width / 2)) * 7;
        frame.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.025)`;
        tooltip.style.left = `${event.clientX - rect.left}px`;
        tooltip.style.top = `${event.clientY - rect.top}px`;
      });

      portrait.addEventListener("pointerenter", () => {
        tooltip.style.opacity = "1";
      });

      portrait.addEventListener("pointerleave", () => {
        tooltip.style.opacity = "0";
        frame.style.transform = "";
      });
    });
  }

  function updateProfileCopy() {
    document.querySelectorAll("#experience .profile-about p").forEach((paragraph) => {
      const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
      const textNodes = [];
      let textNode;
      while ((textNode = walker.nextNode())) textNodes.push(textNode);
      textNodes.forEach((node) => {
        if (node.nodeValue.includes(profileCopyBefore)) {
          node.nodeValue = node.nodeValue.replace(profileCopyBefore, profileCopyAfter);
        }
      });
    });
  }

  function applyOverrides() {
    pending = false;
    updateGallery();
    updateGalleryModalNavigation();
    updateProjectDetailGallery();
    updateOperationsPreviewVideo();
    manageProjectPreviewVideos();
    updateHeroSlogan();
    updateExperiencePortrait();
    updateProfileCopy();
    enableExperienceTilt();
  }

  function scheduleUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(applyOverrides);
  }

  function initialiseOverrides() {
    applyGalleryCoverRadius();
    scheduleUpdate();
    window.addEventListener("hashchange", scheduleUpdate);
    new MutationObserver(scheduleUpdate).observe(document.body, { childList: true, subtree: true });
  }

  // This script is loaded before the React module mounts. Starting the observer now
  // lets gallery covers receive their real sources during the first render instead
  // of waiting for every image, video, and font on the page to finish loading.
  initialiseOverrides();
})();
