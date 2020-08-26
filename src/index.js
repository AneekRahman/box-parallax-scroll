class BoxParallaxScroller {
  constructor({ identifier = ".parallax-element", strechFactor = 0.2 } = {}) {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");
    // Check edge cases
    if (strechFactor > 1 || strechFactor < 0)
      return console.error(
        "BoxParallaxScroll: strechFactor must be between 0 - 1"
      );
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

  getOffset = (el) => {
    var rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  };

  onScrolled = (e) => {
    const wHeight = this.wHeight;
    let scrolled = window.scrollY;
    this.elements.forEach((element, index) => {
      const offsetTop = this.getOffset(element).top;
      const wrapperHeight = element.parentNode.clientHeight;
      const windowDiffWrapper = wHeight - wrapperHeight;
      const elementDiffWrapper = element.clientHeight - wrapperHeight;

      if (index === 0)
        console.log(
          `wrapperHeight: ${wrapperHeight} element.clientHeight: ${element.clientHeight}`
        );

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
  };

  init = () => {
    // Won't init if window undefined;
    if (!window || !document)
      return console.error("window / document object not found");

    if (!this.identifier) return;
    const elements = document.querySelectorAll(this.identifier);
    this.elements = elements;
    if (elements.length == 0) return; // Don't listen to anything if there isn't any elements

    const wHeight = window.innerHeight;
    this.wHeight = wHeight;

    // Initiate the elements
    this.initiateAllElements(elements);

    // Run once
    this.onScrolled();

    // Listen to scroll event and transform
    window.addEventListener("scroll", this.onScrolled);

    // Re-evaluate window size
    window.addEventListener(
      "resize",
      (e) => {
        // Set the height again
        this.wHeight = window.innerHeight;
      },
      false
    );
  };
}

const BoxParallaxScroll = function (args) {
  const bps = new BoxParallaxScroller(args);
  return bps;
};

export default BoxParallaxScroll;
