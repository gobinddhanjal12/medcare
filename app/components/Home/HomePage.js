import Image from "next/image";
import "./HomePage.css";
const HomePage = () => {
    return (
        <div className="home">
            <div className="left">
                <h1>
                    Health in Your Hands.
                </h1>
                <p>Take control of your healthcare with CareMate.</p>
                <button className="btn">Get Started</button>
            </div>
            <div className="right">
                <Image src="/images/homepage.jpg" alt="healthcare" fill style={{ objectFit: "cover" , scale:1.4}} />
            </div>
        </div>

    );
}

export default HomePage;