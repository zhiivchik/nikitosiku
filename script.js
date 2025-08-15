let highestZ = 1;

class Paper {
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
        // Mouse events
        paper.addEventListener('mousedown', (e) => {
            this.handleStart(e.clientX, e.clientY);
            paper.style.zIndex = highestZ;
            highestZ += 1;
        });

        // Touch events
        paper.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handleStart(touch.clientX, touch.clientY);
            paper.style.zIndex = highestZ;
            highestZ += 1;
        });

        document.addEventListener('mousemove', (e) => {
            this.handleMove(e.clientX, e.clientY, paper);
        });

        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.handleMove(touch.clientX, touch.clientY, paper);
        }, { passive: false });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
        });

        window.addEventListener('touchend', () => {
            this.holdingPaper = false;
        });
    }

    handleStart(clientX, clientY) {
        this.holdingPaper = true;
        this.prevMouseX = clientX;
        this.prevMouseY = clientY;
    }

    handleMove(clientX, clientY, paper) {
        this.mouseX = clientX;
        this.mouseY = clientY;

        this.velocityX = this.mouseX - this.prevMouseX;
        this.velocityY = this.mouseY - this.prevMouseY;

        if (this.holdingPaper) {
            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
        }
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});