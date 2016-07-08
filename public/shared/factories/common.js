app.factory('authInterceptor', ['$rootScope', '$q', '$location',
	function ($rootScope, $q, $location) {
	  return {
	    // Intercept 401s and redirect to passive logout page
	    responseError: function(response) {
	      if (response.status === 401) {
	        // Remove any stale tokens (in rootScope and sessionStorage)
	        $rootScope.tokenDelete();
	        $rootScope.User = null;

	        $location.path('/login').search({err: 'MSG_PASSIVE_LOGOUT'});
	        return $q.reject(response);
	      } else if (response.status === 403) {
			  $location.path('/home').search({msg: 'MSG_ERR_USER_UNAUTHORIZED', type: 'danger'});
			  return $q.reject(response);
		  }
	      else {
	        return $q.reject(response);
	      }
	    }
	  };
	}
])

app.factory('MainService', ['$rootScope', '$http', '$filter', '$q',
	function($rootScope, $http, $filter, $q) {
		var refData = {
	    	ResourceMap: null
		};
	  return {
	    initialize: function(readonly) {
	      if (!refData.ResourceMap) {
	        var cultureCode = (sessionStorage.getItem('sessionLang') || 'EN');
	        if ($rootScope.User && $rootScope.User.CultureCode){
	        	cultureCode = $rootScope.User.CultureCode;	
	        }
	      	var resourcePromise = $http.get($rootScope.servicePrefix + '/resource/translation', {
	            params: {
	                cultureCode: cultureCode
	            }
	        }).then(function (result) {
	        	console.log('--- MainService ');
	        	console.log(result);
	        	var resourceMap = Util.convertArrayToKeyValue(result.data.data, 'Code', 'Value');
	        	if(readonly){
		          	return {
		          		ResourceMap: resourceMap
		          	}
		        }else{
		          	refData.ResourceMap = resourceMap;
		        }
	            $rootScope.ResourceMap = resourceMap;
	            return refData;
	        })
	        .catch(function (errObj, status, headers, config) {
	        	console.log(errObj);
	        });
	        return resourcePromise;
	      }
	      else {
	   		$rootScope.ResourceMap = refData.resourceMap;
	        return refData;
	      }
	    }
	  }
	}
])

app.factory('tokenService', ['$rootScope', '$state', '$q', '$location', 'jwtHelper', '$uibModal', '$http', 'Constants','MainService',
	function ($rootScope, $state, $q, $location, jwtHelper, $uibModal, $http, Constants,MainService) {
	  return {
	    changeLanguage : function(language){
	    	if(!language){ language = "EN"; }
		    sessionStorage.setItem('sessionLang', language);
		    if($rootScope.User){
		      $rootScope.User.CultureCode = language;		      
		      return true;
		    }
		    window.location.reload();
		  },
		  saveUserData : function(obj, updateSessionLang){
		    var tmpUserData = sessionStorage.getItem('UserData');
		    if(tmpUserData != null){
		         tmpUserData = JSON.parse( tmpUserData );
		         var keys = Object.keys(obj);
		         keys.forEach(function(k){
		          tmpUserData[ k ] = obj[ k ];
		         });
		         sessionStorage.setItem('UserData', JSON.stringify( tmpUserData ));
             $rootScope.User = tmpUserData;
		    }

		    if(updateSessionLang && obj.CultureCode){
		      sessionStorage.setItem('sessionLang', obj.CultureCode);
		    }
		  },
		  tokenSave : function() {
		    var tokenString = $rootScope.AuthToken; //JSON.stringify($rootScope.AuthToken);
		    if( $rootScope.User ){
		      sessionStorage.setItem('UserData', JSON.stringify( $rootScope.User ));
		      if($rootScope.User && $rootScope.User.CultureCode){
		      	sessionStorage.setItem('sessionLang', $rootScope.User.CultureCode);
		      }
		    }
		    sessionStorage.setItem('AuthToken', tokenString);
		  },
		  tokenGet : function(isAdmin) {
		    var AuthToken = sessionStorage.getItem('AuthToken');
		    var UserData = sessionStorage.getItem('UserData');

		    if (AuthToken != null && UserData != null) {
		      $rootScope.AuthToken = AuthToken;
		      var tokenPayload = jwtHelper.decodeToken($rootScope.AuthToken);
		      $rootScope.User = JSON.parse( UserData );
				if ($rootScope.User && $rootScope.User.MerchantId && isAdmin) {
					delete $rootScope.User.MerchantId;
				}
		    }
		  },
		  tokenDelete : function() {
		    $rootScope.AuthToken = null;
		    sessionStorage.removeItem('AuthToken');
		  },
		  isPlainPages: function () {
			  return $state.is('forgotPass') || $state.is('changeMobileNo') || $state.is('activateAccount');
		  },
		  isAdmin : function() {
		  	return true;
		    //var user = $rootScope.User;
		    // if(user){
		    //   return _.contains(user.UserSecurityGroupArray, CONSTANTS.USER_SECURITY_GROUP.MM_ADMIN);
		    // }else{
		    //   return false;
		    // }
		  },
		  // isMerchantAdmin: function () {
			 //  var user = $rootScope.User;
			 //  if(user && user.UserMerchantSecurityGroupArray && user.UserMerchantSecurityGroupArray[user.MerchantId]){
				//   return _.contains(user.UserMerchantSecurityGroupArray[user.MerchantId], CONSTANTS.USER_SECURITY_GROUP.MERCHANT_ADMIN);
			 //  }else{
				//   return false;
			 //  }
		  // },
		  // isMMUser: function () {
			 //  var user = $rootScope.User;
			 //  if(user){
				//   return user.IsMm;
			 //  }else{
				//   return false;
			 //  }
		  // },
		  // isMerchantUser: function () {
			 //  var user = $rootScope.User;
			 //  if(user){
				//   return user.IsMerchUser;
			 //  }else{
				//   return false;
			 //  }
		  // },
		  // isSelf: function (userKey) {
			 //  var user = $rootScope.User;
			 //  if(user){
				//   return user.UserKey === userKey;
			 //  }else{
				//   return false;
			 //  }
		  // },
		  // isPendingMerchant: function (merchant) {
			 //  if (merchant) {
				//   return merchant.StatusId === CONSTANTS.STATUS.PENDING
			 //  }

			 //  return $rootScope.User && $rootScope.User.Merchant &&
				//   $rootScope.User.Merchant.StatusId === CONSTANTS.STATUS.PENDING;
		  // },
		  // isInactiveMerchant: function (merchant) {
			 //  if (merchant) {
				//   return merchant.StatusId === CONSTANTS.STATUS.INACTIVE
			 //  }

			 //  return $rootScope.User && $rootScope.User.Merchant &&
				//   $rootScope.User.Merchant.StatusId === CONSTANTS.STATUS.INACTIVE;
		  // },
		  // isDefaultMerchant: function () {
			 //  return $rootScope.User.DefaultMerchant &&
				//   $rootScope.User.DefaultMerchant.MerchantId === $rootScope.User.MerchantId;
		  // },
		  // switchMerchant: function (merchantId) {
			 //  if (merchantId && merchantId !== $rootScope.User.MerchantId) {
				//   $rootScope.User.Merchant = _.find($rootScope.User.Merchants, function (m) {
				// 	  return m.MerchantId === merchantId;
				//   });
				//   $rootScope.User.MerchantId = merchantId;
				//   $rootScope.tokenSave();

				//   $state.go('merchHome');
			 //  }
		  // },
			signoutCleanup: function(){
				var mainService = MainService.initialize();
				//set login Language
				$rootScope.preference.lang = $rootScope.User.CultureCode;
				// Remove any stale tokens (in rootScope and sessionStorage)
				$rootScope.tokenDelete();
				sessionStorage.removeItem('UserData');
				$rootScope.User = null;
				$rootScope.menus = null;//when logout, it need clear the menus data.
				mainService.UserReference = null;// When logout, it need to clear the reference data.
			},
		  // exportProducts: function () {
			 //  $modal.open({
				//   templateUrl: "/shared/views/export-product.html",
				//   keyboard: false,
				//   backdrop: 'static',
				//   resolve: {
				// 	  mainService: function () {
				// 		  return MainService.initialize();
				// 	  }
				//   },
				//   controller: ['$scope', 'mainService',
				// 	  function ($scope, mainService) {
				// 		  // Translation data
				// 		  $scope.t = mainService.UserReference.TranslationMap;
				// 		  $scope.confirm = function () {
				// 			  // this value is undefined;
				// 			  // var id = $scope.merchantId; //merchant id
				// 			  $scope.isConfirmBtnDisabled=true;
				// 			  var id = $rootScope.User.MerchantId;
				// 			  var cc = $rootScope.User.CultureCode;
				// 			  var url = $rootScope.servicePrefix + '/product/sku/sheet/export?merchantid=' + id + '&cc=' + cc;
				// 			  if (window.console) {
				// 				  console.log(url);
				// 			  }
				// 			  $http.get(url).then(function (response) {
				// 				  if (response.status === 200) {
				// 					  window.location = "/api/document/sheets?folder=sheetexports&file=" + response.data.fileName + '&merchantid=' + id + '&AccessToken=Bearer ' + $rootScope.AuthToken;
				// 					  $scope.$dismiss();
				// 				  }
				// 			  });
				// 			  // window.location.assign(url);
				// 			  //window.open(url, "_blank");
				// 		  };
				// 		  $scope.cancel = function () {
				// 			  $scope.$dismiss();
				// 		  };
				// 	  }
				//   ]
			 //  });
		  // }
	  };
	}
])

app.factory('DialogService', ['$modal', 'MainService', function ($modal, MainService){
  var mainService = MainService.initialize();
  return {
    confirm: function(title, content, confirmCallback, cancelCallback, confirmBtnText, cancelBtnText){
      $modal.open({
        templateUrl: "/shared/views/confirm-common.html",
        backdrop: 'static',
        controller: ['$scope', function ($scope) {
          	$scope.title=title;
          	$scope.content=content;
			$scope.confirmBtnText=confirmBtnText;
			$scope.cancelBtnText=cancelBtnText;
          	$scope.t = mainService.UserReference.TranslationMap;
          	$scope.confirm = function () {
            confirmCallback();
            $scope.$dismiss();
          };
          $scope.cancel = function () {
						if (cancelCallback) {
							cancelCallback();
						}
            $scope.$dismiss();
          };
          $scope.closeMessage = function(index) {
            $scope.messages.splice(index, 1);
          };
        }]
      });
    },
		alert: function(title, content, cancelCallback){
      $modal.open({
        templateUrl: "/shared/views/alert-common.html",
        backdrop: 'static',
        controller: ['$scope', function ($scope) {
          $scope.title=title;
          $scope.content=content;
          $scope.t = mainService.UserReference.TranslationMap;          
          $scope.cancel = function () {
						if (cancelCallback) {
							cancelCallback();
						}
            $scope.$dismiss();
          };
          $scope.closeMessage = function(index) {
            $scope.messages.splice(index, 1);
          };
        }]
      });
    }
  }
}]);
