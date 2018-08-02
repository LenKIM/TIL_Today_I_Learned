# 1. 변수

```Php
<html>
<head>
    <title>PHP 테스트</title>
</head>
<body>
<?php
    $a = 1;
    echo  $a + 1;
    echo "<br />";
    $a = 2;
    print $a + 1; ?>
</body>
</html>
```

**echo 와 print는 같은 의미이다.**



```php
<html>
<head>
    <title>PHP 테스트</title>
</head>
<body>
<?php
    $first = "coding";
    echo $first." everybody";
    ?>
</body>
</html>
```

>=> coding everybody



```php
<html>
<head>
    <title>PHP 테스트</title>
</head>
<body>
<?php
    echo (100 + 10).'<br />';
    echo ((100 + 10)/10).'<br />';
    echo (((100 + 10)/10)-10).'<br />';
    echo ((((100 + 10)/10)-10)*10).'<br />'
?>

</body>
</html>
```

> 110
> 11
> 1
> 10

# 2. 상수

```php
<html>
<head>
    <title>PHP 테스트</title>
</head>
<body>
<?php
    define('TITLE', 'PHP Tutorial');
    echo TITLE;
    # define('TITLE', 'JAVA Tutorial'); 에러가 발생한다.
?>

</body>
</html>
```

한번 변수를 선언하면 변경 불가능



