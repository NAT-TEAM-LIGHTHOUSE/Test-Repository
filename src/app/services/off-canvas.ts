import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OffCanvas {
  
private offcanvasElement!: HTMLElement;
  private componentRef!: ComponentRef<any>;
  private offcanvasInstance: any;
  private currentModalRef: any;


  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }




  openModal(component: Type<any>, id?: string, cssClass?: string, value?: any): void {
    this.createComponent(component, id, cssClass);
    this.offcanvasElement.classList.add('offcanvas')
    // Bootstrap Offcanvas structure
    this.offcanvasElement.innerHTML = `
        <div class="offcanvas-header">
          <h5 class="offcanvas-title"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
          <!-- Dynamic component will be injected here -->
        </div>
    `;
    this.offcanvasElement.classList.toggle('show');
    if (cssClass) {
      this.offcanvasElement.classList.add(cssClass);
    }

    // Add the dynamic component inside the Offcanvas body
    const offcanvasBody = this.offcanvasElement.querySelector('.offcanvas-body');
    offcanvasBody?.appendChild((this.componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0]);

    // Append to body and show the Offcanvas
    document.body.appendChild(this.offcanvasElement);

    // Use Bootstrap Offcanvas API to initialize
    this.offcanvasInstance = new (window as any).bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasInstance.show();

    // Close listener
    this.addCloseListener();
  }

  private createComponent(component: Type<any>, id?: string, cssClass?: string): void {
    this.offcanvasElement = document.createElement('div');
    this.offcanvasElement.id = id || 'dynamic-offcanvas';
    document.body.appendChild(this.offcanvasElement);

    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = factory.create(this.injector);
    this.appRef.attachView(this.componentRef.hostView);
  }

  public async closeModal(): Promise<void> {
    console.log('Closing offcanvas manually');

    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
    } else {
      this.offcanvasElement?.classList.remove('show'); // fallback
      document.body.style.overflow = '';
      document.body.style.position = '';

      // Manually remove backdrop if present
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.parentElement?.removeChild(backdrop);
      }
    }

    setTimeout(() => {
      if (this.componentRef) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
      }
      if (this.offcanvasElement && document.body.contains(this.offcanvasElement)) {
        document.body.removeChild(this.offcanvasElement);
      }
    }, 500); // Longer timeout for smoother Android handling
  }





  // private addCloseListener(): void {
  //   this.offcanvasElement.querySelector('.closeOffcanvas')?.addEventListener('click', () => {
  //     this.closeModal();
  //   });
  // }

  addCloseListener(): void {
    const closeBtn = this.offcanvasElement.querySelector('.closeModal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeModal();
      });
    }
  }



  close() {
    if (this.offcanvasInstance) {
      this.offcanvasInstance.hide();
      this.offcanvasInstance = null;
    }
  }


}