requirejs.config({
  paths: {
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min',
  }
});

requirejs(['debug']);

// Accordion on blocks, on smaller screens

class Accordion {
  constructor(selector) {
    this.blocks = document.querySelectorAll(selector);
    this.openItem = null;
    this.content = null;
  }


  init() {
    // Loop over each block - item and add event listener
    for (let i = 0; i < this.blocks.length; i++) {
      const accordionItem = this.blocks[i];
      
      accordionItem.addEventListener("click", (e) => {
        e.stopPropagation();
        // Check if any accordion items are currently open
        if(this.openItem) {
          // Check if we are clicking on the same, already opened tab
          if(this.content.parentNode.parentNode.getAttribute('id') === accordionItem.getAttribute('id')) {
            this.toggleOpen(true);
            return;
          }
          this.toggleOpen();
        }
        
        // Store opened accordion item
        this.openItem = accordionItem;
        this.content = this.openItem.querySelector('.block-content');

        // Toggle open classes on accordion item and its content
        this.toggleOpen();
      });
    }

    this.documentListener();
  }

  toggleOpen(reset) {
    if(!this.openItem && !this.content) return;

    // Toggle open classes on accordion item and its content
    this.openItem.classList.toggle('open');
    this.content.classList.toggle('open');

    if(reset) {
      this.openItem = null;
      this.content = null;
    }
  }

  documentListener() {
    document.addEventListener('click', () => {
      if(this.openItem) {
        this.toggleOpen(true);
      }
    });
  }
}

// Create new accordion object
const blockAccordion = new Accordion('.page-content .trifecta');

blockAccordion.init();

