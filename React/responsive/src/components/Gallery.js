import React from 'react'

const Gallery = ({}) => {
    return (
        <section className="GallerySection">
            <ul className="GalleryList">
                <li>
                    <a href="#">
                        <figure>
                            <img src="../images/p_images/gallery_01.jpg" alt=""/>
                            <figcaption>디자인 트렌드 플랫</figcaption>
                        </figure>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <figure>
                            <img src="../images/p_images/gallery_01.jpg" alt=""/>
                            <figcaption>원색이 포인트 플랫</figcaption>
                        </figure>
                    </a>
                </li>
            </ul>
        </section>
    )
}
export default Gallery