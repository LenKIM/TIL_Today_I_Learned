

안드로이드는 기존에 자바에서 제공하는 Thread 뿐만 아니라 AsyncTask라는 스레드 객체를 제공
그럼 왜 AsyncTask라는 객체를 왜 만들었을까?

아래 문서에서 발췌

**AsyncTask enables proper and easy use of the UI thread. This class allows to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers.
AsyncTask is designed to be a helper class around Thread and Handler and does not constitute a generic threading framework. AsyncTasks should ideally be used for short operations (a few seconds at the most.)
If you need to keep threads running for long periods of time, it is highly recommended you use the various APIs provided by the java.util.concurrent package such as
Executor, ThreadPoolExecutor and FutureTask.
An asynchronous task is defined by a computation that runs on a background thread and whose result is published on the UI thread.**

http://itmining.tistory.com/7
