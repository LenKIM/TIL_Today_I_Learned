# HOW TO WRITE AWESOME TECH SPECS



**Consider the following nightmares.**



팀에서 몇 주 동안 보냈던 새로운 기능을 출시하려고합니다. 준비 상태를 확인하려고하면 예상대로 작동하지 않습니다. 문제를 파헤친 후에는 해당 기능이 다른 팀이 최근에 더 이상 사용하지 않는 서비스를 사용하고 있음을 발견했습니다.



앱의 새로운 기능을 위해 클라이언트와 서버 작업을 통합하려고 시도하는 동안 클라이언트 엔지니어는 오래된 기술 사양을 사용하여 몇 주 동안 작업을 무효화하고 있음을 알게되었습니다.



팀이 새로운 기능을 개발 중임을 발표 한 후 프로젝트 범위를 넓히라는 요청이 쇄도했습니다. 새로운 요구 사항으로 인해 기능이 프로덕션 환경에 적용되는지 궁금해지기 시작합니다.



이 악몽 시나리오에는 어떤 공통점이 있습니까? 

기능, 프로젝트 또는 서비스가 기술적인 관점에서 어떻게 작동하는지 설명하는 엔지니어가 작성한 문서는 굉장한 기술 사양으로 인해 각각의 문제를 예방할 수있었습니다.



Tech specs 에 대한 아이디어는 실리콘 밸리 정신에 위배 될 수 있습니다. 빠르게 움직여서 물건을 깰 수 있습니다. 기술 사양을 작성, 배포 및 업데이트하는 데 시간이 걸리는 이유는 무엇입니까?



그러나 Tech-spec 은 대부분의 엔지니어가 알고있는 것보다 더 유용합니다. 신중하고 잘 작성된 Tech-spec 은 다음과 같은 많은 이점을 제공합니다.



## (Almost) Bug-Free Releases

철저한 Tech specs은 광범위한 아이디어 (종종 엔드 포인트 이름 및 오류 코드와 같은 저수준 구현 세부 사항)를 광범위한 대상에게 노출시켜 버그 나 회귀가 나중에 빨리 발견 될 가능성을 최대화합니다. 항상 예기치 않은 버그가 있지만 좋은 Tech specs은 제안에 많은 관심을 기울임으로써 대다수를 제거 할 수 있습니다.



## Documentation

Tech specs은 기능을 구현하는 동안과 기능을 시작한 후에 문서로 사용됩니다. 기능 구현 중에는 수행해야 할 작업을 정확하게 지정합니다. 시작 후, 정보가없는 엔지니어는 기능의 내부 작업과 관련된 상충 관계를 빠르게 파악할 수 있습니다.



![image-20200405183145657](https://tva1.sinaimg.cn/large/00831rSTgy1gdj0ufzd6tj313i0see81.jpg)



물론 문서는 액세스 할 수있는만큼 유용합니다. Lyft에는 모든 엔지니어가 볼 수 있고 기술적으로 제공하는 Tech specs 모음이 메일링리스트로 구성되어 있습니다. 

 많은 엔지니어들이 지식을 사용하여 피드백을 요청하고, 새로운 프로젝트에 대한 인식을 높이며, 팀간에 협업합니다. 다른 사람들의 집성을 사용하여 기존 기능과 서비스를 더 잘 이해합니다. 높은 가시성과 투명성으로 인해 중급 엔지니어들도 자신있게 구축 할 수 있습니다.


## Fast Iteration

Tech specs를 작성하는 단계에서 기능 설계 및 구현에 대한 합의에 도달하면 경합이 줄어든 상황에서 경합이 줄어듭니다.  크런치 상태에서 기능을 시작하려고 할 때 매우 중요합니다. Tech specs은 출시 후 이해 관계자가 정확한 정보를 신속하게 찾을 수있는 유용한 참조 안내서 역할을합니다. 예를 들어, 특정 구현 결정이 내려진 이유, 프로젝트 범위 및 다른 플랫폼 및 서비스와의 통합 방법 등이 있습니다.



이 가이드를 읽은 후에는 기능과 팀을 한 단계 끌어 올리는 완전히 실현 된 기술 사양을 작성할 수 있습니다. 나중에 감사하겠습니다!



## Before You Write — Give Your Tech Spec a Purpose(작성하기 전에 — 기술 사양에 목적을 부여하십시오)



The Pareto Principle — that only 20% of input generally results in 80% of output

오직 20%의 인풋이 80퍼센트의 아웃풋을 만든다. 파레토 법칙.

대부분의 사람들이 직관적으로 이해하는 것을 정량화합니다. 일부 시간 사용은 다른 사람들보다 더 효율적입니다. Tech Specs 작성에도 동일한 규칙이 적용됩니다. 시간과 노력을 현명하게 지출하면 나중에 큰 배당금을 지불하게됩니다. 잘 알려진 Tech specs은 사용자를 대신하여 작업을보다 쉽게하고 기능을 향상시키는 도구입니다.

예를 들어, 팀 내 의사 소통을 개선하거나 이해 관계자의 우려를 예상하고 해결하는 데 목적이 있습니다. 

``` A tech spec without a purpose? It’s a waste of time.```



기술 사양의 유용성을 최대화하려면 쓰기 시작하기 전에 Tech specs을 정의하십시오.

`Ask yourself, “What do I hope to achieve through this tech spec?”`

“이 기술 사양을 통해 달성하고자하는 것은 무엇입니까?” 이 결정을 미리 작성하면 쓰기 프로세스가 간소화되고 사양이 독자에게 가치가 있으므로 사용자에게 가치가 보장됩니다. 너의 답변은 기술 세부 사항과 같은 속성을 결정하는 Tech specs의 기초가됩니다. 이 표에는 Tech specs에 대한 몇 가지 일반적인 목적과 이러한 기술이 최종 Tech specs에 반영되는 방식이 나와 있습니다



![image-20200405184611018](https://tva1.sinaimg.cn/large/00831rSTgy1gdj19bhonfj31ky0l410q.jpg).

프로젝트와 목적이 변경되면 사양도 변경됩니다. 프로젝트의 초기 단계는 이해 관계자로부터 구매를 얻기 위해 설계된 높은 수준의 사양을 요구할 수 있습니다. buy-in을 달성 한 후 특정 API, 오류 및 분석을 포함하여 프로젝트를 완료하는 데 필요한 모든 엔지니어링 작업을 요약한 하위 레벨 문서로 스펙을 전환 할 수 있습니다.



# Writing the Tech Spec — Key Sections

모든 기술 사양이 다르게 보이지만 템플릿부터 시작하면 알려진 모범 사례를 활용할 수 있습니다. 여기에서는 강아지의 귀여운 사진을 트윗하는 Twitter 봇인 Spot the Bot이라는 가상 프로젝트에 대한 사양을 살펴보면서 기술 사양에 대한 느슨한 템플릿을 소개합니다.



![AA](https://miro.medium.com/max/720/1*GWzMEY21iYpPA1U-9p22CQ.gif)



Here’s what the header section for a *Spot the Bot* tech spec would look like at Lyft:

![image-20200405185032775](https://tva1.sinaimg.cn/large/00831rSTgy1gdj1dviq0rj312q0e4ady.jpg)

[Including a team name ensures that if the author isn’t available to answer questions, readers know who to contact.]



해당되는 경우 (예 : 프론트 엔드 또는 클라이언트 작업) 독자가 프로젝트를 직관적이고 시각적으로 이해할 수 있도록 문서 상단에 기본 모의 또는 스크린 샷을 추가하십시오.



## Summary

이것은 기술 사양의 요약입니다. 전체 제안서의 누가 / 무엇을 / 언제 / 어디에서 / 왜 간결하게 만들었습니다.

> 스팟 봇은 미리 정의 된 시간 간격으로 개 그림을 트윗하는 트위터 봇입니다. 개 이미지는 Dog API에 대한 GET 호출을 통해 검색됩니다.



## Background

프로젝트의 맥락을 파악하라.

 왜 프로젝트를 만들어야 하는가? 동기는 무엇입니까? 어떤 사용자 문제를 해결하려고합니까? 이 문제를 해결하기 위해 이전에 어떤 노력을 기울였습니까?



> 우리는 밀레니엄 부문 내에서 브랜드 인쇄물을 확대하고자합니다. Spot the Bot은 고품질의 선별 된 개 그림에 즉시 액세스 할 수 있도록하여 많은 관중을 대상으로합니다. 우리는 고품질의 사진을 제공함으로써 경쟁사와 차별화 할 것입니다.





## Goals

의도적이거나 부주의 한 결과로 예상되는 모든 결과를 강조하십시오. 이는 대규모 서비스 및 코드 에코 시스템에 기여할 때 특히 중요합니다. 이 섹션은 측정 가능한 영향 섹션과 함께 프로젝트의 성공 여부를 평가하는 척도입니다. "우리는 의도한 목표와 영향을 달성 했습니까?"



> -재미 있고 예상치 못한 "브랜드"이미지로 단조로운 트위터 피드를 중단하십시오. (주관)
> -관련성이 높고 매력적인 콘텐츠로 밀레니엄 세대 사용자를 Google 브랜드에 소개합니다. (주관)
> -트위터 (트위 팅 자동화) 및 Dog API (강아지 사진 콘텐츠 가져 오기)와 통합 (객관적)



## Non-Goals

"Non-Goals" 개념은 직관적이지 않고 혼란스러울 수 있습니다. Lyft의 내부 기술 사양 가이드에 정의 된 방법은 다음과 같습니다.“Non-Goals는 프로젝트와 관련이 있어도 의도적으로 수행하지 않거나 해결하지 않은 것입니다. Non-Goals을 정의하면 프로젝트의 범위를 제한하고 기능 추가(feature creep)을 방지 할 수 있습니다.” 목표와 마찬가지로 Non-Goals 또한 눈에 잘 띄도록 읽을 수 있어야합니다 (글 머리 기호 제안합니다) 즉시 검토자로 넘어갑니다. 

Tech spec에 Non-goals 의 깊이를 심어 놓음으로써, 사실상 독자가 프로젝트 범위를 넓히려고 할 것입니다.

Burying your non-goals deep in your tech spec virtually ensures that a casual reader will try to widen your project’s scope.



> Disseminating dog pictures via another platform (i.e. facebook, instagram)
>
> Creating or hosting an in-house dog photo database (we will instead take a dependency on Dog API)
>
> Configurable “post times” — in v1, dog photos will be posted at a hardcoded chronological interval.
>
> -다른 플랫폼 (예 : 페이스 북, 인스 타 그램)을 통한 강아지 사진 배포
> -사내 강아지 사진 데이터베이스 생성 또는 호스팅 (대신 Dog API에 의존)
> -구성 가능한 "포스트 타임"-v1에서는 개 사진이 하드 코딩 된 시간 간격으로 게시됩니다.



## Plan

이것은 Tech Specs의 가장 긴 부분입니다. 그것은 대부분 연구와 준비의 산물입니다. 이 섹션에서는 엔지니어링 접근 방식에 대해 설명합니다. 프로젝트를 수행하기 위해 단일 행동 과정을 결정하지 않은 경우 고려중인 접근 방식을 나열하십시오. 이를 통해 검토자(개발자, 도메인 전문가)가 선택을 도울 수 있습니다. 세부 수준은 Tech specs의 목적과 의도 한 대상에 따라 다릅니다. 

`Make it descriptive enough to encourage productive suggestions!`

**생산적인 제안을 장려하기에 충분히 설명하십시오!**



 또한 프로젝트가 기존 시스템과 어떻게 상호 작용하는지 보여주는 그림을 포함하기에 좋은 곳입니다. 이는 사용자 경험을 나타내는 순서도 또는 다른 서비스 및 데이터베이스를 통한 데이터 흐름을 나타내는 다이어그램을 의미 할 수 있습니다.

![image-20200405190748491](https://tva1.sinaimg.cn/large/00831rSTgy1gdj1vu1skuj313s0nmjw3.jpg)

Tech specs이 low-level 주제를 다루는 경우 HTTP 응답 코드, JSON 요청 / 응답 스니펫 및 Error 이름 포함을 고려하십시오.

## Measuring Impact

이 섹션에서는 프로젝트에 영향을 줄 것으로 예상되는 특정 메트릭을 정의합니다. 목표에 직접 매핑해야합니다. Lyft에서 엔지니어는 데이터 과학자 및 제품 관리자와 협력하여 이러한 메트릭을 정의합니다. 다행스럽게도, 해당 프로세스를 용이하게하기 위해 강력한 데이터 파이프 라인과 분석 도구를 갖추고 있습니다. 프로젝트의 초기 단계에서 이러한 측정 항목은 우선 순위 지정과 관련된 어려운 질문에 답변하는 데 도움이됩니다 (“Given our finite engineering resources, which feature is more important to build?”). 출시 후에는 프로젝트의 성공을 측정하고 개선 할 영역을 식별하는 수단이됩니다.



>-Reach 2K twitter followers within 2 months of launch via cross-account and cross-platform promotion.  
>-At least 50% followers are non-bots; at least 20% are age 18–35  
>
> -교차 계정 및 교차 플랫폼 프로모션을 통해 출시 후 2 개월 이내에 2K 트위터 팔로어에게 도달합니다.  
> -50 % 이상의 팔로어는 봇이 아닌 사람입니다. 그중 20 % 이상 18 ~ 35 세 이상일 것입니다.  

## Security, Privacy, Risks

프로젝트가 외부 프로젝트인 경우 악의적인 사용자가 변경 사항을 악용 할 수있는 방법을 나열하십시오. 프로젝트의 위험을 강조하는 것은 불안을 유발할 수 있습니다. 
 검토자가 시스템/제품에 이 모든 위험을 초래한다고 비판하는 경우 어떻게 해야합니까? 그럼에도 불구하고 검토자들이 궁극적으로 귀하의 기능을보다 강력하게 만들 수있는 질문과 해결책을 제시 할 수 있도록 이러한 비평을 요구하는 것이 중요합니다.



## Other Considerations

고려한 접근법에 대해 토론하십시오 (그러나 궁극적으로 반대 결정). 이것은 문서 형식의 역할을하며 이미 삭제 한 접근 방식을 조사하기 위해 검토 자의 제안을 선점 할 수도 있습니다.



> *Spot the Bot Email Bot: emails instead of tweets. Decided not to implement because it doesn’t scale well, and user demand is low.*  
>
> 봇 이메일 봇 : 트윗 대신 이메일을 찾으십시오. 확장 성이 떨어지고 사용자 요구가 낮기 때문에 구현하지 않기로 결정했습니다.  



## Milestones

프로젝트를 제대로 진행하려면 모든 작업을 주요 성과로 나누고 예상 날짜를 지정하십시오.

>-Dog API integration complete: October 14th  
>-Post interval configurable: October 17th  
>-QA complete: October 21st  

Make this section a source of truth 

이 섹션을 진실의 근원으로 삼으십시오. 이정표가 다시 밀려 나면 여기를 참고하십시오. 이정표를 최신 상태로 유지하면 프로젝트 상태에 대한 오해를 방지하고 프로젝트가 합리적인 시간 내에 배송되도록 할 수 있습니다. 이것은 특히 대규모 팀과 조직에 유용합니다.



## Open Questions

List unresolved design or implementation questions, along with an invitation for reviewers to give feedback. Feel free to call out specific people who may have valuable input.  

검토자가 피드백을 제공 할 수있는 초대장과 함께 해결되지 않은 설계 또는 구현 관련 질문을 나열하십시오. 귀중한 의견을 가질 수있는 특정 사람들을 부르십시오.  



>  *We’ll start by tweeting once ever hour, on the hour. Can someone on Data Analytics confirm that this rate will maximize our audience?*  
>
> 우리는 한 시간에 한 시간에 한 번 트윗으로 시작합니다. Data Analytics의 누군가가이 비율이 잠재 고객을 최대화 할 것이라고 확인할 수 있습니까?  





# Getting Feedback

## Distributing Your Tech Spec

세련된 Tech specs은 검토자로부터 적시에 철저하고 유용한 피드백을 받을 가능성이 높습니다. 이를 위해 Tech spec을 널리 배포하기 전에 팀원에게 초기 검토를 요청하는 것이 좋습니다. 눈에 띄는 오류나 누락을 발견 할 수 있습니다. Then send your tech spec to wider audiences. 먼저 팀, 이해 관계자 및 모든 관심있는 당사자. 각 라운드마다 스펙이 더욱 정교해지고 검토자에게 더 매력적으로 변할 것입니다.



## Engaging with Feedback

대부분의 의견은 답변을 보증하므로 귀하 또는 다른 독자의 의견이 있는지 확인하십시오. 문제가 해결되면 의견이나 기술 사양 자체에 명시 적으로 해결하십시오. 독자 및 검토자와 교류하십시오. 그들은 최고의 제품을 만드는 데 도움을주고 싶어합니다!



 의견이 더 이상 도움이 되지 않는 지점에있는 경우, 구축하거나 Ticket up을 시작할 수있는 사양 버전에 도달하기 위해 기술 사양을 피드백으로 마감해야 할 때가 있습니다. 이 시점 이후에 중요하지 않은 피드백은 v2에 통합 될 수 있습니다.



A tech spec is a living document, and it’s important for the reader’s sake — and for yours — that you date every major change you make. This allows readers to quickly assess your tech spec’s relevance and identify changes.

기술 사양은 살아있는 문서이므로, 독자가 자신과 주요 변경 사항에 대해 날짜를 정하는 것이 중요합니다. 이를 통해 독자는 기술 사양의 관련성을 신속하게 평가하고 변경 사항을 식별 할 수 있습니다.



 우리는 이것이 좋은 기술 사양을 만드는 데 시간을 투자하는 소수의 사람들 (그러나 곧 대다수가 될) 사람들과 함께 할 수 있기를 바랍니다. Why? Tech specs은 시간과 노력에 대한 선행 투자이므로 장기적으로 귀하와 귀하의 팀을위한 지수 적 보상을 만들 수 있습니다. 잘 사용하십시오.