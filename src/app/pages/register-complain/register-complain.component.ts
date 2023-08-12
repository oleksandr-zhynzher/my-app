import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplainsService } from 'src/app/services/complains/complains.service';

declare var google: any;

@Component({
  selector: 'app-register-complain',
  templateUrl: './register-complain.component.html',
  styleUrls: ['./register-complain.component.scss'],
})
export class RegisterComplainComponent implements OnInit {
  isAnonimus: boolean = true;
  isSignsOfIgnoringPresent: boolean = false;
  personStatus: string = 'phisical';
  cityData: any = null;

  typeOfCrimeOptions = [
    { value: 'coruption', display: 'Корупція' },
    { value: 'raiding', display: 'Рейдерство' },
  ];

  damageTypeOptions = [
    { value: 'no-damage', display: 'Збитки відсутні' },
    { value: 'nationalBudget', display: 'Державний бюджет' },
    { value: 'localBudget', display: 'Місцевий бюджет' },
    { value: 'teritoralBudget', display: 'Територіальної громади' },
    {
      value: 'legalPerson',
      display: 'Юридичної особи державної форми власності',
    },
    {
      value: 'legalPersonWithGoverment',
      display: 'Юридичної особи  за участі держави',
    },
  ];

  govermentObjectOptions = [
    { value: 'coruption', display: 'Законодавча влада' },
    { value: 'executive', display: 'Виконавча влада' },
    { value: 'judiciary', display: 'Судова влада' },
    { value: 'localGovernment', display: 'Орган місцевого самоврядування' },
    {
      value: 'legalEntityOfStateOwnership',
      display: 'Юридична особа державної форми власності',
    },
    {
      value: 'legalEntityWithStateShare',
      display: 'Юридична особа з державною часткою',
    },
  ];

  scaleOfCrimeOptions = [
    { value: 'local', display: 'Місцевий' },
    { value: 'regional', display: 'Регіональний/обласний ' },
    { value: 'interregional', display: 'Міжрегіональний/міжобласний' },
    { value: 'state', display: 'Державний' },
    { value: 'international', display: 'Міжнародний' },
  ];

  verifiedByStateOptions = [
    { value: 'notVerified', display: 'Перевірка не проведена' },
    { value: 'internalChecl', display: 'Службова перевірка' },
    { value: 'disciplinaryProceedings', display: 'Дисциплінарне провадження' },
    {
      value: 'administrativeProceedings',
      display: 'Адміністративне провадження',
    },
    { value: 'criminalProceedings', display: 'Кримінальне провадження' },
    { value: 'otherVerificationMeasures', display: 'Інші заходи перевірки' },
  ];

  levelOfVerificationOptions = [
    { value: '0', display: 'Перевірено' },
    { value: '1', display: 'Часткова Перевірка' },
    { value: '2', display: 'Ігнорування' },
  ];

  generalInfoForm: FormGroup = this.fb.group({
    phisicalPersonFirstName: [''],
    phisicalPersonLastName: [''],
    phisicalPersonEmail: ['', Validators.email],
    phisicalPersonPhoneNumber: [''],
    legalPersonName: [''],
    legalPersonFirstName: [''],
    legalPersonLastName: [''],
    legalPersonAddress: [''],
    legalPersonEmail: ['', [Validators.email]],
    description: ['', Validators.required],
    typeOfCrime: [this.typeOfCrimeOptions[0].value],
    typeOfDamage: [this.damageTypeOptions[0].value],
    govermentObject: [this.govermentObjectOptions[0].value],
    scaleOfCrime: [this.scaleOfCrimeOptions[0].value],
    disciplinaryLiability: [false],
    administrativeLiability: [false],
    criminalLiability: [false],
    civilLiability: [false],
    politicalLiability: [false],
    ethicalLiability: [false],
    verifiedByState: [this.verifiedByStateOptions[0].value],
    descriptionOfHowIgnoredCoruptionSignals: [''],
    levelOfVerification: [this.levelOfVerificationOptions[0].value],
  });

  constructor(private fb: FormBuilder, private compService: ComplainsService) {}

  ngOnInit(): void {
    this.compService.getComplaint().subscribe((data) => {
      console.log('data = ', data);
    });
  }

  setPrivacyPreferences(value: boolean): void {
    this.isAnonimus = value;
  }
  setPersonStatus(value: string): void {
    this.personStatus = value;
  }

  setSignsOfIgnoring(value: boolean): void {
    this.isSignsOfIgnoringPresent = value;
  }

  onGeneralInfoFormSubmit(): void {
    if (this.generalInfoForm.valid) {
      const data = {
        ...this.generalInfoForm.value,
        ...this.cityData,
        creationDate: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
      };
      console.log('Data To Submit: ', data);
      this.compService.addComplaint(data);
    } else {
      console.error('Form is invalid');
    }
  }

  onCitySelected(data: { cityName: string; lat: number; lng: number }) {
    this.cityData = data;
  }
}
