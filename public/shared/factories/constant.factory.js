'use strict'
/* 
 * Service for centralize the behaviours of status type, user type in AC/ MC 
 */
function ConstantsService() {

    var CONSTANTS = {
        STATUS: {},
        STATUS_NAME: {},
        STATUS_CSS: {},
        
        POST_STATUS: {},
        POST_STATUS_NAME: {},
        POST_STATUS_CSS: {},
        
        NUMBER_INPUT: {
            DEFAULT_MIN: 0,
            DEFAULT_MAX: 99999999
        },
        LANGUAGE:{
            VI:'VI',
            EN:'EN'
        },
        MESSAGE_TYPE:{
            ERROR: 'Error',
            WARNING: 'Warning',
            INFORM: 'information',
            SUCCESS: 'Sucess'
        }       
    };

    /*
     * Internal string to key mapping function
     */
    function str2Key(str) {
        var key = str.replace('/', '').replace(/ /g, '_').replace('-', '_').toUpperCase();
        return key;
    }

    // item type 1: db data 
    // get status Id to name map
    // get status Invaniant to id map
    // get status css class (TO DO)

    //var cc = (sessionStorage.getItem('sessionLang') || 'EN');
    // var generalData = JSON.parse(sessionStorage.getItem('generalData'));
    // var translationData = JSON.parse(sessionStorage.getItem('translationData'));


    // var data = generalData;
    //var t = translationData.TranslationMap;

        
    // CONSTANTS.FILE_UPLOAD_SIZE_BYTES = data.FileUploadSize;
    // CONSTANTS.FILE_UPLOAD_SIZE.DOCUMENT = CONSTANTS.FILE_UPLOAD_SIZE_BYTES.document/1024/1024+'MB';
    // CONSTANTS.FILE_UPLOAD_SIZE.IMAGE = CONSTANTS.FILE_UPLOAD_SIZE_BYTES.image/1024/1024+'MB';
    // CONSTANTS.FILE_UPLOAD_SIZE.ZIP = CONSTANTS.FILE_UPLOAD_SIZE_BYTES.zip/1024/1024+'MB';

    // CONSTANTS.FILE_FORMAT.PROD_IMG = '.jpg,.jpeg,.png,.zip';
    // CONSTANTS.FILE_FORMAT.IMG = '.jpg,.jpeg,.png';
    // CONSTANTS.FILE_FORMAT.DOCUMENT = '.pdf,.doc,.jpg,.png';
    // CONSTANTS.NAME_REGX.PROD_IMG = /^([A-Z0-9-]+)_?([A-Z0-9-_]+)?_([0-9]+)(.\w+)$/i;

//     var postStatusIdMap = {};
//     angular.forEach(statusList, function (status, key) {
//         postStatusIdMap[str2Key(status.StatusNameInvariant)] = status.StatusId;
//         CONSTANTS.POST_STATUS_NAME[status.PostStatusId] = status.PostStatusName;
//     });

//     var paymentStatusIdMap = {};
//     angular.forEach(paymentStatusList, function (status, key) {
//         paymentStatusIdMap[str2Key(status.PaymentStatusNameInvariant)] = status.PaymentStatusId;
//         CONSTANTS.PAYMENT_STATUS_NAME[status.PaymentStatusId] = status.PaymentStatusName;
//     });

//     var parentOrderStatusIdMap = {};
//     angular.forEach(parentOrderStatusList, function (status, key) {
//         parentOrderStatusIdMap[str2Key(status.ParentOrderStatusNameInvariant)] = status.ParentOrderStatusId;
//         CONSTANTS.PARENT_ORDER_STATUS_NAME[status.ParentOrderStatusId] = status.ParentOrderStatusName;
//     });

//     var orderCancelReasonIdMap = {};
//     angular.forEach(orderCancelReasonList, function (status, key) {
//         orderCancelReasonIdMap[str2Key(status.OrderCancelReasonName)] = status.OrderCancelReasonId;
//         CONSTANTS.ORDER_CANCEL_REASON_NAME[status.OrderCancelReasonId] = status.OrderCancelReasonName;
//     });

//     var orderStatusIdMap = {};
//     angular.forEach(orderStatusList, function (status, key) {
//         orderStatusIdMap[str2Key(status.OrderStatusNameInvariant)] = status.OrderStatusId;
//         CONSTANTS.ORDER_STATUS_NAME[status.OrderStatusId] = status.OrderStatusName;
//     });

//     var orderShipmentStatusIdMap = {};
//     angular.forEach(orderShipmentStatusList, function (status, key) {
//         orderShipmentStatusIdMap[str2Key(status.OrderShipmentStatusNameInvariant)] = status.OrderShipmentStatusId;
//         CONSTANTS.ORDER_SHIPMENT_STATUS_NAME[status.OrderShipmentStatusId] = status.OrderShipmentStatusName;
//     });

//     var orderReturnStatusIdMap = {};
//     angular.forEach(orderReturnStatusList, function (status, key) {
//         orderReturnStatusIdMap[str2Key(status.OrderReturnStatusNameInvariant)] = status.OrderReturnStatusId;
//         CONSTANTS.ORDER_RETURN_STATUS_NAME[status.OrderReturnStatusId] = status.OrderReturnStatusName;
//     });

//     var orderReturnReasonMap = {};
//     angular.forEach(orderReturnReasonList, function (status, key) {
//         orderReturnReasonMap[str2Key(status.OrderReturnReasonNameInvariant)] = status.OrderReturnReasonId;
//         CONSTANTS.ORDER_RETURN_REASON_NAME[status.OrderReturnReasonId] = status.OrderReturnReasonName;
//     });

//     var orderReturnConditionMap = {};
//     angular.forEach(orderReturnConditionList, function (status, key) {
//         orderReturnConditionMap[str2Key(status.OrderReturnConditionNameInvariant)] = status.OrderReturnConditionId;
//         CONSTANTS.ORDER_RETURN_CONDITION_NAME[status.OrderReturnConditionId] = status.OrderReturnConditionName;
//     });

//     var orderReturnResponseMap = {};
//     angular.forEach(orderReturnResponseList, function (status, key) {
//         orderReturnResponseMap[str2Key(status.OrderReturnResponseNameInvariant)] = status.OrderReturnResponseId;
//         CONSTANTS.ORDER_RETURN_RESPONSE_NAME[status.OrderReturnResponseId] = status.OrderReturnResponseName;
//     });

//     var statusIdMap = {};
//     angular.forEach(statusList, function (status, key) {
//         statusIdMap[str2Key(status.StatusNameInvariant)] = status.StatusId;
// //            CONSTANTS.STATUS_NAME[status.StatusId] = status.StatusName;
//     });

//     var inventoryStatusIdMap = {};
//     angular.forEach(inventoryStatusList, function (status, key) {
//         inventoryStatusIdMap[str2Key(status.InventoryStatusNameInvariant)] = status.InventoryStatusId;
//         CONSTANTS.INVENTORY_STATUS_NAME[status.InventoryStatusId] = status.InventoryStatusName;
//     });

//     var userTypeMap = {};
//     angular.forEach(userTypeList, function (userType, key) {
//         userTypeMap[str2Key(userType.UserTypeNameInvariant)] = userType.UserTypeId;
//     });

//     var merchantTypeMap = {};
//     angular.forEach(merchantTypeList, function (merchantType, key) {
//         merchantTypeMap[str2Key(merchantType.MerchantTypeNameInvariant)] = merchantType.MerchantTypeId;
//         CONSTANTS.MERCHANT_TYPE_NAME[merchantType.MerchantTypeId] = merchantType.MerchantTypeName;
//     });

//     var securityGroupMap = {};
//     angular.forEach(securityGroupList, function (securityGroup, key) {
//         securityGroupMap[str2Key(securityGroup.SecurityGroupNameInvariant)] = securityGroup.SecurityGroupId;
//     });

//     angular.forEach(inventoryLocationTypeList, function (inventoryLocationType, key) {
//         CONSTANTS.INVENTORY_LOCATION_TYPE[str2Key(inventoryLocationType.InventoryLocationTypeNameInvariant)] = inventoryLocationType.InventoryLocationTypeId;
//         CONSTANTS.INVENTORY_LOCATION_TYPE_NAME[inventoryLocationType.InventoryLocationTypeId] = inventoryLocationType.InventoryLocationTypeName;
//     });

//     CONSTANTS.POST_STATUS = {
//         ACTIVE: postStatusIdMap['ACTIVE'],
//         PENDING: postStatusIdMap['PENDING'],
//         INACTIVE: postStatusIdMap['INACTIVE']
//     };

//     CONSTANTS.POST_STATUS_NAME[CONSTANTS.POST_STATUS.ACTIVE] = t.LB_MC_POST_STATUS_ACTIVE;
//     CONSTANTS.POST_STATUS_NAME[CONSTANTS.POST_STATUS.PENDING] = t.LB_MC_POST_STATUS_PENDING;
//     CONSTANTS.POST_STATUS_NAME[CONSTANTS.POST_STATUS.INACTIVE] = t.LB_MC_POST_STATUS_INACTIVE;

//     CONSTANTS.POST_STATUS_CSS[CONSTANTS.POST_STATUS.ACTIVE] = 'label-success';
//     CONSTANTS.POST_STATUS_CSS[CONSTANTS.POST_STATUS.PENDING] = 'label-warning';
//     CONSTANTS.POST_STATUS_CSS[CONSTANTS.POST_STATUS.INACTIVE] = 'label-default';

//     CONSTANTS.STATUS = {
//         DELETED: statusIdMap['DELETED'],
//         ACTIVE: statusIdMap['ACTIVE'],
//         PENDING: statusIdMap['PENDING'],
//         INACTIVE: statusIdMap['INACTIVE']
//     };

//     CONSTANTS.STATUS_NAME['-1'] = t.LB_ALL_STATUS;
//     CONSTANTS.STATUS_NAME[CONSTANTS.STATUS.DELETED] = t.LB_DELETE;
//     CONSTANTS.STATUS_NAME[CONSTANTS.STATUS.ACTIVE] = t.LB_ACTIVE;
//     CONSTANTS.STATUS_NAME[CONSTANTS.STATUS.PENDING] = t.LB_PENDING;
//     CONSTANTS.STATUS_NAME[CONSTANTS.STATUS.INACTIVE] = t.LB_INACTIVE;

//     CONSTANTS.STATUS_CSS[CONSTANTS.STATUS.DELETED] = 'label-danger';
//     CONSTANTS.STATUS_CSS[CONSTANTS.STATUS.ACTIVE] = 'label-success';
//     CONSTANTS.STATUS_CSS[CONSTANTS.STATUS.PENDING] = 'label-warning';
//     CONSTANTS.STATUS_CSS[CONSTANTS.STATUS.INACTIVE] = 'label-default';

//     CONSTANTS.PAYMENT_STATUS = {
//         UNPAID: paymentStatusIdMap['UNPAID'],
//         PAID_IN_FULL: paymentStatusIdMap['PAIDINFULL'],
//         OVERPAID: paymentStatusIdMap['OVERPAID'],
//         COD: paymentStatusIdMap['COD']
//     };

//     CONSTANTS.PAYMENT_STATUS_CSS[CONSTANTS.PAYMENT_STATUS.UNPAID] = 'label label-danger';
//     CONSTANTS.PAYMENT_STATUS_CSS[CONSTANTS.PAYMENT_STATUS.PAID_IN_FULL] = 'label label-success';
//     CONSTANTS.PAYMENT_STATUS_CSS[CONSTANTS.PAYMENT_STATUS.OVERPAID] = 'label label-danger';
//     CONSTANTS.PAYMENT_STATUS_CSS[CONSTANTS.PAYMENT_STATUS.COD] = 'label label-success';


//     CONSTANTS.PARENT_ORDER_STATUS = {
//         INITIATED: parentOrderStatusIdMap['INITIATED'],
//         OPEN: parentOrderStatusIdMap['OPEN'],
//         CLOSED: parentOrderStatusIdMap['CLOSED'],
//         EXPIRED: parentOrderStatusIdMap['EXPIRED']
//     };

//     CONSTANTS.PARENT_ORDER_STATUS_CSS[CONSTANTS.PARENT_ORDER_STATUS.INITIATED] = 'label label-danger';
//     CONSTANTS.PARENT_ORDER_STATUS_CSS[CONSTANTS.PARENT_ORDER_STATUS.OPEN] = 'label label-warning';
//     CONSTANTS.PARENT_ORDER_STATUS_CSS[CONSTANTS.PARENT_ORDER_STATUS.CLOSED] = 'label label-success';
//     CONSTANTS.PARENT_ORDER_STATUS_CSS[CONSTANTS.PARENT_ORDER_STATUS.EXPIRED] = 'label label-danger';

//     CONSTANTS.ORDER_STATUS = {
//         INITIATED: orderStatusIdMap['INITIATED'],
//         CREATED: orderStatusIdMap['CREATED'],
//         CONFIRMED: orderStatusIdMap['CONFIRMED'],
//         PARTIAL: orderStatusIdMap['PARTIAL_SHIPPED'],
//         SHIPPED: orderStatusIdMap['SHIPPED'],
//         RECEIVED: orderStatusIdMap['RECEIVED'],
//         CANCELLED: orderStatusIdMap['CANCELLED'],
//         CLOSED: orderStatusIdMap['CLOSED']
//     };

//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.INITIATED] = 'label label-danger';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.CREATED] = 'label label-danger';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.CONFIRMED] = 'label label-success';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.PARTIAL] = 'label label-danger';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.SHIPPED] = 'label label-success';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.RECEIVED] = 'label label-success';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.CANCELLED] = 'label label-danger';
//     CONSTANTS.ORDER_STATUS_CSS[CONSTANTS.ORDER_STATUS.CLOSED] = 'label label-danger';


//     CONSTANTS.ORDER_SHIPMENT_STATUS = {
//         DELETED: orderShipmentStatusIdMap['DELETED'],
//         SHIPPED: orderShipmentStatusIdMap['SHIPPED'],
//         PENDING_SHIPMENT: orderShipmentStatusIdMap['PENDING_SHIPMENT'],
//         PENDING_COLLECTION: orderShipmentStatusIdMap['PENDING_COLLECTION'],
//         RECEIVED: orderShipmentStatusIdMap['RECEIVED']
//     };

//     CONSTANTS.ORDER_SHIPMENT_STATUS_CSS[CONSTANTS.ORDER_SHIPMENT_STATUS.DELETED] = 'label label-success';
//     CONSTANTS.ORDER_SHIPMENT_STATUS_CSS[CONSTANTS.ORDER_SHIPMENT_STATUS.SHIPPED] = 'label label-success';
//     CONSTANTS.ORDER_SHIPMENT_STATUS_CSS[CONSTANTS.ORDER_SHIPMENT_STATUS.PENDING_SHIPMENT] = 'label label-warning';
//     CONSTANTS.ORDER_SHIPMENT_STATUS_CSS[CONSTANTS.ORDER_SHIPMENT_STATUS.PENDING_COLLECTION] = 'label label-warning';
//     CONSTANTS.ORDER_SHIPMENT_STATUS_CSS[CONSTANTS.ORDER_SHIPMENT_STATUS.RECEIVED] = 'label label-success';

//     CONSTANTS.ORDER_RETURN_STATUS = {
//         RETURN_CLOSED: orderReturnStatusIdMap['RETURN_CLOSED'],
//         RETURN_AUTHORIZED: orderReturnStatusIdMap['RETURN_AUTHORIZED'],
//         RETURN_REQUESTED: orderReturnStatusIdMap['RETURN_REQUESTED'],
//         RETURN_DECLINED: orderReturnStatusIdMap['RETURN_DECLINED'],
//         RETURN_REJECTED: orderReturnStatusIdMap['RETURN_REJECTED'],
//         RETURN_ACCEPTED: orderReturnStatusIdMap['RETURN_ACCEPTED']
//     };

//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_CLOSED] = 'label label-success';
//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_AUTHORIZED] = 'label label-success';
//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_REQUESTED] = 'label label-danger';
//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_DECLINED] = 'label label-danger';
//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_REJECTED] = 'label label-danger';
//     CONSTANTS.ORDER_RETURN_STATUS_CSS[CONSTANTS.ORDER_RETURN_STATUS.RETURN_ACCEPTED] = 'label label-success';


//     CONSTANTS.ORDER_RETURN_REASON = {
//         CONSUMER_REJECT_THE_ORDER: orderReturnReasonMap['CONSUMER_REJECT_THE_ORDER'],
//         LATE_SHIPMENT: orderReturnReasonMap['LATE_SHIPMENT'],
//         PRODUCT_IS_MISSING: orderReturnReasonMap['PRODUCT_IS_MISSING'],
//         PRODUCT_DIFFERS_FROM_DESCRIPTION: orderReturnReasonMap['PRODUCT_DIFFERS_FROM_DESCRIPTION'],
//         PRODUCT_QUALITY_IS_NOT_GOOD: orderReturnReasonMap['PRODUCT_QUALITY_IS_NOT_GOOD'],
//         PRODUCT_IS_DAMAGE: orderReturnReasonMap['PRODUCT_IS_DAMAGE'],
//         SIZE_COLOR_DOES_NOT_FIT: orderReturnReasonMap['SIZE_COLOR_DOES_NOT_FIT'],
//         DUPLICATED_ORDER: orderReturnReasonMap['DUPLICATED_ORDER'],
//         WRONG_ORDER: orderReturnReasonMap['WRONG_ORDER'],
//         CONSUMER_CHANGES_MIND: orderReturnReasonMap['CONSUMER_CHANGES_MIND'],
//         MERCHANT_REFUSES_TO_ISSUE_FA_PIAO: orderReturnReasonMap['MERCHANT_REFUSES_TO_ISSUE_FA_PIAO'],
//         OTHERS: orderReturnReasonMap['OTHERS']
//     };

//     CONSTANTS.INVENTORY_STATUS = {
//         IN_STOCK: inventoryStatusIdMap['INSTOCK'],
//         LOW_STOCK: inventoryStatusIdMap['LOWSTOCK'],
//         OUT_OF_STOCK: inventoryStatusIdMap['OUTOFSTOCK'],
//         NA: inventoryStatusIdMap['NA']
//     };

//     CONSTANTS.INVENTORY_STATUS_CSS[CONSTANTS.INVENTORY_STATUS.IN_STOCK] = 'label label-success';
//     CONSTANTS.INVENTORY_STATUS_CSS[CONSTANTS.INVENTORY_STATUS.LOW_STOCK] = 'label label-warning';
//     CONSTANTS.INVENTORY_STATUS_CSS[CONSTANTS.INVENTORY_STATUS.OUT_OF_STOCK] = 'label label-danger';
//     CONSTANTS.INVENTORY_STATUS_CSS[CONSTANTS.INVENTORY_STATUS.NA] = '';

//     //since usertype table is dropped, we hardcode usertypeid here for temp matching
//     CONSTANTS.USER_TYPE = {
//         MM: 1,
//         MERCHANT: 2
//     };

//     CONSTANTS.MERCHANT_TYPE = {
//         BRAND_FLAGSHIP: merchantTypeMap['BRAND_FLAGSHIP'],
//         MONO_BRAND_AGENT: merchantTypeMap['MONO_BRAND_AGENT'],
//         MULTI_BRAND_AGENT: merchantTypeMap['MULTI_BRAND_AGENT']
//     };

//     CONSTANTS.USER_SECURITY_GROUP = {
//         MM_ADMIN: securityGroupMap['MM_ADMIN'],
//         MM_CUSTOMER_SERVICE: securityGroupMap['MM_CUSTOMER_SERVICE'],
//         MM_FINANCE: securityGroupMap['MM_FINANCE'],
//         MM_TECH_OPS: securityGroupMap['MM_TECH_OPS'],
//         MERCHANT_FINANCE: securityGroupMap['MERCHANT_FINANCE'],
//         MERCHANT_ADMIN: securityGroupMap['MERCHANT_ADMIN'],
//         MERCHANT_CUSTOMER_SERVICE: securityGroupMap['MERCHANT_CUSTOMER_SERVICE'],
//         MERCHANT_CONTENT_MANAGER: securityGroupMap['MERCHANT_CONTENT_MANAGER'],
//         MERCHANT_MERCHANDISER: securityGroupMap['MERCHANT_MERCHANDISER'],
//         MERCHANT_ORDER_PROCESSSING: securityGroupMap['MERCHANT_ORDER_PROCESSSING'],
//         MERCHANT_PRODUCT_RETURN: securityGroupMap['MERCHANT_PRODUCT_RETURN']
//     };

//     CONSTANTS.CONTENT_PAGE_TYPE_NAME['-1'] = t.LB_SELECT_PAGE_TYPE;
//     CONSTANTS.CONTENT_PAGE_TYPE_NAME[CONSTANTS.CONTENT_PAGE_TYPE.STATIC_PAGE] = t.LB_STATIC_PAGE;
//     CONSTANTS.CONTENT_PAGE_TYPE_NAME[CONSTANTS.CONTENT_PAGE_TYPE.MAGAZINE] = t.LB_MAGAZINE;
    
//     CONSTANTS.CONTENT_PAGE_COLLECTION_NAME['-1'] = t.LB_ALL_PAGE_CATEGORIES;
//     CONSTANTS.CONTENT_PAGE_COLLECTION_NAME[CONSTANTS.CONTENT_PAGE_COLLECTION.TRENDS] = t.LB_CA_TREND;
//     CONSTANTS.CONTENT_PAGE_COLLECTION_NAME[CONSTANTS.CONTENT_PAGE_COLLECTION.FEATURE] = t.LB_CA_FEATURE;
//     CONSTANTS.CONTENT_PAGE_COLLECTION_NAME[CONSTANTS.CONTENT_PAGE_COLLECTION.CURATOR] = t.LB_CA_CURATOR;
//     CONSTANTS.CONTENT_PAGE_COLLECTION_NAME[CONSTANTS.CONTENT_PAGE_COLLECTION.STYLING] = t.LB_STYLING;
    
//         // DEFAULT value for pagination
//         CONSTANTS.DEFAULT_PAGE_NO = 1;
//     CONSTANTS.DEFAULT_PAGE_COUNT = 5;
//     CONSTANTS.ITEMS_PER_PAGE = [20, 50, 100];
//     CONSTANTS.DEFAULT_ITEMS_PER_PAGE = CONSTANTS.ITEMS_PER_PAGE[0];
//     CONSTANTS.PAGE_SPAN = 4;

//     CONSTANTS.PERPETUAL_ALLOCATION_NO = data.PerpetualAllocationNo;

//     CONSTANTS.DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

//     CONSTANTS.EDIT_POST_ACTION ={
//         DELETE_POST: 1,
//         CHANGE_STATUS_POST: 2,
//         DELETE_COMMENT: 3
//     };

//     CONSTANTS.AMBASSADOR_CONTENT_GROUP = 1000;
//     CONSTANTS.MERCHANT_ROLE = {
//         AMBASSADOR:8,
//         CONTENT:9
//     };

    // item type 2: view page defined filter
    // make constant in the corresponding controller
    
    return CONSTANTS;
}

app.factory('CONSTANTS', ConstantsService);