import React from 'react';

const LatestPostSection = ({name}) => {
    return (
        <div>
            <section className="latestPostSection">
                <h2 className="title">최신 글</h2>
                <ul className="latest_post_list">
                    <li><a href="">안녕하세요 홈페이지 오픈</a></li>
                    <li><a href="">홈페이지 리뉴얼</a></li>
                    <li><a href="">flat design은..</a></li>
                    <li><a href="">blog에서 다양한 정보를..</a></li>
                    <li><a href="">저는 누굴까요? ..</a></li>
                </ul>
            </section>
            <PopularPostSection />
        </div>
    );
}



const PopularPostSection = ({}) => {
    return (
        <section className="PopularPostSection">
            <h2 className="title">인기 글</h2>
            <ul className="latest_post_list">
                <li><a href="">안녕하세요 홈페이지 오픈</a></li>
                <li><a href="">홈페이지 리뉴얼</a></li>
                <li><a href="">flat design은..</a></li>
                <li><a href="">blog에서 다양한 정보를..</a></li>
                <li><a href="">저는 누굴까요? ..</a></li>
            </ul>
        </section>
    )
}

export default LatestPostSection;