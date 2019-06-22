

참고 사이트 : https://www.baeldung.com/java-between-dates



```scala
def getDatesBetween(startDate: Date, endDate: Date): util.ArrayList[String] = {
    val datesInRange = new util.ArrayList[String]
    val calendar = new GregorianCalendar
    calendar.setTime(startDate)
    val endCalendar = new GregorianCalendar
    endCalendar.setTime(endDate)
    val formatter = new SimpleDateFormat("yyyy-MM-dd")
    while (calendar.before(endCalendar)) {
      val result = calendar.getTime
      val formattedDate = formatter.format(result)
      datesInRange.add(formattedDate)
      calendar.add(Calendar.DATE, 1)
    }
    datesInRange
  }
```





GregorianCalendar