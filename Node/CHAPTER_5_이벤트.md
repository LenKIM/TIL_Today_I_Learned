
Node.js에서는 이벤트를 다 외운다는 것보단

어떻게 연결해서 사용하는 가에 초점을 맞추도록 하자.

#### 5.1 이벤트 연결

```
<script>
// Window 객체에 load 이벤트를 연결
Window.addEventListener('load', function() {

  });
  </script>

템플릿 메서드를 사용하면
  <script>
  // Window 객체에 load 이벤트를 연결
  Window.addEventListener('load', () => {

    });
    </script>
  ```

  
