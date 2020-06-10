![image-20190611160532532](http://ww2.sinaimg.cn/large/006tNc79gy1g3x8c2p2cuj30sf0blgnn.jpg)



.gz 파일을 압축 안풀고 볼려고 하니까 에러가 발생했음.



# .gz로 된 파일은 어떻게 압축을 풀까?

```scala
import java.io.{File, FileInputStream, FileOutputStream, PrintWriter}
import java.sql.Timestamp
import java.text.SimpleDateFormat
import java.util.zip.{GZIPInputStream, GZIPOutputStream}

import scala.io.Source

object DatetimeCheck {
  def main(args: Array[String]): Unit = {

    val fileList = List(
      "access_2019-05-03.txt",
    )
    val pattern = "dd/MMM/yyyy:HH:mm:ssZ"
    val sdf = new SimpleDateFormat(pattern)
    var date = "-"
    fileList.foreach(abc => {
      val localFilePath = "/Users/lenkim/work-place/c2/" + abc
      val files = new File(localFilePath)
      files.listFiles().foreach(f => {
        val in = new GZIPInputStream(new FileInputStream("test.gz"))
        val fos = new FileOutputStream("test2.gz")
        val gzos = new GZIPOutputStream(fos)
        val w = new PrintWriter(gzos)
        folr (line <- Source.fromInputStream(in).getLines()) {
          println(line)
          w.write(line + "\n")
        }
      })
    })
  }
}
```





GZ는 무엇?

**gzip** is a [file format](https://en.wikipedia.org/wiki/File_format) and a [software application](https://en.wikipedia.org/wiki/Software_application) used for [file compression and decompression](https://en.wikipedia.org/wiki/Data_compression). The program was created by [Jean-loup Gailly](https://en.wikipedia.org/wiki/Jean-loup_Gailly) and [Mark Adler](https://en.wikipedia.org/wiki/Mark_Adler) as a [free software](https://en.wikipedia.org/wiki/Free_software) replacement for the [compress](https://en.wikipedia.org/wiki/Compress) program used in early [Unix](https://en.wikipedia.org/wiki/Unix) systems, and intended for use by [GNU](https://en.wikipedia.org/wiki/GNU) (the "g" is from "GNU"). Version 0.1 was first publicly released on 31 October 1992, and version 1.0 followed in February 1993.



**gzip** 은 [파일 압축 및 압축 해제에](https://en.wikipedia.org/wiki/Data_compression) 사용되는 [파일 형식](https://en.wikipedia.org/wiki/File_format) 및 [소프트웨어 응용 프로그램](https://en.wikipedia.org/wiki/Software_application) 입니다. 이 프로그램에 의해 만들어진 [장 루프 게 일리](https://en.wikipedia.org/wiki/Jean-loup_Gailly) 와 [마크 애들러](https://en.wikipedia.org/wiki/Mark_Adler) A와 [무료 소프트웨어](https://en.wikipedia.org/wiki/Free_software) 교체 [압축](https://en.wikipedia.org/wiki/Compress) 초기에 사용 된 프로그램 [유닉스](https://en.wikipedia.org/wiki/Unix) 시스템에 의해 사용하기위한 [GNU](https://en.wikipedia.org/wiki/GNU) (이하 "g", "GNU"에서이다). 버전 0.1은 1992 년 10 월 31 일에 처음 공개되었으며 1993 년 2 월에 버전 1.0이 출시되었습니다.



gzip is based on the [DEFLATE](https://en.wikipedia.org/wiki/DEFLATE) algorithm, which is a combination of [LZ77](https://en.wikipedia.org/wiki/LZ77_and_LZ78) and [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding). DEFLATE was intended as a replacement for [LZW](https://en.wikipedia.org/wiki/LZW) and other [patent](https://en.wikipedia.org/wiki/Patent)-encumbered [data compression](https://en.wikipedia.org/wiki/Data_compression) [algorithms](https://en.wikipedia.org/wiki/Algorithm) which, at the time, limited the usability of *compress* and other popular archivers.

"gzip" is often also used to refer to the gzip file format, which is:



