// import free from "../assets/img/pricing-free.png";
// import starter from "../assets/img/pricing-starter.png";
// import business from "../assets/img/pricing-business.png";
// import ultimate from "../assets/img/pricing-ultimate.png";

const LandingPrice = () => {
  return (
    <>
      <div className="landing" id="pricing">
        {/* <!-- ======= Pricing Section ======= --> */}
        <section id="pricing" className="pricing">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Pricing</h2>
              <p>Check our Pricing</p>
            </header>

            <div className="row gy-4" data-aos="fade-left">
              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div className="box">
                  <h3 style={{ color: "#07d5c0" }}>Free Plan</h3>
                  <div className="price">
                    <sup>$</sup>0<span> / mo</span>
                  </div>
                  <img
                    // src={free}
                    className="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li className="na">Pharetra massa</li>
                    <li className="na">Massa ultricies mi</li>
                  </ul>
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="box">
                  <span className="featured">Featured</span>
                  <h3 style={{ color: "#65c600" }}>Starter Plan</h3>
                  <div className="price">
                    <sup>$</sup>19<span> / mo</span>
                  </div>
                  <img
                    // src={starter}
                    className="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li className="na">Massa ultricies mi</li>
                  </ul>
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div className="box">
                  <h3 style={{ color: "#ff901c" }}>Business Plan</h3>
                  <div className="price">
                    <sup>$</sup>29<span> / mo</span>
                  </div>
                  <img
                    // src={business}
                    className="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li>Massa ultricies mi</li>
                  </ul>
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                className="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div className="box">
                  <h3 style={{ color: "#ff0071" }}>Ultimate Plan</h3>
                  <div className="price">
                    <sup>$</sup>49<span> / mo</span>
                  </div>
                  <img
                    // src={ultimate}
                    className="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li>Massa ultricies mi</li>
                  </ul>
                  <a href="#" className="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End Pricing Section --> */}
      </div>
    </>
  );
};

export default LandingPrice;
