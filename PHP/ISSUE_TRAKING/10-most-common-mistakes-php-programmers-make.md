참조 : [https://www.toptal.com/php/10-most-common-mistakes-php-programmers-make](https://www.toptal.com/php/10-most-common-mistakes-php-programmers-make)

1. Leaving dangling   

   ```php
   $arr = array(1, 2, 3, 4);
   foreach ($arr as &$value) {
       $value = $value * 2;
   }
   // $arr is now array(2, 4, 6, 8)
   ```

   The main thing to remember is that `foreach` does not create a scope. Thus, `$value` in the above example is a *reference* within the top scope of the script. On each iteration `foreach` sets the reference to point to the next element of `$array`. After the loop completes, therefore, `$value` still points to the last element of `$array` and remains in scope.

   

   ```php
   $array = [1, 2, 3];
   echo implode(',', $array), "\n";
   
   foreach ($array as &$value) {}    // by reference
   echo implode(',', $array), "\n";
   
   foreach ($array as $value) {}     // by value (i.e., copy)
   echo implode(',', $array), "\n"; 
   
   1,2,3
   1,2,3
   1,2,2
   ```

After going through the first `foreach` loop, `$array` remains unchanged but, as explained above, `$value` is left as a dangling reference to the last element in `$array` (since that `foreach` loop accessed `$value` by *reference*).

As a result, when we go through the second `foreach` loop, “weird stuff” appears to happen. Specifically, since `$value` is now being accessed by value (i.e., by *copy*), `foreach` *copies* each sequential `$array`element into `$value` in each step of the loop. As a result, here’s what happens during each step of the second `foreach` loop:

- *Pass 1:* Copies `$array[0]` (i.e., “1”) into `$value` (which is a reference to `$array[2]`), so `$array[2]` now equals 1. So `$array` now contains [1, 2, 1].
- *Pass 2:* Copies `$array[1]` (i.e., “2”) into `$value` (which is a reference to `$array[2]`), so `$array[2]` now equals 2. So `$array` now contains [1, 2, 2].
- *Pass 3:* Copies `$array[2]` (which now equals “2”) into `$value` (which is a reference to `$array[2]`), so `$array[2]` still equals 2. So `$array` now contains [1, 2, 2].

```php
$arr = array(1, 2, 3, 4);
foreach ($arr as &$value) {
    $value = $value * 2;
}
unset($value);   // $value no longer references $arr[3]
```



2. 