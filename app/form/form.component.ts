/**
 * Created by Taj on 26-5-2016.
 */
import {Component} from '@angular/core';
import {FormBuilder,ControlGroup,Validators} from '@angular/common';
import {OnInit} from '@angular/core';
import {DataService} from './data.service'
import {Expense as Data}  from './expense.interface';
//import {NKDatetime} from 'ng2-datetime/ng2-datetime';
//import {Visualforce} from "../../mock/VisualForceMockService";

@Component({
    selector:'sfdcform',
    template:  `
    <div class="container">
        <form [ngFormModel]="myForm" class="slds-form--stacked" (ngSubmit)="onSubmit()" >
            <div class="slds-form-element slds-is-required">
                <div class="slds-form-element__control">
                    <label class="slds-form-element__label" for="expname">Expense Name</label>
                    <input [ngFormControl] = "myForm.controls['expname']" class= "slds-input" type="text" id="expname" >
                </div>
            </div>
            <div class="slds-form-element slds-is-required">
                <div class="slds-form-element__control">
                    <label class="slds-form-element__label" for="amount">Amount</label>
                    <input [ngFormControl] = "myForm.controls['amount']" class= "slds-input" type="number" id="amount" >
                  
                </div>
            </div>
            <div class="slds-form-element">
                <div class="slds-form-element__control">
                    <label class="slds-form-element__label" for="client">Client</label>
                    <input [ngFormControl] = "myForm.controls['client']" class= "slds-input" type="text" id="client">
               
                </div>
            </div>
            <div class="slds-form-element">
                <div class="slds-form-element__control">
                    <label class="slds-form-element__label" for="expdate">Expense Date</label>
                    <input [ngFormControl] = "myForm.controls['expdate']" class= "slds-input"  type="datetime-local" id="expdate">
                </div>
            </div>
            <div class="slds-form-element__control">
                <label class="slds-form-element__label" for="reimbursed">Reimbursed</label>
                <input [ngFormControl] = "myForm.controls['reimbursed']" class= "slds-checkbox" type="checkbox" id="reimbursed">
               
            </div> 
            <div>
            <button class=" slds-buslds-button--neutral" type="submit">Submit</button>
            </div>
        </form>
    </div>
    `,
    providers:[DataService]
})

export class FormComponent implements OnInit{

    data:Data;

    myForm:ControlGroup;

    constructor(private _formBuilder:FormBuilder,private _dataService:DataService){}

    onSubmit(){
        this.data = this.myForm.value;
        let event = this._dataService.postData(this.data);

    }


    ngOnInit():any{

        this.myForm = this._formBuilder.group({
            'expname':['',Validators.required],
            'amount' :['',Validators.required],
            'client' :['',Validators.required],
            'expdate' :['',Validators.required],
            'reimbursed':['']

        });

    }
}
