global with sharing class ExpenseRemoter {
  
    public ExpenseRemoter() { } // empty constructor
    
    @RemoteAction
    global static String getExpenses() {
        List<Expense__c> explist = [SELECT Id, Name, Amount__c, Client__c, Date__c,Reimbursed__c FROM Expense__c];
        
        //serialize explist
        String JSONExpList = JSON.serialize(explist);        
        return JSONExpList;
    }
    
    @RemoteAction
    global static void createExpense(String exp) {
    
        Map<String,Object> rspMap = (Map<String,Object>) JSON.deserializeUntyped(exp);
        
        //Parse the dateTime encapsulate string with "" otherwise DateTime.class will not pick it up
        String dt = (String) rspMap.get('expdate');
        String dtprsd = '"' + dt + '"';

        Expense__c expense = new Expense__c (name = (String) rspMap.get('expname'),
                                            Amount__c = (Integer) rspMap.get('amount'),
                                            Client__c = (String) rspMap.get('client'),
                                            Date__c   =  (DateTime) JSON.deserialize(dtprsd,DateTime.class),
                                            Reimbursed__c = (Boolean) rspMap.get('reimbursed')
                                            );
                                     
       try {
       
           insert expense;
       
           } catch(DmlException e) {
                System.debug('An unexpected error has occurred: ' + e.getMessage());
           }
           
    }
       
}