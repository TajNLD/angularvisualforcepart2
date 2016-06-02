import {Component,OnInit} from '@angular/core';
import {CounterService} from './counter.service';
import {DataService} from '../form/data.service'
import {Expense as Expenses}  from './expense.interface';

@Component({
    selector:'sfdccounter',
    template:`
              <div class="container slds-p-top--medium">
                <div class="row">
                    <div class="slds-tile">
                        <div class="slds-notify slds-notify--toast slds-theme--alert-texture" 
                        [class.slds-theme--error] = "amntExceeded">
                            <p class="slds-tile__title slds-truncate"> Total Expenses </p>
                            <p class="slds-truncate">{{totalAmnt}}</p>
                        </div>
                    </div>
                            <div class="slds-tile ">
                                <div class="slds-notify slds-notify--toast slds-theme--alert-texture">
                                    <p class="slds-tile__title slds-truncate">No. of Expenses</p>
                                    <p class="slds truncate">{{totalExp}}</p>
                                </div>
                            </div>    
                </div>
              </div>    
            <div class="container slds-p-top--medium">
                <div id="list" class="row">
                    <ul>  
                         <li *ngFor = "let item of list,let i = index" >
                            <div class="slds-card">
                                <div [ngClass]="{'slds-theme--success': amntExceeded, 'slds-theme--warning': !amntExceeded}">
                                    <header class="slds-card__header slds-grid grid--flex-spread">
                                        <h3>{{item.expname}}</h3>
                                    </header>
                                    <section class="slds-card__body">    
                                        <div class="slds-tile slds-hint-parent">
                                          <p class="slds-tile__title slds-truncate"> Amount: {{item.amount}}</p>
                                          <p class="slds-truncate">Client: {{item.client}}</p>
                                          <p class="slds-truncate">Date: {{item.expdate}}</p>
                                          <p class="slds-truncate">Reimbursed? <input  type="checkbox" value="{{item.reimbursed}}"/></p>
                                        </div>
                                    </section>    
                                </div>
                            </div>
                        </li>
                    </ul>
                 </div>
            </div>
    `,
    providers:[CounterService,DataService]
})

export  class CounterComponent implements OnInit{
    list = new Array<Expenses>();
    totalAmnt:number = 0;
    totalExp:number = 0;
    subscription:any;

    constructor(private _counterService:CounterService,private _dataService:DataService){}
    
    ngOnInit():any {
        this.list = this._counterService.getData();
        this.totalAmnt = this._counterService.getTotalAmount();
        this.totalExp = this.list.length;
        
        this.subscription = this._dataService.getChangeEmitter()
            .subscribe(this.getExp());

    }
    
    getExp(){

        console.log('Hallo Hallo');
        this.list = this._counterService.getData();
        
    }
}