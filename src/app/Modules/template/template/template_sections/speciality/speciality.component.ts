import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { applyLoggingDecorator } from 'src/app/loggingDescorator';
import { Globalobjects } from '../../../../../services/globalobjects';

@Component({
  selector: 'app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpecialityComponent  implements OnInit {

  constructor(private globalObject:Globalobjects) { 
      // if (this.globalObject.isTemplate){
      //          return applyLoggingDecorator(this,"speciality")
      //        }
  }

  ngOnInit() {}

}
