class Papers {
  holdingPaper = false;
  prevMouseX = 0;
  prevMouseY = 0;
  mouseX = 0;
  mouseY = 0;
  velocityX = 0;
  velocityY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    paper.addEventListener("mousedown", this.handleMouseDown);
    paper.addEventListener("touchstart", this.handleTouchStart, { passive: false });
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("touchmove", this.handleTouchMove, { passive: false });
    window.addEventListener("mouseup", this.handleMouseUp);
    window.addEventListener("touchend", this.handleTouchEnd);
  }

  handleMouseDown = (e) => {
    this.handlePointerDown(e.clientX, e.clientY);
  };

  handleTouchStart = (e) => {
    const touch = e.touches[0];
    this.handlePointerDown(touch.clientX, touch.clientY);
  };

  handlePointerDown(clientX, clientY) {
    console.log("Pointer down");

    this.holdingPaper = true;

    if (this.holdingPaper) {
      this.prevMouseX = clientX;
      this.prevMouseY = clientY;
    }
  }

  handleMouseMove = (e) => {
    this.handlePointerMove(e.clientX, e.clientY);
  };

  handleTouchMove = (e) => {
    const touch = e.touches[0];
    this.handlePointerMove(touch.clientX, touch.clientY);
  };

  handlePointerMove(clientX, clientY) {
    console.log("Pointer move");

    this.mouseX = clientX;
    this.mouseY = clientY;

    this.velocityX = this.mouseX - this.prevMouseX;
    this.velocityY = this.mouseY - this.prevMouseY;

    if (this.holdingPaper) {
      this.currentPaperX += this.velocityX;
      this.currentPaperY += this.velocityY;

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      const papers = Array.from(document.querySelectorAll('.paper'));
      papers.forEach((paper) => {
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
      });
    }
  }

  handleMouseUp = () => {
    this.holdingPaper = false;
    console.log("Mouse up");
  };

  handleTouchEnd = () => {
    this.holdingPaper = false;
    console.log("Touch end");
  };
}

let highestZ = 1;
const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Papers();
  p.init(paper);
});

const nameDiv = document.querySelector('.name');
const name = prompt("Please enter your name:");

if (name) {
  const nameHeader = document.createElement('h1');
  nameHeader.textContent = name;
  nameDiv.appendChild(nameHeader);
  nameDiv.style.fontFamily = "Arial, sans-serif"; // Change the font family as desired
} else {
  alert("Name is required!");
}
