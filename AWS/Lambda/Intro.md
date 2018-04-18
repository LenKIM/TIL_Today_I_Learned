## AWS Lambda



### Goal

- AWS 람다 함수 만들기
- Amazon S3 버킷을 람다 이벤트 소스로 구성
- 객체를 Amazon S3에 업로드하여 람다 함수를 트리거 합니다.
- Amazon ClouldWatch Log를 통해 AWS Lambda S3 기능 모니터링



### 시나리오

\- 서버가 없는 **이미지 축소 응용 프로그램**을 만들어 AWS Lambda로 보여줍니다.

![](https://ws4.sinaimg.cn/large/006tNc79gy1fqh5jo9v5nj30dm09d0td.jpg)

1. 사용자가 Amazon S3(객체 생성 이벤트)에서 소스 버킷을 객체에 업로드 합니다.
2. Amazon S3가 객체 생성 이벤트를 감지합니다.
3. Amazon S3는 람다 함수를 호출하고 이벤트 데이터를 함수 매개 변수로 전달하여 객체 생성 이벤트를 AWS Lambda에 게시합니다.
4. AWS 람다는 람다 함수를 실행합니다.
5. 수신한 이벤트 데이터에서 람다 함수는 소스 버킷 이름과 객체 키 이름을 알고 있습니다. Lambda 함수는 객체를 읽고 그래픽 라이브러리를 사용하여 축소판을 만든 다음 축소판을 대상 버킷에 저장합니다.

만약 위 시나리오대로 흘러간다면 계정에 다음과 같은 리소스를 갖게 됩니다.

![](https://ws3.sinaimg.cn/large/006tNc79gy1fqh5o88pt8j30bj0bh0t9.jpg)

이 실습의 단계에서는 Amazon S3버킷 및 람다 함수를 만드는 방법을 보여줍니다. 그런 다음 크기 조정을 위해 이미지를 업로드하여 서비스를 테스트합니다.



### 작업 1 : Amazon S3 버킷 생성

이 작업에서는 입력용과 출력용의 두가지 Amazon S3 버킷 생성

2개의 버킷을 생성합니다.

\- images-[NUMBER] / images-[NUMBER]-resizes

그 다음 images-[NUMBER]에다가 그림 파일 업로드



### 작업 2 : AWS 람다 함수 만들기

이 작업에서는 Amazon S3에서 이미지를 읽고, 이미지의 크기를 조정한 다음 Amazon S3에 새 이미지를 저장하는 AWS Lambda 함수를 작성합니다.

\- 함수 만들기를 클릭  

\- 생성 기능의 창에서 다음과 같이 실행한다.  

 - Name : Create-Thumbnail

- RunTime : Python 3.6

- 기존 역할 : lambda-execution-role

  \- 위 역할은 Lambda 함수가 Amazon S3에 액세스하여 이미지를 읽고 쓸 수 있는 권한을 부여합니다.

\- 함수 작성 클릭

\- 기능 구성과 함께 페이지가 표시됩니다.  
: AWS Lambda기능은 Amazon Kinesis가 수신하는 데이터 또는 Amazon DynamoDB 데이터베이스에서 업데이트되는 데이터와 같은 활동에 의해 자동으로 **트리거** 될 수 있습니다. 이 실습에서는 Amazon S3 버킷에 새 객체가 만들어 질때마다 람다 함수가 트리거됩니다.

![](https://ws2.sinaimg.cn/large/006tNc79gy1fqh69q6t5nj31a20d23zy.jpg)



\- 이제 람다 함수를 구성 할 것

- Code entry type : Upload a file from Amazon S3
- Runtime : Python 3.6
- Handler : CreateThumbnail.handler
- S3 link URL  
  \> https://s3-us-west-2.amazonaws.com/us-west-2-aws-training/awsu-spl/spl-88/scripts/CreateThumbnail.zip

```python
import boto3
import os
import sys
import urllib
from PIL import Image
import PIL.Image

s3_client = boto3.client('s3')

def resize_image(image_path, resized_path):
    with Image.open(image_path) as image:
        image.thumbnail((128,128))
        image.save(resized_path)

def handler(event, context):
    for record in event['Records']:
        bucket = record['s3']['bucket']['name']
        key = record['s3']['object']['key']
        raw_key = urllib.parse.unquote_plus(key)
        download_path = '/tmp/{}'.format(key)
        upload_path = '/tmp/resized-{}'.format(key)

        s3_client.download_file(bucket, raw_key, download_path)
        resize_image(download_path, upload_path)
        s3_client.upload_file(upload_path,
             '{}-resized'.format(bucket),
             'thumbnail-{}'.format(raw_key),
             ExtraArgs={'ContentType': 'image/jpeg'})
```

위 코드가 하는 역할은 다음과 같다.

- 들어오는 객체의 이름을 포함하는 이벤트를 받습니다.
- 이미지를 로컬 저장소로 다운로드합니다.
- 필로우 라이브러리를 활용하여 이미지의 크기를 조정합니다.
- 크기가 조정된 이미지를 -resized 버킷에 업로드합니다.

\- 베이직 세팅에 설명을 위해서 다음과 같이 작성  
\> Create a thumbnail-sized image

![](https://ws4.sinaimg.cn/large/006tKfTcgy1fqh6hhx4hkj311q0eywij.jpg)

### 작업 3 : 람다 함수 테스트하기

\- 람다함수를 테스트하기 위해서 Test 버튼과, Configure test events 버튼 클릭  

\- 클릭! **Create new test event** 

\- S3 Put 

\- For Event name enter **Upload**

\- sourcebucker의 이름을 S3 버킷의 (resized가 없는) 이름으로 교체합니다.

![](https://ws1.sinaimg.cn/large/006tNc79gy1fqh70lhxoyj30b103xdfp.jpg)
![](https://ws3.sinaimg.cn/large/006tNc79gy1fqh70lat2cj30970430sl.jpg)

\- Create 출력

\- Test 클릭



\- Details 버튼을 클릭하면 다음과 같은 정보들을 알 수 있습니다.  

- Execution duration
- Resources consumed
- Maximum memory used
- Log output

\- S3 서비스에 들어가서 -resized 버킷에서 수정된 그림 확인

\- Open



### 작업 4 : Monitoring and Logging

\- Monitoring Tab.

\- Monitoring 탭에서는 다음과 같은 내용을 확인할 수 있다.

- Invocations : The number of times the function has been invoked
- Duration : How long the function took to execute(in milliseconds)
- Errors : How many times the function failed
- Throttle : When too many functions are invoked simultaneously, they will be throttled. The default is 1000 concurrent executions.
- Iterator age : Measures the age of the last record processed from streaming triggers
- DLQ Errors : Failures when sending messages the the Dead Letter Queue