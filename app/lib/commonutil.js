"use strict";
var config = { disableStackTrace: false },//require('../config'),
    //clog = require('./commonlog'),
    _ = require('lodash'),
    CONSTANTS = {DATE_FORMAT: 'yyyy/MM/dd'},//require('../logic/constants'),
    validUrl = require('valid-url'),
    moment = require('moment');

var defaultResult = {
    statusCode: 200,
    success: true,
    data: {},
    message: {
        code: '',
        content: ''
    }
}

exports.createJsonResult = function (res, userResult) {
    res.json(_.merge(defaultResult, userResult));
}

exports.createSuccessJsonResult = function (res, data) {
    console.log(data);
    return exports.createJsonResult(res, {
        success: true,
        data: data,
        message: {}
    });
}

exports.createErrorJsonResult = function (res, msgCode, msgContent, statusCode) {
    return exports.createJsonResult(res, {
        statusCode: exports.isInteger(statusCode) ? statusCode : 200,
        success: false,
        data: {},
        message: {
            code: msgCode,
            content: msgContent
        }
    });
}

// exports.createSaveSuccessResult = function (EntityId, Message) {
//     return {
//         Success: true,
//         EntityId: exports.isInteger(EntityId) ? Number(EntityId) : EntityId,
//         Message: Message
//     }
// }

// exports.createDeleteSuccessResult = function () {
//     return {
//         Success: true
//     };
// }

// exports.createErrorResult = function (err, defaultMessage) {
//     var resErr = {};

//     if (err.AppCode)
//         resErr.AppCode = err.AppCode;
//     else
//         resErr.AppCode = defaultMessage;

//     resErr.Message = err.message || err.Message;

//     if (!config.disableStackTrace) {
//         //special cases
//         if (err.sql) //sql error
//             resErr.Details = err.sql;
//         else if (err.body && err.displayName) //elastic error
//             resErr.Details = err.body;
//             if (err.MessageList)
//               resErr.Details.MessageList=err.MessageList;
//         else if (err.response && err.response.text && err.response.error) //superagent error
//         {
//             let ej = JSON.parse(err.response.text);
//             if (ej.AppCode) {
//                 //if the error that came back from the http service call is one with an AppCode then just doa striaght pass through
//                 resErr.AppCode = ej.AppCode;
//                 resErr.Message = ej.Message;
//                 resErr.Details = ej.Details;
//             }
//             else {
//                 resErr.Details = err.response.text;
//             }
//         }
//         else {
//             resErr.Details = err.stack;
//         }
//     }

//     //standardise the error result object. all type of errors except for unauthorize type, they must constain 3 properties including AppCode, Message, Details.
//     var mustPropertyArray = ['AppCode', 'Message', 'Details'];
//     mustPropertyArray.forEach(function (property) {
//         if (!resErr.hasOwnProperty(property) || resErr[property] === undefined || resErr[property] === null) {
//             resErr[property] = '';
//         }
//     });

//     //clog.log('error', resErr);

//     // MM-4377--[API] Save Sku - unauthorize calls show too much details in response (security concern)
//     if ('MSG_ERR_USER_UNAUTHORIZED' === resErr.AppCode) {
//         delete resErr.Message;
//         delete resErr.Details;
//     }

//     return resErr;
// }

// exports.createErrorResultSimple = function (defaultMessage) {
//     var resErr = {};
//     resErr.AppCode = defaultMessage;
//     resErr.Message = '';
//     resErr.Details = '';
//     //clog.log('error', resErr);
//     return resErr;
// }

exports.checkIdBlank = function (idValue) {
    return !idValue || idValue === '' || idValue === '0';
}

exports.isBlank = function (valer) {
    if (valer === null || valer === undefined || valer === '')
        return true;
    else
        return false;
}

exports.isUUID = function (id) {
    return typeof id === 'string' && id.length === 36;
}

exports.reqUserId = function (req) {
    return req.query.UserId || req.query.userid || req.query.userId ||
        (req.body && req.body.UserId) || req.query.id;
}

exports.reqUserKey = function (req) {
    return req.query.UserKey || req.query.userkey || req.query.userKey ||
        (req.body && req.body.UserKey) || req.query.key;
}
exports.reqUser = function (req) {
    return exports.reqUserKey(req) || exports.reqUserId(req);
}
exports.isReqSelf = function (req) {
    var UserId = exports.reqUserId(req);
    var UserKey = exports.reqUserKey(req);
    return UserId == req.AccessUser.UserId || UserKey == req.AccessUser.UserKey;
}
exports.split = function (data, sep) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data !== 'string') return [data];
    return data.split(sep || ',').map(function (str) {
        return str.trim();
    });
};

/**
 * Check the format is in correct decimal format
 *
 * @param   string|number   val         Input string or number
 * @param   number          maxlength   Maximum length of the decimal
 * @param   number          decNum      Maximum decimcal number
 *
 * @returns Boolean         True if the val is decimal, else return false.
 */
exports.isDecimal = function (val, maxlength, decNum) {
    return exports.isUndefined(val) ? false : !(isNaN(val) || maxlength < Number(val).toFixed(decNum).toString().length || Number(val).toFixed(decNum) != Number(val));
};

/**
 * Check the format is in correct integer format
 *
 * @param   string|number   val         Input string or number
 *
 * @returns Boolean         True if the val is integer, else return false.
 */
exports.isInteger = function (val) {
    return exports.isUndefined(val) ? false : Number.isInteger(!isNaN(val) ? Number(val) : null);
}

/**
 * Check the value if this is TRUE
 *
 * @param   string|number   val         Input string or number
 *
 * @returns Boolean         True if the val is true, else return false.
 */
exports.isTrue = function (val) {
    return exports.isUndefined(val) ? false : (exports.isInteger(val) ? Number(val) === 1 : val.toLowerCase() === 'true');
}

/**
 * Check the value if this is undefined
 *
 * @param   {string|number}   val         Input string or number
 *
 * @returns {boolean}         True if the val is undefined, else return false.
 */
exports.isUndefined = function (val) {
    return typeof val === 'undefined';
};

/**
 * Check the value is valid string
 *
 * @param  {string}    fieldName   Field name
 * @param  {string}    val         Checking value
 * @param  {number}    maxLength   Maximum length
 * @param  {boolean}   isAllowedBlank  True for allowing blank
 *
 * @return {void}
 *
 * @throws {MSG_ERR_REQUIRED_FIELD_MISSING} Missing required field
 * @throws {MSG_ERR_FIELD_NOT_VALID} Invalid string format
 */
exports.validateString = function (fieldName, val, maxLength, isAllowedBlank) {
    if (!isAllowedBlank && exports.isBlank(val)) {
        throw {
            AppCode: 'MSG_ERR_REQUIRED_FIELD_MISSING',
            Message: "Missing " + fieldName
        };
    } else if (!exports.isBlank(val) && val.length > maxLength) {
        throw {
            AppCode: 'MSG_ERR_FIELD_NOT_VALID',
            Message: 'Invalid ' + fieldName + ' (max length = ' + maxLength + ')'
        };
        ;
    }
};

/**
 * Check if the value is not blank and has child
 *
 * @param {string|Object|array} val - Value
 * @returns {boolean}  True if the val has child element, else return false.
 */
exports.hasChild = function (val) {
    return (!exports.isBlank(val) && (val.length > 0 || Object.keys(val).length > 0));
}

/**
 * Check if the value is a valid date format
 *
 * @param {string} val - Value
 * @param {Array.<string>} [formats] - Date format
 * @returns {boolean}  True if the val is valid date, else return false.
 */
exports.isValidDate = function (val, formats) {
    var hasFormat = exports.hasChild(formats);
    if (hasFormat) {
        return moment(val, formats, true).isValid();
    }
    else {
        return !isNaN(Date.parse(val));
    }
}

exports.convertToDate = function (dateStr) {
    return moment(dateStr).format(CONSTANTS.DATE_FORMAT);
};

exports.convertToInt = function (intVal) {
    return parseInt(intVal, 10);
};

/**
 * Add "/" to escape special character in string for SQL query
 *
 * @param {string} val - Value
 * @returns {string}  Escaped value
 */
exports.escape = function (val) {
    return val.replace(/\\/g, "\\\\").replace(/%/g, "\\%").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/_/g, "\\_");
}

/**
 * Check if the value is a valid url format
 *
 * @param {string} val - Value
 * @returns {boolean}  True if the val is valid url, else return false.
 */
exports.isValidUrl = function (val) {
    return validUrl.isWebUri(val) === val;
}

/**
 * Pick keys from object case-insensitive 
 *
 * @param {object} obj - object to pick from
 * @param {array} keys - keys of string
 * @returns {object} subset of values pick from key, case-insensitive
 */
exports.pick = function (obj, keys) {
    if (!obj) return {};

    var obj_ = {};
    var dest = {};
    var cc = 'CultureCode';
    for (var prop in obj) {
        var prop_ = prop === cc ? 'cc' : String(prop).toLowerCase();

        if (obj.hasOwnProperty(prop) && !obj_.hasOwnProperty(prop_)) {
            obj_[prop_] = obj[prop];
        }
    }
    keys.forEach(function (key) {
        var key_ = key === cc ? 'cc' : String(key).toLowerCase();
        if (obj_.hasOwnProperty(key_)) {
            dest[key] = obj_[key_];
        }
    });
    return dest;
}

exports.stringFormat = function (str, param){
    if (Array.isArray(param)){
        var i = param.length;
        while (i--){
            str = str.replace(new RegExp('\\{' + i + '\\}', 'gm'), param[i])
        }
    }
    return str;
}

/**
 * Generator function wrapper for express middleware
 *
 * @param {function*} genFn - generator function
 * @returns {function} express middleware function
 */
exports.middleware = exports.mw = function (genFn) {
    var asyncFn = Q.async(genFn);
    if (genFn.length === 4) {
        // 4 args, return express error handling middleware
        return function (err, req, res, next) {
            return asyncFn.apply(this, arguments).catch(next);
        };
    } else {
        // return express normal middleware
        return function (req, res, next) {
            return asyncFn.apply(this, arguments).catch(next);
        };
    }
};
