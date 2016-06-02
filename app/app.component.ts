import {Component} from '@angular/core';
import {FormComponent} from './form/form.component';
import {CounterComponent} from './counters/counter.component';
@Component({
    selector: 'my-app',
    template: `

<div class="slds">
    <div class="slds-page-header">
        <div class="slds-grid">
            <div class="slds-col slds-has-flexi-truncate">
                <p class="slds-text-heading--label">Expenses</p>
                <div class="slds-grid">
                    <div class="slds-grid slds-type-focus slds-no-space">
                        <h1 class="slds-text-heading--medium slds-truncate" title="My
Expenses">My Expense
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<sfdcform></sfdcform>
<sfdccounter></sfdccounter>


`
    ,
    directives:[FormComponent,CounterComponent]
})
export class AppComponent {
}