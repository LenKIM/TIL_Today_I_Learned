문자열 치환

:[범위]/[매칭문자열]/[치환문자열]/[행범위]

ex): %s/old/new/g



| :s/old/new             | 현재 행의 처음 old를 new로 교체                             |
| ---------------------- | ----------------------------------------------------------- |
| :s/old/new/g           | 현재 행의 모든 old를 new로 교체                             |
| :10, 20s/old/new/g     | 10번째 행부터 20번째 행까지 모든 old를 new로 교체           |
| :-3, +4s/old/new/g     | 현재 커서 위치에서 3행 위부터 4행 아래까지 old를 new로 교체 |
| :%s/old/new/g          | 문서 전체에서 old를 new로 교체                              |
| :%s/old/new/gc         | 문서 전체에서 old를 new로 확인하며 교체                     |
| :g/pattern/s/old/new/g | pattern이 있는 모든 행의 old를 new로 교체                   |
|                        |                                                             |

