import ReactImageGallery from "react-image-gallery";
import img1 from "../assets/img/screenshots/1.jpeg";
import img2 from "../assets/img/screenshots/2.jpeg";
import img3 from "../assets/img/screenshots/3.jpeg";
import img4 from "../assets/img/screenshots/4.jpeg";
const images = [
  {
    original: img4,
    thumbnail: img4,
  },
  {
    original: img3,
    thumbnail: img3,
  },
  {
    original: img2,
    thumbnail: img2,
  },
  {
    original: img1,
    thumbnail: img1,
  },
];

const Images = () => {
  return (
    <>
      <div className="landing" id="screenshots">
        {/* <!-- ======= Features Section ======= --> */}
        <section id="features" className="features">
          <div className="container" data-aos="fade-up">
            <header className="section-header">
              <h2>Screenshots</h2>
              <p>Some glimpse of our application</p>
            </header>
            <ReactImageGallery items={images} autoPlay={true} />
          </div>
        </section>
      </div>
    </>
  );
};

export default Images;
