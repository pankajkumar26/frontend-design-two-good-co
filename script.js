function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navBarAnimation() {
  gsap.to("#navPart1 img", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to("#navPart2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
navBarAnimation();

function videoContainerAnimation() {
  const videoContainer = document.querySelector("#videoContainer");
  const playBtnCursor = document.querySelector("#play");

  videoContainer.addEventListener("mouseenter", function () {
    gsap.to(playBtnCursor, {
      opacity: 1,
      scale: 1,
    });
  });
  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(playBtnCursor, {
      opacity: 0,
      scale: 0,
    });
  });
  videoContainer.addEventListener("mousemove", function (dets) {
    gsap.to(playBtnCursor, {
      left: dets.x,
      top: dets.y,
      transform: "translate(-50%,-50%)"
    });
  });
}
videoContainerAnimation();

// Loading Animation for page 1 Heading and Video
function loadingAnimation() {
  const h1 = document.querySelector("#page1 h1");
  gsap.from(h1, {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3,
  });
  gsap.from("#page1 #videoContainer", {
    scale: 0.9,
    opacity: 0,
    delay: 1.2,
    duration: 0.5,
  });
}
loadingAnimation();

function expandElementAnimmation() {
  const detailsBoxes = document.querySelectorAll('.detailsBox');
  detailsBoxes.forEach(function (element) {
    element.addEventListener('mouseenter',function(){
      gsap.to('.detailsBox', {
        transform: 'scale(1.1)',
        height: '20%'
      })
    })
    element.addEventListener('mouseleave',function(){
      gsap.to('.detailsBox', {
        transform: 'scale(1)',
        height: '7%'
      })
    })
  })
}
// expandElementAnimmation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y,
    });
  });

  const children = document.querySelectorAll(".child");

  children.forEach((child) => {
    child.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    child.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}
cursorAnimation();
