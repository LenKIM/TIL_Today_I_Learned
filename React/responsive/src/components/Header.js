import React from 'react'

class Header extends React.Component {

    render(){
        return (
            <div className="header">
                <h1 className="logo">
                    <a href="../index.html">
                        {'flat \n design'}
                    </a>
                </h1>
                <nav className="nav">
                    <ul className="gnb">
                        <li><a href="../index.html">{'Home'}</a><span className="sub_menu_toggle_btn">{'하위 메뉴 토글 버튼'}</span></li>
                        <li><a href="../index.html">{'플랫 디자인이란?'}</a><span className="sub_menu_toggle_btn">{'하위 메뉴 토글 버튼'}</span></li>
                        <li><a href="../index.html">{'갤러리'}</a><span className="sub_menu_toggle_btn">{'하위 메뉴 토글 버튼'}</span></li>
                        <li><a href="../index.html">{'문의 사항'}</a><span className="sub_menu_toggle_btn">{'하위 메뉴 토글 버튼'}</span></li>
                    </ul>
                </nav>
                <span className="menu_toggle_btn">{'전체 메뉴 토글 버튼'}</span>
            </div>
        )
    }
}

export default Header