import React, { useState, useEffect } from 'react'
import '../css/hero.css'
import resumeHero1 from '../assets/resumeHero1.jpg';
import resumeHero2 from '../assets/resumeHero2.jpg';
import resumeHero3 from '../assets/resumeHero3.jpg';
import resumeHero4 from '../assets/resumeHero4.jpg';
import Card from 'react-bootstrap/Card';
import Footer from './Footer';


const Home = () => {  
    const [currentImage, setCurrentImage] = useState(0);
    const images = [resumeHero1, resumeHero2, resumeHero3, resumeHero4];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImage((currentImage + 1) % images.length);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [currentImage, images]);



    return (
        <>
            <div className="hero-section d-flex justify-content-center align-items-center border-buttom row ">
                <div className="hero-left p-5 text-center col-lg-6 col-md-12">
                    <div className="hero-intro pt-5 fw-normal ">Only 2% of Resume makes it past to first Round.</div><br />
                    <div className="hero-intro-bottom fw-medium  ">BE IN TOP 2%</div>

                    <button className='btn btn-warning hero-btn mt-5' ><a href="/exp-check" >Create Resume Now</a></button>

                </div>
                <div className="hero-right col-lg-6 col-md-12 ">
                    <div className="hero-right-pic m-5 " style={{ backgroundImage: `url(${images[currentImage]})` }}
                    ></div>
                </div>
            </div>

            <div className="features-section p-5 ">
                <div className="feature-head text-center p-3 display-4  fw-medium border-dark">Create your Resume in minutes</div>
                <div className="features pt-4 d-flex justify-content-around row row-cols-1 row-cols-sm-2 row-cols-md-4">
                    <div className="feature1 mb-3">
                        <Card style={{ minWidth: '23vw', maxWidth: 'fit-content', height: 'fit-content', border: 'none', borderRadius: '10%', padding: '0', margin: '0' }}>
                            <Card.Body>
                                <Card.Title className='text-center display-6 yellow' ><i className="fa-solid fa-rocket"></i></Card.Title>
                                <Card.Title className='text-center display-5 fw-normal'>Effortless</Card.Title>
                                <Card.Text className='text-center gray fw-light fs-3 first-letter'>
                                    Build resume in minutes with out intuitive interface
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="feature2  mb-3">
                        <Card style={{ minWidth: '23vw', maxWidth: 'fit-content', height: 'fit-content', border: 'none', borderRadius: '10%' }}>
                            <Card.Body>
                                <Card.Title className='text-center display-6 yellow' ><i className="fa-solid fa-puzzle-piece"></i></Card.Title>
                                <Card.Title className='text-center display-5 fw-normal'>Relevant</Card.Title>
                                <Card.Text className='text-center first-letter gray fw-light fs-3'>
                                    Highlight your achievements & skills with tailored sectiobs & bullet points
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="feature3  mb-3">
                        <Card style={{ minWidth: '23vw', maxWidth: 'fit-content', height: 'fit-content', border: 'none', borderRadius: '10%' }}>
                            <Card.Body>
                                <Card.Title className='text-center display-6 yellow' ><i className="fa-solid fa-lightbulb"></i></Card.Title>
                                <Card.Title className='text-center display-5 fw-normal'>Modern</Card.Title>
                                <Card.Text className='text-center fs-3 fw-light gray first-letter'>
                                    Choose from variety of professional templates
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className='d-flex justify-content-center  align-items-center '>
                    <button className='btn btn-warning mt-5 fs-4 fw-medium'>Get Started Now</button>
                </div>

            </div>


            <Footer />

        </>
    )
}

export default Home