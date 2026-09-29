import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, RendererFactory2, Type } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserModal {
  
clickedData:any
  private modalElement!: any;
  private componentRef!: ComponentRef<any>;
  private modalData: any;

  private position = { x: 100, y: 100 };
  private isDragging = false;
  private offset = { x: 0, y: 0 };
  private renderer: any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private rendererFactory: RendererFactory2,
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Open a modal and dynamically position it using getBoundingClientRect().
   * @param component - The component to load inside the modal.
   * @param id - The unique modal ID.
   * @param cssClass - Additional CSS classes.
   * @param event - Mouse event for dynamic positioning.
   */
 
  openModal(component: Type<any>, id?: string, cssClass?: string, event?: MouseEvent, value?: any, p0?: { backdrop: string; keyboard: boolean; }): Promise<any> {
    this.createComponent(component, id, cssClass);

    return new Promise((resolve) => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length) {
            console.log('Modal is added to DOM');
            this.addDragFunctionality();
            observer.disconnect();
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });

      
        this.modalElement.innerHTML = `
        <div class="model-backdrop"></div>
        <div class="modal-dialog modal-dialog-center">
          <div class="modal-content">
          <button type="button" class="closeModal new_btn"><i class="fa-solid fa-arrow-left-long"></i></button>
            <button type="button" class="closeModal">&times;</button>
            <div class="modal-body"></div>
          </div>
        </div>
      `;

      if (cssClass) {
        this.modalElement.classList.add(cssClass);
      }

      if (event) {
        const targetElement = event.currentTarget as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        const modalDialog = this.modalElement.querySelector('.modal-dialog') as HTMLElement;
        modalDialog.style.position = 'absolute';
        modalDialog.style.left = `${(rect.left + window.scrollX) - 200}px`;
        modalDialog.style.top = `${rect.bottom + window.scrollY + 10}px`;
        this.addDragFunctionality();
      }

      if (event && cssClass === 'profile_popup') {
        const targetElement = event.currentTarget as HTMLElement;
        const rect = targetElement.getBoundingClientRect();
        const modalDialog = this.modalElement.querySelector('.modal-dialog') as HTMLElement;
        modalDialog.style.position = 'absolute';
        modalDialog.style.left = `${(rect.left + window.scrollX) - 30}px`;
        modalDialog.style.top = `${rect.bottom + window.scrollY}px`;
      }

      const modalBody = this.modalElement.querySelector('.modal-body');
      modalBody?.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

      // Provide the resolve function to the modal component
      if (this.componentRef.instance) {

        if (value !== undefined) {
          (this.componentRef.instance as any).value = value;
        }

        (this.componentRef.instance as any).closeModal = (data: any) => {
          this.appRef.detachView(this.componentRef.hostView);
          this.componentRef.destroy();
          // document.body.removeChild(this.modalElement);
          this.modalElement.remove()
          resolve(data);
        };
      }

      // Default close behavior
      this.addModalCloseListeners(() => {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();

        try {
          this.modalElement.remove()
          // document.body.removeChild(this.modalElement);
          resolve(null); // No data returned on cancel
        } catch (e) {
          resolve(null); // No data returned on cancel

        }

        // this.modalElement = null;

      });
    });
  }
  addModalCloseListeners(onClose?: () => void) {
    const close = () => {
      // Remove the 'show_modal' class from the modal wrapper
      this.modalElement.classList.remove('show_modal');
      this.modalElement.classList.add('hide_modal');

      // Wait for animation to finish before destroying
      setTimeout(() => {
        if (onClose) onClose();
      }, 300); // match with your CSS transition time

      // Trigger the callback to cleanup the component
      // if (onClose) onClose();
    };


    const closeButtons = this.modalElement.querySelectorAll('.closeModal');
    closeButtons.forEach((button: any) => {
      button.addEventListener('click', close);
    });
  }

  /**
   * Create component and modal element dynamically.
   */
  private createComponent(component: Type<any>, id?: string, cssClass?: string): void {
    this.modalElement = document.createElement('div');
    this.modalElement.id = id || 'dynamic-modal';
    this.modalElement.classList.add('modalOpenS');
    let ionApp = document.querySelector("ion-app")
    // document.body.appendChild(this.modalElement);
    this.renderer.appendChild(ionApp, this.modalElement);
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
  }


  private addDragFunctionality(): void {
    setTimeout(() => {
      const header = this.modalElement.querySelector('.lov_container_header') as HTMLElement;
      const footer = this.modalElement.querySelector('.lov_container_footer.draggable-box') as HTMLElement;

      // console.log('header:', header);
      // console.log('footer:', footer);

      if (header) {
        header.addEventListener('mousedown', this.startDrag);
      } else {
        // console.error('Header element not found!');
      }

      if (footer) {
        footer.addEventListener('mousedown', this.startDrag);
      } else {
        // console.error('Footer element not found!');
      }
    }, 100);
  }

  private startDrag = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;

    // Check if clicked element is draggable (header or footer)
    if (target.closest('.lov_container_header') || target.closest('.lov_container_footer.draggable-box')) {
      this.isDragging = true;

      // Get modal-dialog reference
      const modalDialog = this.modalElement.querySelector('.modal-dialog') as HTMLElement;
      if (!modalDialog) return;

      // Store initial offset
      const rect = modalDialog.getBoundingClientRect();
      this.offset.x = event.clientX - rect.left;
      this.offset.y = event.clientY - rect.top;

      // Disable text selection to prevent background selection
      document.body.style.userSelect = 'none';
      document.body.style.pointerEvents = 'none'; // Prevent interaction with other elements

      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    }
  };

  private onDrag = (event: MouseEvent): void => {
    if (!this.isDragging) return;

    // Get modal-dialog reference
    const modalDialog = this.modalElement.querySelector('.modal-content') as HTMLElement;
    if (!modalDialog) return;

    // Calculate new position
    let newX = event.clientX - this.offset.x;
    let newY = event.clientY - this.offset.y;

    // Get window dimensions
    const modalWidth = modalDialog.offsetWidth;
    const modalHeight = modalDialog.offsetHeight;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Ensure modal stays within screen bounds
    const minX = 0;
    const maxX = screenWidth - modalWidth;
    const minY = 0;
    const maxY = screenHeight - modalHeight;

    newX = Math.max(minX, Math.min(newX, maxX)); // Left & Right Constraints
    newY = Math.max(minY, Math.min(newY, maxY)); // Top & Bottom Constraints

    // Apply dynamic styles to modal
    modalDialog.style.transform = `translate(${newX}px, ${newY}px)`;
    modalDialog.style.transition = `transform 0.1s ease-out`; // Smooth movement
    modalDialog.style.cursor = `grabbing`; // Change cursor while dragging
    modalDialog.style.boxShadow = `0px 4px 10px rgba(0, 0, 0, 0.2)`; // Optional shadow
    modalDialog.style.margin = `unset`;
  };

  private stopDrag = (): void => {
    this.isDragging = false;

    // Restore text selection and pointer events
    document.body.style.userSelect = '';
    document.body.style.pointerEvents = '';

    const modalDialog = this.modalElement.querySelector('.modal-dialog') as HTMLElement;
    if (modalDialog) {
      modalDialog.style.cursor = `grab`; // Reset cursor
    }

    document.removeEventListener('mousemove', this.onDrag);
    document.removeEventListener('mouseup', this.stopDrag);
  };


popDismiss(data? :any, role?:any) {
   let clickedData = {
      data: data,
      role: role
    }
     // Close modal directly
  if (this.componentRef?.instance?.closeModal) {
    this.componentRef.instance.closeModal(clickedData);
  }
  }

}
