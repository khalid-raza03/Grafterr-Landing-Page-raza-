import styles from "./HeroSection.module.css";
import FloatingShape from "../ui/FloatingShape";
import GradientText from "../ui/GradientText";
import GradientButton from "../ui/GradientButton";
import { HeroSkeleton } from "../ui/Skeleton";
import useContent from "../../hooks/useContent";

const HeroSection = () => {
  const { data, loading, error } = useContent();
  const heroData = data?.hero;

  if (loading) return <HeroSkeleton />;
  if (error) return <p>{error}</p>;

  const {
    headlinePrefix,
    headlineGradient,
    subheadline,
    CTA,
    decorativeShapes,
  } = heroData ?? {};

  const redShapeUrl = decorativeShapes?.[0]?.["red-shape"] || "";
  const blueShapeUrl = decorativeShapes?.[1]?.["blue-shape"] || "";
  const primaryCta = CTA?.[0];
  const highlightedText = "success stories";
  const [beforeHighlight, afterHighlight] = (subheadline || "").split(
    highlightedText
  );

  return (
    <div className="responsive-container">
      <div className={styles.wrapper}>
        <FloatingShape color={"red"} url={redShapeUrl} />
        <FloatingShape color={"blue"} url={blueShapeUrl} />

        <h1 className={styles.heading}>
          {headlinePrefix} <br />
          <GradientText>{headlineGradient}</GradientText>
        </h1>

        <p className={styles.subheadline}>
          {beforeHighlight}
          {subheadline.includes(highlightedText) && (
            <strong>{highlightedText}</strong>
          )}
          {afterHighlight}
        </p>

        {primaryCta && <GradientButton>{primaryCta.text}</GradientButton>}
      </div>
    </div>
  );
};

export default HeroSection;
