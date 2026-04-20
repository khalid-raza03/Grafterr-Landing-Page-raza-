import styles from './App.module.css';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import useContent from './hooks/useContent';

function App() {
  const { data, loading, error, retry } = useContent();

  return (
    <>
     <div className={styles.mainWrapper}>
      <div>
          <HeroSection
            heroData={data?.hero}
            loading={loading}
            error={error}
            onRetry={retry}
          />
          <FeaturesSection
            featuresData={data?.featuresSection}
            carouselData={data?.carousel}
            loading={loading}
            error={error}
            onRetry={retry}
          />
      </div>
     </div>
    </>
  )
}

export default App
