import {Injectable, Inject} from '@angular/core';
import {Expense as Data}  from './expense.interface';

@Injectable()
export class CounterService {

    list = [];
    constructor(@Inject(Window) private _window:Window) {
    }

    getData = () => {

        let getExpenses = this._window.getExpenses;
        Visualforce.remoting.Manager.invokeAction(getExpenses,
            (result, event) => {
                if (event.status) {
                    var parsedJson = JSON.parse(result);

                    for (var i = 0; i < parsedJson.length; i++) {

                        let exp = new expenses();
                        exp.Id = parsedJson[i].Id;
                        exp.amount = parsedJson[i].Amount__c;
                        exp.client = parsedJson[i].Client__c;
                        exp.expdate = parsedJson[i].Date__c;
                        exp.reimbursed = parsedJson[i].Reimbursed__c;
                        exp.expname = parsedJson[i].Name;
                        this.list.push(exp);

                    }
                } else if (event.type === 'exception') {
                    console.log('exception');
                } else {

                }
            }, {escape: false})
        return this.list;

    }

    getTotalAmount = () => {
        let totalAmnt:number = 0;
        console.log('length is ' + this.list.length);
        for (var i = 0; i < this.list.length; i++) {
            totalAmnt = totalAmnt +  this.list[i].amount;

        }

        return totalAmnt;
    }

}

class expenses implements Data {

    Id:string;
    expname:string;
    amount:number;
    client:string;
    expdate:string;
    reimbursed:boolean;
}