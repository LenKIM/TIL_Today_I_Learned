[https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message)
## 좋은 커밋 메시지 작성법


### 5 Useful Tips For A Better Commit Message

You’re already writing decent commit messages. Let’s see if we can level you up to awesome. Other developers, especially you-in-two-weeks and you-from-next-year, will thank you for your forethought and verbosity when they run git blame to see why that conditional is there.

1. The first line should always be 50 characters or less and that it should be followed by a blank line. Vim ships with syntax, indent, and filetype plugins for Git commits which can help here.  

=> 첫번째 라인은 50글자 또는 이내로 작성하쟈.  
Vim안에 여러 플러그들을 사용하면 도움을 준다?  

2. Add this line to your ~/.vimrc to add spell checking and automatic wrapping at the recommended 72 columns to you commit messages.  

3. Never use the -m <msg> / --message=<msg> flag to git commit.  

It gives you a poor mindset right off the bat as you will feel that you have to fit your commit message into the terminal command, and makes the commit feel more like a one-off argument than a page in history:

A more useful commit message might be:  

```
Redirect user to the requested page after login

https://trello.com/path/to/relevant/card

Users were being redirected to the home page after login, which is less
useful than redirecting to the page they had originally requested before
being redirected to the login form.

* Store requested path in a session variable
* Redirect to the stored location after successfully logging in the user
```

4. Answer the following questions:  

  1. Why is this change necessary?  
  => 왜 이 변화가 필요한가?
  This question tells reviewers of your pull request what to expect in the commit, allowing them to more easily identify and point out unrelated changes.  
  => 이 질문은 이 커밋이 무엇을 의미하는지 보는이에게 전달해줄 뿐만아니라, 그들에게 조금더 쉽게 이해하고, 관계없는 변화는 생략하도록 도와준다.  

  2. How does it address the issue?  
  => 어떻게 이 이슈를 다뤘는가?  
  Describe, at a high level, what was done to affect change. `Introduce a red/black tree to increase search speed` or `Remove <troublesome gem X>, which was causing <specific description of issue introduced by gem>` are good examples.  

  => 높은 레벨로 설명하라 무엇이 끝남으로써 어떠한 영향을 미쳤는지 설명하라.  

  If your change is obvious, you may be able to omit addressing this question.  

  3. What side effects does this change have?  
  => 어떤 부작용이 이 변화에 가지고 있는가?  

  This is the most important question to answer, as it can point out problems where you are making too many changes in one commit or branch. One or two bullet points for related changes may be okay, but five or six are likely indicators of a commit that is doing too many things.  
  Your team should have guidelines and rules-of-thumb for how much can be done in a single commit/branch.  

5. Consider making including a link to the issue/story/card in the commit message a standard for your project. Full urls are more useful than issue numbers, as they are more permanent and avoid confusion over which issue tracker it references.  
