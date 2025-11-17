import React, { useContext } from "react";
// Working Components
import HeroSlider from "./HeroSection"; 
import ImpactFeatures from "./ImpactFeatures";

// Context and Components needed for basic functionality (loading/data access)
import { AuthContext } from "../../Context/AuthContext"; 
import Loader from "../../Components/Loader"; 
import MomentsSection from "./MomentsSection";
import NewsletterSection from "./NewsletterSection";


const Home = () => {
  // Keeping AuthContext, Data, and loading for component functionality
  const { Data, loading } = useContext(AuthContext);

  // Keeping sortedData definition, although it's not used in the final JSX
  const sortedData = [...Data]
    .sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
    .slice(0, 6);

  if (loading) {
    return <Loader></Loader>;
  }

  // The final returned JSX only contains the HeroSlider and ImpactFeatures
  return (
    <div>
      <title>Community Cleanliness - Home</title>

      <HeroSlider /> 
      
      <ImpactFeatures />
      
     <MomentsSection/>
     <NewsletterSection/>

    </div>
  );
};

export default Home;