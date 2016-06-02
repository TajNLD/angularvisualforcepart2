/**
 * Created by Taj on 30-5-2016.
 */
import {Injectable,Inject,EventEmitter} from '@angular/core';
import {Expense as Data}  from './expense.interface';

@Injectable()
export class DataService {


    expensesAdded = new EventEmitter<number>();
    constructor(@Inject(Window) public window:Window) {
    }

    postData(data:Data) {
        
        let newMessage = this.window.createExpense;
        var jsonString = JSON.stringify(data);
        Visualforce.remoting.Manager.invokeAction(newMessage, jsonString,
            (result, event) => {
                if (event.status) {
                    this.expensesAdded.emit(0);
                } else if (event.type === 'exception') {

                    console.log('Exception in Submitting Data');

                } else {
                    console.log('General Exception');

                }
            })

    }

    getChangeEmitter(){

        return this.expensesAdded;
    }

}