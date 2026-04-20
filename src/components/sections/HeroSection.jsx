import styles from "./HeroSection.module.css";
import FloatingShape from "../ui/FloatingShape";
import GradientText from "../ui/GradientText";
import GradientButton from "../ui/GradientButton";
import { HeroSkeleton } from "../ui/Skeleton";

const HeroSection = ({ heroData, loading, error, onRetry }) => {
  if (loading) return <HeroSkeleton />;
  if (error) {
    return (
      <div className="responsive-container">
        <div className={styles.errorState}>
          <p className={styles.errorText}>{error}</p>
          <button type="button" className={styles.retryBtn} onClick={onRetry}>
            Retry
          </button>
        </div>
      </div>
    );
  }

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
      <div className={`${styles.wrapper} ${styles.fadeIn}`}>
        <FloatingShape color={"red"} url={redShapeUrl} />
        <FloatingShape color={"blue"} url={blueShapeUrl} />

        <h1 className={styles.heading}>
          {headlinePrefix} <br />
          <GradientText>{headlineGradient}</GradientText>
        </h1>

        <p className={styles.subheadline}>
          {beforeHighlight}
          {(subheadline || "").includes(highlightedText) && (
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
