// /var/www/ikoconnect/src/lib/recommendations.ts
import recs from "../data/recommendations.json";

export type Recommendation = {
  name: string;
  description: string;
  url: string;
  logo: string;
};

export function getAllRecommendations(): Recommendation[] {
  return recs as Recommendation[];
}
