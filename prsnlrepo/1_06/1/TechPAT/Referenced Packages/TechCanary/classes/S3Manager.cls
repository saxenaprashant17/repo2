/*
This file is generated and isn't the actual source code for this
managed global class.
This read-only file shows the class's global constructors,
methods, variables, and properties.
To enable code to compile, all methods return null.
*/
global class S3Manager {
    global S3Manager() {

    }
global class AccessControlList {
    global List<String> apex_schema_type_info;
    global List<String> field_order_type_info;
    global List<String> Grant_type_info;
    global AccessControlList() {

    }
}
global class AmazonAccess {
    global String AWSCredentialName;
    global List<CanaryAMS.S3Manager.ListEntry> bucketList {
        get;
        set;
    }
    global String bucketName {
        get;
        set;
    }
    global String clientCert_x;
    global String clientCertPasswd_x;
    global String endpoint_x;
    global String error {
        get;
        set;
    }
    global Blob fileBlob {
        get;
        set;
    }
    global Map<String,String> inputHttpHeaders_x;
    global String key {
        get;
        set;
    }
    global String listBucketErrorMsg {
        get;
        set;
    }
    global List<String> ns_map_type_info;
    global Map<String,String> outputHttpHeaders_x;
    global Boolean renderListBucketResults {
        get;
        set;
    }
    global String S3Key {
        get;
        set;
    }
    global String secret {
        get;
        set;
    }
    global String soapBody {
        get;
        set;
    }
    global String tempPolicy {
        get;
        set;
    }
    global AmazonAccess() {

    }
    global void AmazonS3(String key, String secret) {

    }
    global CanaryAMS.S3Manager.CopyObjectResult CopyObject(String SourceBucket, String SourceKey, String DestinationBucket, String DestinationKey, String MetadataDirective, List<CanaryAMS.S3Manager.MetadataEntry> Metadata, CanaryAMS.S3Manager.AccessControlList AccessControlList, Datetime CopySourceIfModifiedSince, Datetime CopySourceIfUnmodifiedSince, List<String> CopySourceIfMatch, List<String> CopySourceIfNoneMatch, String StorageClass, String AWSAccessKeyId, Datetime Timestamp, String Signature, String Credential) {
        return null;
    }
    global CanaryAMS.S3Manager.Status DeleteObject(String Bucket, String Key, String AWSAccessKeyId, Datetime Timestamp, String Signature, String Credential) {
        return null;
    }
    global CanaryAMS.S3Manager.ListBucketResult ListBucket(String Bucket, String Prefix, String Marker, Integer MaxKeys, String Delimiter, String AWSAccessKeyId, Datetime Timestamp, String Signature, String Credential) {
        return null;
    }
    global Boolean PutObjectInline_ACL(String Bucket, String Key, String Data, Integer ContentLength, String accessType, String AWSAccessKeyId, Datetime Timestamp, String Signature, String Credential, String canonicalUserId) {
        return null;
    }
    global String getEncodedPolicy(String policy) {
        return null;
    }
    global String getPolicy(String bucketName, String polKey, String accessTypeSelected, String redirectPageUrl) {
        return null;
    }
    global String getSignedPolicy(String encodedPolicy) {
        return null;
    }
    global List<CanaryAMS.S3Manager.ListEntry> listBucket(String bucketName, String startsWith) {
        return null;
    }
    global String make_sig(String canonicalBuffer) {
        return null;
    }
    global Boolean saveFileToS3(String bucketToUploadObject, String fileName, Blob fileBlob, Integer fileSize, String S3Key) {
        return null;
    }
    global String signature(String op, Datetime now) {
        return null;
    }
}
global class CanonicalUser {
    global List<String> apex_schema_type_info;
    global String DisplayName;
    global List<String> DisplayName_type_info;
    global List<String> field_order_type_info;
    global String ID;
    global List<String> ID_type_info;
    global CanonicalUser() {

    }
}
global class CopyObjectResponse_element {
    global List<String> apex_schema_type_info;
    global CanaryAMS.S3Manager.CopyObjectResult CopyObjectResponse;
    global List<String> CopyObjectResponse_type_info;
    global List<String> field_order_type_info;
    global CopyObjectResponse_element() {

    }
}
global class CopyObjectResult {
    global List<String> apex_schema_type_info;
    global String ETag;
    global List<String> ETag_type_info;
    global List<String> field_order_type_info;
    global Datetime LastModified;
    global List<String> LastModified_type_info;
    global CopyObjectResult() {

    }
}
global class CopyObject_element {
    global CanaryAMS.S3Manager.AccessControlList AccessControlList;
    global List<String> AccessControlList_type_info;
    global List<String> apex_schema_type_info;
    global String AWSAccessKeyId;
    global List<String> AWSAccessKeyId_type_info;
    global List<String> CopySourceIfMatch;
    global List<String> CopySourceIfMatch_type_info;
    global Datetime CopySourceIfModifiedSince;
    global List<String> CopySourceIfModifiedSince_type_info;
    global List<String> CopySourceIfNoneMatch;
    global List<String> CopySourceIfNoneMatch_type_info;
    global Datetime CopySourceIfUnmodifiedSince;
    global List<String> CopySourceIfUnmodifiedSince_type_info;
    global String Credential;
    global List<String> Credential_type_info;
    global String DestinationBucket;
    global List<String> DestinationBucket_type_info;
    global String DestinationKey;
    global List<String> DestinationKey_type_info;
    global List<String> field_order_type_info;
    global List<CanaryAMS.S3Manager.MetadataEntry> Metadata;
    global List<String> Metadata_type_info;
    global String MetadataDirective;
    global List<String> MetadataDirective_type_info;
    global String Signature;
    global List<String> Signature_type_info;
    global String SourceBucket;
    global List<String> SourceBucket_type_info;
    global String SourceKey;
    global List<String> SourceKey_type_info;
    global String StorageClass;
    global List<String> StorageClass_type_info;
    global Datetime Timestamp;
    global List<String> Timestamp_type_info;
    global CopyObject_element() {

    }
}
global class DeleteObjectResponse_element {
    global List<String> apex_schema_type_info;
    global CanaryAMS.S3Manager.Status DeleteObjectResponse;
    global List<String> DeleteObjectResponse_type_info;
    global List<String> field_order_type_info;
    global DeleteObjectResponse_element() {

    }
}
global class DeleteObject_element {
    global List<String> apex_schema_type_info;
    global String AWSAccessKeyId;
    global List<String> AWSAccessKeyId_type_info;
    global String Bucket;
    global List<String> Bucket_type_info;
    global String Credential;
    global List<String> Credential_type_info;
    global List<String> field_order_type_info;
    global String Key;
    global String Signature;
    global List<String> Signature_type_info;
    global Datetime Timestamp;
    global List<String> Timestamp_type_info;
    global DeleteObject_element() {

    }
}
global class ListAllMyBucketsEntry {
    global List<String> apex_schema_type_info;
    global Datetime CreationDate;
    global List<String> CreationDate_type_info;
    global List<String> field_order_type_info;
    global String Name {
        get;
        set;
    }
    global List<String> Name_type_info;
    global ListAllMyBucketsEntry() {

    }
}
global class ListAllMyBucketsList {
    global List<String> apex_schema_type_info;
    global List<CanaryAMS.S3Manager.ListAllMyBucketsEntry> Bucket {
        get;
        set;
    }
    global List<String> Bucket_type_info;
    global List<String> field_order_type_info;
    global ListAllMyBucketsList() {

    }
}
global class ListBucketResponse_element {
    global List<String> apex_schema_type_info;
    global List<String> field_order_type_info;
    global CanaryAMS.S3Manager.ListBucketResult ListBucketResponse;
    global List<String> ListBucketResponse_type_info;
    global ListBucketResponse_element() {

    }
}
global class ListBucketResult {
    global List<String> apex_schema_type_info;
    global List<CanaryAMS.S3Manager.PrefixEntry> CommonPrefixes;
    global List<String> CommonPrefixes_type_info;
    global List<CanaryAMS.S3Manager.ListEntry> Contents;
    global List<String> Contents_type_info;
    global String Delimiter;
    global List<String> Delimiter_type_info;
    global List<String> field_order_type_info;
    global Boolean IsTruncated;
    global List<String> IsTruncated_type_info;
    global String Marker;
    global List<String> Marker_type_info;
    global Integer MaxKeys;
    global List<String> MaxKeys_type_info;
    global List<CanaryAMS.S3Manager.MetadataEntry> Metadata {
        get;
        set;
    }
    global List<String> Metadata_type_info;
    global String Name {
        get;
        set;
    }
    global List<String> Name_type_info;
    global String NextMarker;
    global List<String> NextMarker_type_info;
    global String Prefix;
    global List<String> Prefix_type_info;
    global ListBucketResult() {

    }
}
global class ListBucket_element {
    global List<String> apex_schema_type_info;
    global String AWSAccessKeyId;
    global List<String> AWSAccessKeyId_type_info;
    global String Bucket;
    global List<String> Bucket_type_info;
    global String Credential;
    global List<String> Credential_type_info;
    global String Delimiter;
    global List<String> Delimiter_type_info;
    global List<String> field_order_type_info;
    global String Marker;
    global List<String> Marker_type_info;
    global Integer MaxKeys;
    global List<String> MaxKeys_type_info;
    global String Prefix;
    global List<String> Prefix_type_info;
    global String Signature;
    global List<String> Signature_type_info;
    global Datetime Timestamp;
    global List<String> Timestamp_type_info;
    global ListBucket_element() {

    }
}
global class ListEntry {
    global List<String> apex_schema_type_info;
    global String ETag {
        get;
        set;
    }
    global List<String> ETag_type_info;
    global List<String> field_order_type_info;
    global String Key {
        get;
        set;
    }
    global List<String> Key_type_info;
    global Datetime LastModified {
        get;
        set;
    }
    global List<String> LastModified_type_info;
    global CanaryAMS.S3Manager.CanonicalUser Owner {
        get;
        set;
    }
    global List<String> Owner_type_info;
    global Double Size {
        get;
        set;
    }
    global List<String> Size_type_info;
    global String StorageClass {
        get;
        set;
    }
    global List<String> StorageClass_type_info;
    global ListEntry() {

    }
}
global class MetadataEntry {
    global List<String> apex_schema_type_info;
    global List<String> field_order_type_info;
    global String Name {
        get;
        set;
    }
    global List<String> Name_type_info;
    global String Value;
    global List<String> Value_type_info;
    global MetadataEntry() {

    }
}
global class PrefixEntry {
    global List<String> apex_schema_type_info;
    global List<String> field_order_type_info;
    global String Prefix;
    global List<String> Prefix_type_info;
    global PrefixEntry() {

    }
}
global class S3Request {
    global String error {
        get;
        set;
    }
    global String soapBody {
        get;
        set;
    }
    global S3Request() {

    }
    global System.HttpResponse makeRequest() {
        return null;
    }
}
global class S3domain {
    global List<CanaryAMS.S3Manager.ListEntry> Contents;
    global S3domain() {

    }
}
global class Status {
    global List<String> apex_schema_type_info;
    global Integer Code {
        get;
        set;
    }
    global List<String> Code_type_info;
    global String Description {
        get;
        set;
    }
    global List<String> Description_type_info;
    global List<String> field_order_type_info;
    global Status() {

    }
}
}
