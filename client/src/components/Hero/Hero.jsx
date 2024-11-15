import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        {/* left side */}
        <div className="flexColStart hero-left">
          <div className="hero-title">
            <motion.h1
              initial={{ y: "2rem", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 2,
                type: "ease-in",
              }}
            >
              Discover <br />
              Most Suitable
              <br /> Car
            </motion.h1>
          </div>
          <div className="flexColStart txt-clr flexhero-des">
            <span>Find a variety of cars that suit you very easily</span>
            <span>Forget all difficulties in finding a car for you</span>
          </div>
        </div>
        <div className="flexCenter hero-right">
          {/* <SearchBar /> */}

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                <CountUp start={8800} end={9000} duration={4} /> <span>+</span>
              </span>
              <span className="txt-clr">Premium Product</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp start={1950} end={2000} duration={4} /> <span>+</span>
              </span>
              <span className="txt-clr">Happy Customer</span>
            </div>

            <div className="flexColCenter stat">
              <span>
                <CountUp end={28} /> <span>+</span>
              </span>
              <span className="txt-clr">Awards Winning</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
