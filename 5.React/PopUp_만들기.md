회사에서 팝업창을 만들어야하는 상황이 발생해, 만들었다.

말은 딱 한 마디이지만, 하나 만들기 위해서 react안에서 props, state개념과 콜백함수의 개념을 이해해야 했다.

간단히 살펴보면. 생성자에 state로 필요한 변수를 선언하고.

재 사용성의 함수를 강조하기 위해서
```javascript
onCheck(e) {
    // console.log(e.target.name);
    this.setState({
        terms: {
            ...this.state.terms,
            [e.target.name]: !this.state.terms[e.target.name]
        }
    })
}
```

이놈을 만들었다. 이는 무슨 뜻이냐면, e라는 이벤트 즉, 이 이벤트가 쓰여지는 부분을 가리킨다.
때문에 아래와 같이 e.target.name 등과 같이 선언하면 이벤트가 물어있는 컴포넌트에 접합된다.
이는 React의 특성인 단방향을 보여주는 좋은 사례라고 볼수 있다.

이벤트를 활용할 때는 `onChange={this.onCheck.bind(this)`와같이 작성해야 한다.
  그러면 함수와 물러서 동작한다.

조금더 응용하면,다음과 같이 한다.


```javascript
{this.state.showSharingTerm ?
                    <SharingPopUp
                        onClose={() => this.setState({showSharingTerm: false})}
                        onConfirm={this.handleSharePopUp.bind(this)}
                        reservation={this.state.reservation}
                    /> : null}
```

여기서 왜 reservation을 props로 넘긴 이유는 무엇일까요?
```javascript
if (!reservation.isGroup) {
            //단방향으로 전달해서 해결하기.
            this.state.reservation = reservation;
            this.handleSharePopUpConfirm();
        }
```
와 같이 reservation을 state에 담았다. 그 이유는 state의 경우 같은 js파일 내에서 공유가 되기 때문에 활용했다
그리고 아래 handleSharePopUpConfirm의 경우는 무엇이냐면

```javascript
handleSharePopUpConfirm() {
     this.setState({
         showSharingTerm: true,
     });
 }
```
이는 팝업을 띄우기 위한 하나의 이벤트이다.
리엑트를 오직 showSharingTerm만 바라보고 팝업이 떴는가 안떴는가를 판단한다.

`onConfirm={this.handleSharePopUp.bind(this)}`
요놈이 주의 깊게 볼 필요가 있는 함수다.

요렇게 props로 넘겨준 뒤,

팝업 컨포넌트안에서 이와 같이 작동시킨다.
```javascript
handleConfirm() {
        const terms = this.state.terms;
        let on = [terms.check1, terms.check2, terms.check3, terms.check4].indexOf(false) >= 0;
        if (!on) {
            this.props.onConfirm(false, this.props.reservation);
        }
    }
```

함수를 컴포넌트에 넘겨주고, 넘겨받은 컴포넌트 안에서 매개변수를 통해 넘겨받은 함수를 동작시킨다.

넘겨준 함수는 다음과 같다.

```javascript
handleSharePopUp(on, reservation) {

        this.setState({
            showSharingTerm: on
        });

         생략...
            .subscribe(json => {

                //TODO json.result

              생략...
            })

    }
```

setState를 통해 팝업을 내리고, 다음 Next 화면으로 동작을 시킨다.

이렇게 콜백함수를 사용하는 방법에 대해 알아봤다!

끝!

궁금한점 있으면  joenggyu0@gmail.com으로!

```javascript

/**
 * 벅시 쉐어링 팝업
 */
import React, {Component} from 'react'
import {strings} from '../resource/constant/index'
import {Popup} from '../component/popup'
import {TextButton} from "../component/text-button"

import './popup-sharing-terms.scss'
class PopupSharingTerms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            terms: {
                check1: false,
                check2: false,
                check3: false,
                check4: false,
            }
        };
        console.log(props);
    }

    onCheck(e) {
        // console.log(e.target.name);
        this.setState({
            terms: {
                ...this.state.terms,
                [e.target.name]: !this.state.terms[e.target.name]
            }
        })
    }

    validate() {
        let validate =
            [[this.state.terms.check1, this.state.terms.check2, this.state.terms.check3, this.state.terms.check4]
                .indexOf(false) < 0]
                .filter(a => a === false).length === 0;
        return validate
    }

    onTermsAllChanged(e) {
        const terms = this.state.terms;
        let on = [terms.check1, terms.check2, terms.check3, terms.check4].indexOf(false) >= 0;
        // indexof를 통해 true // false를 한번에 구현
        this.setState({
            terms: {
                ...this.state.terms,
                check1: on,
                check2: on,
                check3: on,
                check4: on,
            }
        });
    }

    handleConfirm() {
        const terms = this.state.terms;
        let on = [terms.check1, terms.check2, terms.check3, terms.check4].indexOf(false) >= 0;
        if (!on) {
            this.props.onConfirm(false, this.props.reservation);
        }
    }

    render() {
        return (
            <Popup
                title={strings.get('sharing_terms')}
                onClose={this.props.onClose}
            >
                <div
                    className="sharingTermChecklist"
                    style={{
                        paddingLeft: 10,
                        paddingRight: 10,
                        maxHeight: '70vh',
                        overflowY: 'auto',

                    }}>
                    <ul>
                        <li key='1' className="checklist__single">
                            <input name='check1' type="checkbox" checked={this.state.terms.check1}
                                   onChange={this.onCheck.bind(this)}/>
                            {strings.get('sharing_terms_option_01')}{''}
                        </li>
                        <li key='2' className="checklist__single">
                            <input name='check2' type="checkbox" checked={this.state.terms.check2}
                                   onChange={this.onCheck.bind(this)}/>
                            {strings.get('sharing_terms_option_02')}{''}
                        </li>
                        <li key='3' className="checklist__single">
                            <input name='check3' type="checkbox" checked={this.state.terms.check3}
                                   onChange={this.onCheck.bind(this)}/>
                            {strings.get('sharing_terms_option_03')}{''}
                        </li>
                        <li key='4' className="checklist__single">
                            <input name='check4' type="checkbox" checked={this.state.terms.check4}
                                   onChange={this.onCheck.bind(this)}/>
                            {strings.get('sharing_terms_option_04')}{''}
                        </li>
                        <li key='5' className="checklist__single">
                            <input name='check5' type="checkbox"
                                   checked={[this.state.terms.check1, this.state.terms.check2, this.state.terms.check3, this.state.terms.check4].indexOf(false) < 0}
                                   onChange={this.onTermsAllChanged.bind(this)}
                            />
                            {strings.get('accept_all_terms')}{''}
                        </li>

                        <div className="btn-container clearfix text-center"
                             style={{
                                 margin: 10,
                             }}
                        >
                            <TextButton
                                style={{display: 'inline-block', margin: 'auto', marginRight: 10}}
                                className="confirm-btn"
                                onClick={this.handleConfirm.bind(this)}
                                disabled={!this.validate()}
                            >
                                {strings.get('confirm')}
                            </TextButton>

                            <TextButton
                                style={{
                                    margin: 'auto',
                                    display: 'inline-block',
                                   }}
                                className="close-btn"
                                onClick={this.props.onClose}
                            >
                                {strings.get('close')}
                            </TextButton>
                        </div>

                    </ul>
                </div>
            </Popup>
        )
    }
}

export default PopupSharingTerms

var Type = React.PropTypes
PopupSharingTerms.propTypes = {
    onClose: Type.func,
    onConfirm: Type.func,
    onTermsAllChanged: Type.func
}

PopupSharingTerms.defaultProps = {
    onClose: () => {
    },
    onConfirm: () => {
    }
}

```
