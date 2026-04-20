import contentData from "../../data/content.json";
import styles from "./FeaturesSection.module.css";
import Carousel from "../ui/Carousel";

const FeaturesSection = () => {
  const { title, titleAccent, subtitle } = contentData.featuresSection;

  const hasAccentInTitle = title.includes(titleAccent);
  const hasPlaceholderGap = /\s{2,}/.test(title);

  let beforeAccent = title;
  let afterAccent = "";

  if (hasAccentInTitle) {
    [beforeAccent, afterAccent] = title.split(titleAccent);
  } else if (hasPlaceholderGap) {
    [beforeAccent, afterAccent] = title.split(/\s{2,}/);
  }

  return (
    <>
    <div className="responsive-container">
   <div className={styles.wrapper}>     
      <h3 className={styles.subHeadline}>
        {beforeAccent}
        <strong className={styles.titleAccent}>{titleAccent}</strong>
        {afterAccent}
      </h3>

      <p className={styles.subtitle}>
        {subtitle}
      </p>
      </div>
    </div>
 
      <div className={styles.productSlider}>
       {/* product slider  */}
      <Carousel />
     </div>
    </>
  );
};

export default FeaturesSection;
