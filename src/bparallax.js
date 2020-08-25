class BoxParallaxScroll {
  constructor({ identifier = ".parallax-element", strechFactor = 1 } = {}) {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");
    // Set option variables
    this.identifier = identifier;
    this.strechFactor = strechFactor;
  }

  traverseStyle = (fromEle, toEle) => {
    var fromStyle = fromEle.currentStyle || window.getComputedStyle(fromEle);
    toEle.style.marginTop = `${parseInt(fromStyle.marginTop)}px`;
    toEle.style.marginLeft = `${parseInt(fromStyle.marginLeft)}px`;
    toEle.style.marginRight = `${parseInt(fromStyle.marginRight)}px`;
    toEle.style.marginBottom = `${parseInt(fromStyle.marginBottom)}px`;
  };

  initiateAllElements = (elements) => {
    elements.forEach((element) => {
      const elementHeight = element.clientHeight;
      const elementWidth = element.clientWidth;
      let parent = element.parentNode;
      // Create the wrapper
      let newWrapper = document.createElement("div");
      newWrapper.className = "wrapper";
      // Traverse up the style to the wrapper
      this.traverseStyle(element, newWrapper);
      element.style.margin = "0px";
      newWrapper.style.height = `${elementHeight}px`;
      newWrapper.style.width = `${elementWidth}px`;
      newWrapper.style.overflow = "hidden";
      newWrapper.style.display = "flex";
      newWrapper.style.justifyContent = "center";
      newWrapper.style.alignItems = "center";

      // Extend the height of the element
      element.style.height = `${
        elementHeight + elementHeight * this.strechFactor
      }px`;

      // Append targetElement to wrapper and wrapper to the parent
      newWrapper.appendChild(element);
      parent.appendChild(newWrapper);
    });
  };

  init = () => {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");

    const elements = document.querySelectorAll(this.identifier);
    if (elements.length == 0) return; // Don't listen to anything if there isn't any elements

    let wHeight = window.innerHeight;
    let scrolled = 0;

    // Initiate the elements
    this.initiateAllElements(elements);

    // Listen to scroll event and transform
    window.addEventListener("scroll", function (e) {
      scrolled = window.scrollY;
      elements.forEach((element, index) => {
        const offsetTop = element.offsetTop;
        const wrapperHeight = element.parentNode.clientHeight;
        const windowDiffWrapper = wHeight - wrapperHeight;
        const elementDiffWrapper = element.clientHeight - wrapperHeight;

        let translatePercentage =
          (scrolled - offsetTop) /
          (elementDiffWrapper + Math.abs(windowDiffWrapper));
        if (windowDiffWrapper > elementDiffWrapper) {
          translatePercentage = (scrolled - offsetTop) / windowDiffWrapper;
        }

        element.style.transform = `translateY(${
          translatePercentage * elementDiffWrapper
        }px)`;
      });
    });

    // Re-evaluate window size
    window.addEventListener(
      "resize",
      (e) => {
        // Set the height again
        wHeight = window.innerHeight;
      },
      false
    );
  };
}
// Uncomment before => parcel build
// export default BoxParallaxScroll;
