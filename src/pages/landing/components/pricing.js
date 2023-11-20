// import free from "../assets/img/pricing-free.png";
// import starter from "../assets/img/pricing-starter.png";
// import business from "../assets/img/pricing-business.png";
// import ultimate from "../assets/img/pricing-ultimate.png";

const LandingPrice = () => {
  return (
    <>
      <div className="landing" id="pricing">
        {/* <!-- ======= Pricing Section ======= --> */}
        <section id="pricing" class="pricing">
          <div class="container" data-aos="fade-up">
            <header class="section-header">
              <h2>Pricing</h2>
              <p>Check our Pricing</p>
            </header>

            <div class="row gy-4" data-aos="fade-left">
              <div
                class="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div class="box">
                  <h3 style={{ color: "#07d5c0" }}>Free Plan</h3>
                  <div class="price">
                    <sup>$</sup>0<span> / mo</span>
                  </div>
                  <img
                    // src={free}
                    class="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li class="na">Pharetra massa</li>
                    <li class="na">Massa ultricies mi</li>
                  </ul>
                  <a href="#" class="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div class="box">
                  <span class="featured">Featured</span>
                  <h3 style={{ color: "#65c600" }}>Starter Plan</h3>
                  <div class="price">
                    <sup>$</sup>19<span> / mo</span>
                  </div>
                  <img
                    // src={starter}
                    class="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li class="na">Massa ultricies mi</li>
                  </ul>
                  <a href="#" class="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="300"
              >
                <div class="box">
                  <h3 style={{ color: "#ff901c" }}>Business Plan</h3>
                  <div class="price">
                    <sup>$</sup>29<span> / mo</span>
                  </div>
                  <img
                    // src={business}
                    class="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li>Massa ultricies mi</li>
                  </ul>
                  <a href="#" class="btn-buy">
                    Buy Now
                  </a>
                </div>
              </div>

              <div
                class="col-lg-3 col-md-6"
                data-aos="zoom-in"
                data-aos-delay="400"
              >
                <div class="box">
                  <h3 style={{ color: "#ff0071" }}>Ultimate Plan</h3>
                  <div class="price">
                    <sup>$</sup>49<span> / mo</span>
                  </div>
                  <img
                    // src={ultimate}
                    class="img-fluid"
                    alt=""
                  />
                  <ul>
                    <li>Aida dere</li>
                    <li>Nec feugiat nisl</li>
                    <li>Nulla at volutpat dola</li>
                    <li>Pharetra massa</li>
                    <li>Massa ultricies mi</li>
                  </ul>
                  <a href="#" class="btn-buy">
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
