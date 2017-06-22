author = LenKIM

This time, I will introduce how to use DOM XML Parser in android
and, for studying english I write ENGLISH.

 first of all, you should create XML folder in andorid.
 like this!

![스크린샷 2017-02-11 오후 3.19.28](http://i.imgur.com/g6J28Kt.png)

 could you see the xml folder in res?

 next,

 ![스크린샷 2017-02-11 오후 3.21.32](http://i.imgur.com/oTjMh75.png)

What initalXML() is that

  ![스크린샷 2017-02-11 오후 3.21.00](http://i.imgur.com/OzgcLJe.png)

finally, you can bring XML in assets by that code.

Ok, we try to use DOM Parser for XML

 Here is XML.file

 ![스크린샷 2017-02-11 오후 3.26.11](http://i.imgur.com/vhi8mtf.png)

 If I want to get "Genesis" in XML
 <b n="Genesis">

     private String[] getBibleNames(Document doc) {

            String[] text;
            // to make list by order "b"
            NodeList bibleList = doc.getElementsByTagName("b");

            //count bibleNameListLength
            int bibleListLength = bibleList.getLength();

            text = new String[bibleListLength];

            for (int i = 0; i < bibleListLength; i++) {
                Node bibleNode = bibleList.item(i);
                text[i] = "";
                //This counts number in Single Node
                //Then here is only one Attribute.
                //That why I just put number 0
                String bibles = bibleNode.getAttributes().item(0).getNodeValue();
                text[i] = bibles;
            }
            return text;
        }


Next, This time I would like to get a series of Chapter

    private String[] getChapterNumbers(Document doc, String bibleName) {

        String[] chapterNumber;
        String attrsMap = "";
        Element bibleElement;

        NodeList bibleNodeList = doc.getElementsByTagName("b");

        for (int i = 0; i < bibleNodeList.getLength(); i++) {
            Node bible = bibleNodeList.item(i);

            attrsMap = bible.getAttributes().item(0).getNodeValue();

            if (attrsMap.equals(bibleName)) {
                bibleElement = (Element) bible;
                NodeList chapterNodeList = bibleElement.getElementsByTagName("c");

                chapterNumber = new String[chapterNodeList.getLength()];

                for (int j = 0; j < chapterNodeList.getLength(); j++) {
                    chapterNumber[j] = "";
                    chapterNumber[j] = chapterNodeList.item(j).getAttributes().item(0).getNodeValue();
                }
                return chapterNumber;
            } else {
                return null;
            }
        }
        return null;
    }

 the result of that code is must be
1,2,3,4,5,6,7,8,9,... like this.
 "chapterNumber[j]"

Next, I would like to see only verseNumbers

    private String[] getVerseNumbers(Document doc, String bibleName, String chapterName) {

            String[] verseNumbers;
            Element bibleElement;
            String bibleAttrsMap = "";

            NodeList chapterNodeList;

            NodeList bibleNodeList = doc.getElementsByTagName("b");

            for (int i = 0; i < bibleNodeList.getLength(); i++) {

                Node bible = bibleNodeList.item(i);

                bibleAttrsMap = bible.getAttributes().item(0).getNodeValue();

                if (bibleAttrsMap.equals(bibleName)) {
                    bibleElement = (Element) bible;

                    chapterNodeList = bibleElement.getElementsByTagName("c");

                    for (int j = 0; j < chapterNodeList.getLength(); j++) {

                        String chapter = chapterNodeList.item(j).getAttributes().item(0).getNodeValue();

                        if (chapter.equals(chapterName)) {

                            Node verseNode = chapterNodeList.item(j);
                            Element verseNodeElement = (Element) verseNode;

                            //이러한 행위를 하는 이유는 엔터도 들어가기 때문에 중요.
                            NodeList verseNodeList = verseNodeElement.getElementsByTagName("v");

                            verseNumbers = new String[verseNodeList.getLength()];

                            for (int k = 0; k < verseNodeList.getLength(); k++) {
                                verseNumbers[k] = "";
                                if (verseNodeList.item(k).hasAttributes()) {
                                    verseNumbers[k] = verseNodeList.item(k).getAttributes().item(0).getNodeValue();
                                }
                            }
                            return verseNumbers;
                        }
                    }
                } else return null;
            }
            return null;
        }

This result must be like this
1,2,3,4,5,6,7,8.....

Next, If I would like to see full text of selectedChapter.

    private String getChapterText(Document doc, String bibleName, String chapterName) {

            StringBuilder text = new StringBuilder();
            Element bibleElement;
            String bibleAttrsMap = "";
            NodeList chapterNodeList;

            NodeList bibleNodeList = doc.getElementsByTagName("b");

            for (int i = 0; i < bibleNodeList.getLength(); i++) {

                Node bible = bibleNodeList.item(i);

                bibleAttrsMap = bible.getAttributes().item(0).getNodeValue();

                if (bibleAttrsMap.equals(bibleName)) {
                    bibleElement = (Element) bible;
                    chapterNodeList = bibleElement.getElementsByTagName("c");
                    for (int j = 0; j < chapterNodeList.getLength(); j++) {
                        String chapter = chapterNodeList.item(j).getAttributes().item(0).getNodeValue();
                        if (chapter.equals(chapterName)) {
                            Node ChapterNode = chapterNodeList.item(j);
                            Element ChapterNodeElement = (Element) ChapterNode;

                            //이러한 행위를 하는 이유는 엔터도 들어가기 때문에 중요.
                            NodeList verseNodeList = ChapterNodeElement.getElementsByTagName("v");

                            for (int k = 0; k < verseNodeList.getLength(); k++) {
                                Node verseNode = verseNodeList.item(k);
                                String verseText = verseNode.getTextContent();

                                if (!verseText.trim().equals("")){
                                    text.append(" "+ k+1 +"."+verseText);
                                }
                            }
                            return text.toString();
                        }
                    }
                } else return null;
            }
            return null;
        }
