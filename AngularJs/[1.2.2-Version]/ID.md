```javascript
// v2_util.js
angular.module('admin.services')
    .factory('Util', [
        function () {
            return {
                makeTextFromTemplate:  .... 생략
            }
        }]);
```

위와 같이 모듈을 생성한 뒤, factory 또는 service를 통해서 services들을 리턴한다.

자바스크립트 파일 이기 때문에 어딘가에 등록해야 된다.

제가 운용하고 있는 홈페이지에서는 `v2_index.jade` 이기 때문에 해당 js파일을 등록시킨다.

```javascript
   // factories here.
        script(src='/js/v2_service.js')
        script(src='/js/factories/SMSTemplateMetaFactory.js')
        script(src='/js/v2_util.js')
```



이렇게 서비스를 만들었다면 어떻게 사용하는가?

```javascript
angular.module('admin.controllers', [
    'ngCookies',
    ...
    'datatables',
]).controller('SendSMSToUserModalCtrl', ['$scope','Util',function(
        $scope,
         Util)
{
    $scope.$watch('smsParams.templateType', function (type) {
       ... 생략
	$scope.smsParams.message = Util.makeTextFromTemplate($scope.smsParams.templateType, selectedEstimation, $scope.templates);
 }
```



아래와 같이 controller에 ` 'Util' `을 등록하고 이를 함수 인자로 받아 활용한다. 이때 인자명은 앞에 스트링만 제대로 했다면 문제 없다.