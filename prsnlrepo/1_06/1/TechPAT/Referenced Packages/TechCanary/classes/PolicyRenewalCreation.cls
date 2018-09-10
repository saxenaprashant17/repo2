/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class PolicyRenewalCreation implements Database.Batchable<SObject> {
    global Date effectiveDate {
        get;
        set;
    }
    global Set<String> externalIdSet;
    global String fieldnames {
        get;
        set;
    }
    global Date newEffectivedate {
        get;
        set;
    }
    global String newExternalID {
        get;
        set;
    }
    global String oldExternalId {
        get;
        set;
    }
    global List<CanaryAMS__Policy__c> policyList {
        get;
        set;
    }
    global String policynewiD {
        get;
        set;
    }
    global String policyNumber {
        get;
        set;
    }
    global String policyNumberAlready {
        get;
        set;
    }
    global Date presentDate {
        get;
        set;
    }
    global String query {
        get;
        set;
    }
    global String querynew {
        get;
        set;
    }
    global String todaysDate {
        get;
        set;
    }
    global Integer totalRecs;
    global String value {
        get;
        set;
    }
    global Date valueDate {
        get;
        set;
    }
    global Map<String,String> valueMap;
    global PolicyRenewalCreation() {

    }
    global void execute(Database.BatchableContext BC, List<CanaryAMS__Policy__c> policiesList) {

    }
    global void finish(Database.BatchableContext BC) {

    }
    global Database.QueryLocator start(Database.BatchableContext BC) {
        return null;
    }
}
