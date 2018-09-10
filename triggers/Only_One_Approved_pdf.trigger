trigger Only_One_Approved_pdf on CanaryAMS__Accord_PDF__c (before insert, before update) {
	
    if(Trigger.isInsert && Trigger.isBefore){
		Only_One_Approved_pdf_helper.check_Other_Record_Before_insert(Trigger.new);
    }
    
   else if(Trigger.isUpdate && Trigger.isBefore){
        Only_One_Approved_pdf_helper.update_pdf(Trigger.new);
    }
}