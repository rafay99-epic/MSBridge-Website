type Feature = {
    title: string;
    description: string;
    badge?: string;
  };
  
  type FeatureCategory = {
    name: string;
    features: Feature[];
  };